const express = require("express");
const router = express.Router();
const CommentProduct = require("../controllers/CommentController");
const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.post('/create',CommentProduct.createComment);
router.get('/getCommentById/:id',CommentProduct.getCommentById);
router.delete('/delete/:id',CommentProduct.deleteComment);

module.exports = router;

