import orderService from "../services/orderService";

const createOrder = async (req, res) => {
  try {
    let response = await orderService.createNewOrder(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};
const getAllOrder = async (req, res) => {
  try {
    let response = await orderService.getAllOrder();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};
const getOrderInfoById = async (req, res) => {
  try {
    let response = await orderService.getOrderInfoById(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};
module.exports = {
  createOrder,
  getAllOrder,
  getOrderInfoById,
};
