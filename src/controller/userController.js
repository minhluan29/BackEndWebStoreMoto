import userService from "../services/userService";

const registerAccountUser = async (req, res) => {
  try {
    console.log("check data", req.body);
    let response = await userService.registerAccountUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("check data", req.body);
    let response = await userService.loginUser(req.body);
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
  registerAccountUser,
  loginUser,
};
