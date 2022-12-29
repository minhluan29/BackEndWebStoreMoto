import categorieService from "../services/categorieService";

const addcategorie = async (req, res) => {
  try {
    let response = await categorieService.addcategorie(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

const getallcategorie = async (req, res) => {
  try {
    let response = await categorieService.getallcategorie(req.body);
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
  addcategorie,
  getallcategorie,
};
