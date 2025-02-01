const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Syllabus=require("../models/Syllabus");

const multer = require("multer");
const { Readable } = require("stream");

// Use multer memory storage so that file is stored in memory as a buffer.
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ----------------------
// Syllabus Upload Route
// ----------------------
router.post("/upload-syllabus", upload.single("file"), async (req, res) => {
  try {
    // Check if file is provided
    if (!req.file) {
      return res.status(400).json({ message: "No file provided." });
    }

    // Get the MongoDB database instance from mongoose connection
    const db = mongoose.connection.db;
    // Initialize a GridFSBucket with bucket name 'uploads'
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "uploads" });

    // Create a readable stream from the file buffer
    const readableFileStream = new Readable();
    readableFileStream.push(req.file.buffer);
    readableFileStream.push(null);

    // Pipe the file into GridFS
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
      metadata: {} // Add any additional metadata here if needed
    });

    readableFileStream.pipe(uploadStream)
      .on("error", (error) => {
        console.error("Error uploading file to GridFS:", error);
        return res.status(500).json({ message: "Error uploading file." });
      })
      .on("finish", async () => {
        // File successfully stored in GridFS; save record in Syllabus collection
        const newSyllabus = new Syllabus({
          filename: req.file.originalname,
          fileId: uploadStream.id,
          contentType: req.file.mimetype,
          uploadDate: new Date(),
          metaData: req.body // or add custom metadata as needed
        });
        await newSyllabus.save();

        return res.status(201).json({ 
          message: "Syllabus uploaded successfully.", 
          fileId: uploadStream.id 
        });
      });
  } catch (error) {
    console.error("Error in /upload-syllabus route:", error);
    res.status(500).json({ message: "Server error while uploading syllabus." });
  }
});


// Function to get the correct collection based on the subject
router.post("/upload-questions", async (req, res) => {
  try {
    const { subject, questions } = req.body;

    // Validation checks
    if (!subject || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        message: "Invalid subject or empty questions array provided.",
      });
    }

    // Arrays to store status of questions
    let skippedQuestions = [];
    let uploadedQuestions = [];

    // Process each question
    for (let question of questions) {
      const existingQuestion = await Question.findOne({
        subject,
        question: question.questionText,
      });

      if (!existingQuestion) {
        // If the question does not exist, insert it
        const newQuestion = new Question({
          subject,
          question: question.questionText,
          options: question.options,
          answer: question.answer,
        });
        await newQuestion.save();
        uploadedQuestions.push(question.questionText); // Track successfully uploaded questions
      } else {
        skippedQuestions.push(question.questionText); // Track skipped questions
      }
    }

    // Prepare the response message
    let message = "Questions uploaded successfully.";
    if (skippedQuestions.length > 0) {
      message += ` However, the following questions were skipped as they already exist: ${skippedQuestions.join(
        ", "
      )}.`;
    }

    res.status(201).json({ message, uploadedQuestions, skippedQuestions });
  } catch (error) {
    console.error("Error uploading questions:", error);
    res
      .status(500)
      .json({ message: "Server error while uploading questions." });
  }
});

router.get("/results/:subject", async (req, res) => {
  const { subject } = req.params;

  try {
    const quizzes = await Quiz.aggregate([
      { $match: { subject } },
      { $sort: { date: -1 } },
      {
        $group: {
          _id: "$user",
          latestQuiz: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          "latestQuiz.results": 1,
          "userDetails.name": 1,
          "userDetails.rollNo": 1,
        },
      },
      { $sort: { "userDetails.rollNo": 1 } },
    ]);

    res.json(
      quizzes.map((q) => ({
        user: q.userDetails,
        results: q.latestQuiz.results,
      }))
    );
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    res.status(500).json({ message: "Server error while fetching results." });
  }
});

module.exports = router;