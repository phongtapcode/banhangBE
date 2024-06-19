const Comment = require("../models/CommentModel");
const User = require("../models/UserModel");

const createComment = (newComment) => {
  return new Promise(async (resolve, reject) => {
    const { idUser, idProduct,comment } = newComment;
    try {
      const createdComment = await Comment.create({
        idProduct,
        idUser,
        comment
      });

      if (createdComment) {
        resolve({
          status: "OK",
          message: "Success",
          data: createdComment,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getCommentById = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allComment = await Comment.find({ idProduct: productId }).populate('idUser', 'name avatar'); // populate chỉ name và email của user

      return resolve({
        status: "OK",
        message: "All Comment",
        data: allComment,
      });

    } catch (e) {
      reject(e);
    }
  });
};

const deleteComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkComment = await Comment.findOne({ _id: id });

      if (checkComment === null) {
        resolve({
          status: "ERR",
          message: "The Comment is not defined",
        });
      }

      const deletedComment = await Comment.findByIdAndDelete(id);

      return resolve({
        status: "OK",
        message: "Delete success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createComment,
  getCommentById,
  deleteComment
};
