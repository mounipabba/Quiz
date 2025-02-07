const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { Readable } = require("stream");
const Syllabus = require("../models/Syllabus");

// Admin login route (unchanged)
const ADMIN_USERNAME = "SCET";
const ADMIN_PASSWORD = "SCET";
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, message: "Invalid username or password" });
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ----------------------
// Syllabus Upload Route
// ----------------------
router.post("/upload-syllabus", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided." });
    }
    const subject = req.body.subject && req.body.subject.trim();
    if (!subject) {
      return res.status(400).json({ message: "No subject provided." });
    }
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "uploads" });
    const { Readable } = require("stream");
    const readableFileStream = new Readable();
    readableFileStream.push(req.file.buffer);
    readableFileStream.push(null);
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
      metadata: { subject }
    });
    readableFileStream.pipe(uploadStream)
      .on("error", (error) => {
        console.error("Error uploading file to GridFS:", error);
        return res.status(500).json({ message: "Error uploading file." });
      })
      .on("finish", async () => {
        const newSyllabus = new Syllabus({
          filename: req.file.originalname,
          fileId: uploadStream.id.toString(), // Store as string!
          contentType: req.file.mimetype,
          uploadDate: new Date(),
          subject,
          metaData: req.body
        });
        await newSyllabus.save();
        return res.status(201).json({
          message: "Syllabus uploaded successfully.",
          fileId: uploadStream.id.toString(),
          filename: req.file.originalname, // Include filename
          subject: req.body.subject,
          contentType: req.file.mimetype,
          uploadDate: new Date(),
        });
      });
  } catch (error) {
    console.error("Error in /upload-syllabus route:", error);
    res.status(500).json({ message: "Server error while uploading syllabus." });
  }
});


// --------------------------------------
// Get Syllabus Metadata for a Subject
// --------------------------------------
router.get("/syllabus-metadata/:subject", async (req, res) => {
  try {
    const subjectParam = decodeURIComponent(req.params.subject).trim();

    // Find ALL syllabi for the subject and send them as an array
    const syllabi = await Syllabus.find({
      subject: { $regex: new RegExp(`^${subjectParam}$`, "i") },
    }).sort({ uploadDate: -1 });

    if (!syllabi || syllabi.length === 0) {
      return res.status(404).json({ message: "No syllabus found for this subject." });
    }

    res.status(200).json(syllabi); 
  } catch (error) {
    console.error("Error fetching syllabus metadata:", error);
    res.status(500).json({ message: "Server error fetching syllabus metadata." });
  }
});

// ------------------------------
// Get Syllabus File by FileId
// ------------------------------
router.get("/syllabus-file/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    console.log("Fetching file with ID:", fileId);
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "uploads" });

    // Log the file(s) that match the given ID
    bucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray((err, files) => {
      if (err) {
        console.error("Error finding file in GridFS:", err);
      } else {
        console.log("Found files:", files);
      }
    });

    bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId))
      .on("error", (err) => {
        console.error("Error streaming file:", err);
        return res.status(404).json({ message: "File not found." });
      })
      .pipe(res);
  } catch (error) {
    console.error("Error in GET /syllabus-file/:id:", error);
    res.status(500).json({ message: "Server error fetching file." });
  }
});


// ------------------------------
// Delete a Syllabus File
// ------------------------------
router.delete("/syllabus/filename/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    console.log("Attempting to delete syllabus with filename:", filename);

    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "uploads" });

    // Find the file in GridFS (case-insensitive search)
    const files = await bucket.find({ filename: { $regex: new RegExp(`^${filename}$`, "i") } }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "File not found in GridFS." }); // 404 for not found
    }

    const fileToDelete = files[0]; // Take the first matching file (if multiple exist)

    // Delete from GridFS
    await bucket.delete(fileToDelete._id);

    // Delete from Syllabuses collection (case-insensitive)
    const deletedSyllabus = await Syllabus.findOneAndDelete({ filename: { $regex: new RegExp(`^${filename}$`, "i") } });

    if (!deletedSyllabus) {
      return res.status(404).json({ message: "Syllabus record not found in database." }); // 404 if not found in Syllabuses
    }

    res.status(200).json({ message: "Syllabus deleted successfully." }); // 200 for successful deletion

  } catch (error) {
    console.error("Error in DELETE /syllabus/filename/:filename route:", error);
    res.status(500).json({ message: "Server error deleting syllabus." }); // 500 for server error
  }
});










// (Other routes remain unchanged)

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