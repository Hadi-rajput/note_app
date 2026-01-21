const mongoose = require("mongoose");

// FIX: Changed 'noteScehema' to 'noteSchema' (typo correction)
const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      // FIX: Changed ref from "Users" to "User" to match User model registration
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Note", noteSchema);
