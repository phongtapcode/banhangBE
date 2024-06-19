const FeedBack = require("../models/FeedbackModel");

const createFeedback = (newFeedback) => {
  return new Promise(async (resolve, reject) => {
    const { idUser, nameUser, emailUser, title, contentFeedback } = newFeedback;

    try {
      const createFeedback = await FeedBack.create({
        idUser,
        nameUser,
        emailUser,
        title,
        contentFeedback,
      });

      if (createFeedback) {
        resolve({
          status: "OK",
          message: "Success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllFeedback = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await FeedBack.find();
      return resolve({
        status: "OK",
        message: "All Order",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailFeedback = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const detailFeedback = await FeedBack.findOne({ _id: id }).populate('idUser', 'name avatar');;

      return resolve({
        status: "OK",
        message: "All Feedback",
        data: detailFeedback,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateFeedback = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      await FeedBack.findByIdAndUpdate(id, {
        status: status,
      });

      return resolve({
        status: "OK",
        message: "Update Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteFeedback = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await FeedBack.findByIdAndDelete(id);

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
  createFeedback,
  getAllFeedback,
  getDetailFeedback,
  updateFeedback,
  deleteFeedback
};
