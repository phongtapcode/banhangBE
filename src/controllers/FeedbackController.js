const FeedbackService = require("../services/FeedbackService");

const createFeedback = async (req, res) => {
  try {
     const {nameUser,emailUser,title,contentFeedback} = req.body;

    if(!nameUser || !emailUser || !title || !contentFeedback){
        return res.status(200).json({
            status: "ERR",
            message: "Vui lòng nhập đủ thông tin"
        })
    }

    const response = await FeedbackService.createFeedback(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
    
  }
};

const getAllFeedback = async (req,res)=>{
  try{
      const response = await FeedbackService.getAllFeedback();
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const getDetailFeedback = async (req,res)=>{
  try{
      const feedbackId = req.params.id; 

      if(!feedbackId){
          return res.status(200).json({
              status: "ERR",
              message: "The feedbackId is required"
          })
      }

      const response = await FeedbackService.getDetailFeedback(feedbackId);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const updateFeedback = async (req,res)=>{
  try{
      const feedbackId = req.params.id; 
      const {status} = req.body;

      if(!feedbackId){
          return res.status(200).json({
              status: "ERR",
              message: "The feedbackId is required"
          })
      }

      const response = await FeedbackService.updateFeedback(feedbackId,status);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const deleteFeedback = async (req,res)=>{
  try{
      const feedbackId = req.params.id;

      if(!feedbackId){
          return res.status(200).json({
              status: "ERR",
              message: "The feedbackId is required"
          })
      }

      const response = await FeedbackService.deleteFeedback(feedbackId);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}


module.exports = {
  createFeedback,
  getAllFeedback,
  getDetailFeedback,
  updateFeedback,
  deleteFeedback
};
