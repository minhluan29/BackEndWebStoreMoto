const db = require("../models/index");

const addcategorie = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: 2,
          errMessage: "Mày chưa truyền dữ liệu cho t sao tao tạo?",
        });
      } else {
        let categorie = await db.Categorie.findOne({
          where: { name: data.name },
        });
        if (categorie) {
          console.log("user >>>>>", categorie);
          resolve({
            errCode: 2,
            errMessage: "Dữ liệu đã có sẵn trong server !!!",
          });
        } else {
          await db.Categorie.create({
            name: data.name,
            is_parent: data.is_parent,
            parentId: data.parentId,
          });
          resolve({
            errCode: 0,
            errMessage: "Tạo Danh Mục Thành Công !!!",
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// Get All Categories
const getallcategorie = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataCategorie = await db.Categorie.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!dataCategorie) {
        resolve({
          errCode: 2,
          errMessage: "Không có dữ liệu trong data !!!",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Lấy thành công !!!",
          data: dataCategorie,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  addcategorie,
  getallcategorie,
};
