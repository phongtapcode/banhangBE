const express = require("express");
const router = express.Router();
const OrderProduct = require("../controllers/OrderController");
const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.post('/create',OrderProduct.createOrderProduct);
router.get("/get-allorder/:id",authUserMiddleware,OrderProduct.getAllDetailsOrder);
router.get("/get-order-detail/:id",OrderProduct.getOrderDetail);
router.delete('/cancel-order/:id',OrderProduct.cancelOrder);
router.get("/get-all-order",OrderProduct.getAllOrder);
router.put("/update-order/:id",OrderProduct.updateOrder);
router.get("/get-order-filter",OrderProduct.getOrderFilter);

module.exports = router;

