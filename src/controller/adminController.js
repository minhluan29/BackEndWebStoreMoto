import adminService from "../services/adminService";

const registerAccountAdmin = async (req, res) => {
  try {
    console.log("check data", req.body);
    let response = await adminService.registerAccountAdmin(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    console.log("check data", req.body);
    let response = await adminService.loginAdmin(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log("check lõi", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

module.exports = {
  registerAccountAdmin,
  loginAdmin,
};
