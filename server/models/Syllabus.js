const mongoose = require("mongoose");

const SyllabusSchema = new mongoose.Schema({
  filename: String,
  fileId: mongoose.Types.ObjectId,
  contentType: String,
  uploadDate: Date,
  metaData: Object,
});

module.exports = mongoose.model("Syllabus", SyllabusSchema);
