const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
