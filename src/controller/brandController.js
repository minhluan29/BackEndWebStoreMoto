import brandService from "../services/brandService";

const addBrand = async (req, res) => {
  try {
    let response = await brandService.addBrand(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

const getAllBrand = async (req, res) => {
  try {
    let response = await brandService.getAllBrand(req.body);
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
  addBrand,
  getAllBrand,
};
