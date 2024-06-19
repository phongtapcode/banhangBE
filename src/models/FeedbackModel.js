const mongoose = require('mongoose')
const feedBackSchema = new mongoose.Schema(
    {
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          status: { type: String, default: "Chưa xử lí", required: true },
          nameUser: { type: String, required: true },
          emailUser: { type: String, required: true },
          title: { type: String, required: true },
          contentFeedback: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

const FeedBack = mongoose.model("feedBack", feedBackSchema);
module.exports = FeedBack;