const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/FeedbackController");

router.post('/create',FeedbackController.createFeedback);
router.get('/get-details/:id',FeedbackController.getDetailFeedback);
router.get('/getAll',FeedbackController.getAllFeedback);
router.put("/update-feedback/:id",FeedbackController.updateFeedback);
router.delete('/delete-feedback/:id',FeedbackController.deleteFeedback);

module.exports = router;

