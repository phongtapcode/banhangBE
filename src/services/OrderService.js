const OrderProduct = require("../models/OrderProduct");
const Product = require("../models/ProductModel");
const EmailService = require("../services/EmailService");
const JwtService = require("./JwtService");

const createOrderProduct = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        orderItems,
        fullName,
        phone,
        address,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user,
        email,
      } = newOrder;

      for (const order of orderItems) {
        const product = await Product.findById(order.id);

        if (!product || product.countinstock < order.amount) {
          resolve({
            status: "ERR",
            message: "Sản phẩm hết hàng hoặc không tồn tại",
          });
          return; // Kết thúc vòng lặp khi gặp lỗi
        }

        product.countinstock -= order.amount;
        product.selled += order.amount;
        await product.save();
      }

      const createdProduct = await OrderProduct.create({
        orderItems,
        shippingAddress: { fullName, address, phone },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user,
      });

      await EmailService.sendEmailCreateOrder(email, orderItems, totalPrice);

      resolve({
        status: "OK",
        message: "Order created successfully",
        data: createdProduct,
      });
    } catch (error) {
      reject({
        status: "ERR",
        message: "Error creating order",
        error: error.message,
      });
    }
  });
};

const getAllDetailOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await OrderProduct.find({ user: id });

      return resolve({
        status: "OK",
        message: "All Order",
        data: checkOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateOrder = (id, isDelivered) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isDelivered === "Đã nhận được hàng") {
        await OrderProduct.findByIdAndUpdate(id, {
          isDelivered: isDelivered,
          isPaid: true,
        });
      } else {
        await OrderProduct.findByIdAndUpdate(id, {
          isDelivered: isDelivered,
          isPaid: false,
        });
      }

      return resolve({
        status: "OK",
        message: "Update Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await OrderProduct.find();

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

const getOrderDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await OrderProduct.findOne({ _id: id });

      return resolve({
        status: "OK",
        message: "All Order",
        data: checkOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const cancelOrder = (id, orderItems) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedOrder = await OrderProduct.findByIdAndDelete(id);

      if (deletedOrder === null) {
        resolve({
          status: "ERR",
          message: "The Order is not defined",
        });
      }

      for (const order of orderItems) {
        const product = await Product.findById(order.id);

        product.countinstock += order.amount;
        product.selled -= order.amount;
        await product.save();
      }

      return resolve({
        status: "OK",
        message: "Delete success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getOrderFilter = (month) => {
  return new Promise(async (resolve, reject) => {
    try {
      var orders = [];
      
      if(month !== "no"){
        const startDate = new Date(`${month}-01T00:00:00Z`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
        endDate.setUTCHours(0, 0, 0, -1);
         orders = await OrderProduct.find({
          createdAt: { $gte: startDate, $lte: endDate },
        })
      }else{
        orders = await OrderProduct.find();
      }
      
      return resolve({
        status: "OK",
        message: "All Order",
        data: orders,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrderProduct,
  getAllDetailOrder,
  getOrderDetail,
  cancelOrder,
  getAllOrder,
  updateOrder,
  getOrderFilter,
};
