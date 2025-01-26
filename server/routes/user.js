const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate"); // Import the authentication middleware
const Quiz = require("../models/Quiz"); // Import the Quiz model

// Route to fetch the quiz history for the authenticated user
router.get("/history", authenticate, async (req, res) => {
  try {
    const quizHistory = await Quiz.find({ user: req.user._id })
      .sort({ date: -1 })
      .populate("results.questionId");

    res.json(quizHistory);
  } catch (err) {
    //console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

router.get("/details/:quizId", authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate(
      "results.questionId"
    );

    if (!quiz || quiz.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    //console.log("Fetched Quiz Details:", JSON.stringify(quiz, null, 2));
    res.json(quiz);
  } catch (err) {
    //console.error("Error fetching quiz details:", err);
    res.status(500).json({ error: "Failed to fetch quiz details" });
  }
});

router.get("/details/:quizId", authenticate, async (req, res) => {
  try {
    // Fetch the quiz by its ID
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz || quiz.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    //console.log("Fetched Quiz Details:", JSON.stringify(quiz, null, 2));

    // Return the full quiz data including results
    res.json(quiz);
  } catch (err) {
    //console.error("Error fetching quiz details:", err);
    res.status(500).json({ error: "Failed to fetch quiz details" });
  }
});

module.exports = router;
