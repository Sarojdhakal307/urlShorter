const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      // required: true,
      unique: true,
    },
    createdUrls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "urlsDB",
      },
    ],
  },
  { timestamps: true }
);

const userDb = mongoose.model("userDb", userSchema);

module.exports = userDb;
