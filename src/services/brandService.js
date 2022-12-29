const db = require("../models/index");

// Tao admin
const addBrand = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: 2,
          errMessage: "Mày chưa truyền dữ liệu cho t sao tao tạo?",
        });
      } else {
        let dataBrand = await db.Brand.findOne({
          where: { name: data.name },
        });
        if (dataBrand) {
          console.log("user >>>>>", dataBrand);
          resolve({
            errCode: 2,
            errMessage: "Dữ liệu đã có sẵn trong server !!!",
          });
        } else {
          await db.Brand.create({
            name: data.name,
          });
          resolve({
            errCode: 0,
            errMessage: "Tạo Thương Hiệu Thành Công !!!",
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// Get All Brand
const getAllBrand = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataBrand = await db.Brand.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!dataBrand) {
        resolve({
          errCode: 2,
          errMessage: "Không có dữ liệu trong data !!!",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Lấy thành công !!!",
          data: dataBrand,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  addBrand,
  getAllBrand,
};
