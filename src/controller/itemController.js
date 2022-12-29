import itemService from "../services/itemService";

// add item
const addItem = async (req, res) => {
  try {
    let response = await itemService.addItem(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

// get all item
const getAllItem = async (req, res) => {
  try {
    let response = await itemService.getAllItem(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

// Sửa sp
const editItem = async (req, res) => {
  try {
    let response = await itemService.editItem(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

// Lay 1 sp
const getOneItem = async (req, res) => {
  try {
    let response = await itemService.getOneItem(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

// Find Item
const findItem = async (req, res) => {
  try {
    let response = await itemService.findItem(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

// Xóa sp
const deleteItem = async (req, res) => {
  try {
    let response = await itemService.deleteItem(req.query.id);
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
  addItem,
  getAllItem,
  editItem,
  deleteItem,
  getOneItem,
  findItem,
};
