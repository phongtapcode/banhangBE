const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRoute")
const OrderRouter = require("./OrderRoute");
const CommentRouter = require("./CommentRoute");
const FeedbackRouter = require("./FeedbackRoute");

const routes = (app)=>{
    app.use("/api/user",UserRouter)
    app.use("/api/product",ProductRouter)
    app.use("/api/order",OrderRouter)
    app.use("/api/comment",CommentRouter)
    app.use("/api/feedback",FeedbackRouter)
}

module.exports = routes