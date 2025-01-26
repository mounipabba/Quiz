const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const quizRouter = require("./routes/quiz"); // Import the quiz router
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter); // Use the quiz router
app.use("/api/user", userRouter);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use("/api/admin", adminRouter);
