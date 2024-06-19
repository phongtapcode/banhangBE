const OrderService = require("../services/OrderService");

const createOrderProduct = async (req, res) => {
  try {
    const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone} = req.body;

    if(!paymentMethod || !itemsPrice  || !totalPrice || !fullName || !address || !phone){
        return res.status(200).json({
            status: "ERR",
            message: "Vui lòng nhập đủ thông tin"
        })
    }

    const response = await OrderService.createOrderProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getAllDetailsOrder = async (req,res)=>{
  try{
      const userId = req.params.id; 

      if(!userId){
          return res.status(200).json({
              status: "ERR",
              message: "The userId is required"
          })
      }

      const response = await OrderService.getAllDetailOrder(userId);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const getOrderDetail = async (req,res)=>{
  try{
      const orderId = req.params.id; 

      if(!orderId){
          return res.status(200).json({
              status: "ERR",
              message: "The orderId is required"
          })
      }

      const response = await OrderService.getOrderDetail(orderId);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const updateOrder = async (req,res)=>{
  try{
      const orderId = req.params.id; 
      const {isDelivered} = req.body;

      if(!orderId){
          return res.status(200).json({
              status: "ERR",
              message: "The orderId is required"
          })
      }

      const response = await OrderService.updateOrder(orderId,isDelivered);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const cancelOrder = async (req,res)=>{
  try{
      const orderId = req.params.id;

      if(!orderId){
          return res.status(200).json({
              status: "ERR",
              message: "The orderId is required"
          })
      }

      const response = await OrderService.cancelOrder(orderId,req.body);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}


const getAllOrder = async (req,res)=>{
  try{
      const response = await OrderService.getAllOrder();
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const getOrderFilter = async (req,res)=>{
    try{
        const { month } = req.query;
  
        const response = await OrderService.getOrderFilter(month);
        return res.status(200).json(response);
    }catch(e){
        return res.status(404).json({message:e})
    }
  }

module.exports = {
  createOrderProduct,
  getAllDetailsOrder,
  getOrderDetail,
  cancelOrder,
  getAllOrder,
  updateOrder,
  getOrderFilter
};
