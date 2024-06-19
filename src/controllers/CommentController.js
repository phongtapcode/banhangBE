const CommentService = require("../services/CommentService");

const createComment = async (req, res) => {
  try {
    const { idUser, idProduct,comment } = req.body;
    if (!idUser || !idProduct || !comment) {
      return res.status(200).json({
        status: "ERR",
        message: "Tạo comment thất bại",
      });
    }

    const response = await CommentService.createComment(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getCommentById = async (req, res) => {
  try {
    const productId = req.params.id;

    if(!productId){
      return res.status(200).json({
          status: "ERR",
          message: "The productId is required"
      })
  }

    const response = await CommentService.getCommentById(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const deleteComment = async (req,res)=>{
  try{
      const commentId = req.params.id;
    
      if(!commentId){
          return res.status(200).json({
              status: "ERR",
              message: "The commentId is required"
          })
      }

      const response = await CommentService.deleteComment(commentId);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

module.exports = {
  createComment,
  getCommentById,
  deleteComment
};
