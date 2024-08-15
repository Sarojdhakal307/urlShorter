const mongoose = require("mongoose");
const userschema = new mongoose.Schema(
  {
    userUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    displayshortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    time: {
      type: Date,
      default: Date.now(),
    },
    visit: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userDb",
    },
  },
  { timestamps: true }
);

const urlsDB = mongoose.model("urlsDB", userschema);

module.exports = urlsDB;
