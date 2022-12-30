const db = require("../models/index");

// Tao admin
const addItem = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = product.state;
      if (!data.name || !data.originalPrice) {
        resolve({
          errCode: 2,
          errMessage: "Mày chưa truyền dữ liệu cho t sao tao tạo?",
        });
      } else {
        let Item = await db.Item.findOne({
          where: { name: data.name },
        });
        if (Item) {
          console.log("Item :_:_:_: ", Item);
          resolve({
            errCode: 2,
            errMessage: "Dữ liệu đã có sẵn trong server !!!",
          });
        } else {
          await db.Item.create({
            name: data.name,
            originalPrice: data.originalPrice,
            image: data.photo,
            cateId: data.cateId,
            brandId: data.brandId,
            qty: data.qty,
            des: data.des,
            status: data.status,
            soldCount: data.qty,
          });
          resolve({
            errCode: 0,
            errMessage: "Tạo sản phẩm thành công!!!",
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// Get all item
const getAllItem = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataItem = await db.Item.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Brand,
            attributes: ["name"],
          },
          {
            model: db.Categorie,
            attributes: ["name"],
          },
        ],
      });
      if (!dataItem) {
        resolve({
          errCode: 2,
          errMessage: "Không có dữ liệu trong data !!!",
        });
      } else {
        dataItem.forEach((element) => {
          return (element.image = new Buffer(element.image, "base64").toString(
            "binary"
          ));
        });
        resolve({
          errCode: 0,
          errMessage: "Lấy thành công !!!",
          data: dataItem,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// Get one item
const getOneItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataItem = await db.Item.findOne({
        where: { id: data },
        // order: [["id", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Brand,
            attributes: ["name"],
          },
          {
            model: db.Categorie,
            attributes: ["name"],
          },
        ],
      });
      if (!dataItem) {
        resolve({
          errCode: 2,
          errMessage: "Không có dữ liệu trong data !!!",
        });
      } else {
        if (dataItem.image) {
          dataItem.image = new Buffer(dataItem.image, "base64").toString(
            "binary"
          );
        }
        resolve({
          errCode: 0,
          errMessage: "Lấy thành công !!!",
          data: dataItem,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// edit item
const editItem = (state) => {
  let data = state.state;
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 2,
          errMessage: "Mày chưa truyền dữ liệu cho t sao tao sửa ?",
        });
      } else {
        let item = await db.Item.findOne({
          where: { id: data.id },
        });
        if (!item) {
          resolve({
            errCode: 2,
            errMessage: "Không tìm thấy sản phẩm ?",
          });
        } else {
          // await db.Item.update({name : data.name,price : data.price,image : data.photo,
          // cateId : data.cateId,brandId : data.brandId,amount : data.soluong,
          // describe : data.mota,status : data.trangthai,},{ where: { id: item.id })
          // resolve({
          //   errCode: 0,
          //   errMessage: "Sửa sản phẩm thành công!!!",
          // });
          (item.name = data.name),
            (item.originalPrice = data.originalPrice),
            (item.image = data.photo),
            (item.cateId = data.cateId),
            (item.brandId = data.brandId),
            (item.qty = data.qty),
            (item.des = data.des),
            (item.status = data.status),
            await item.save();

          resolve({
            errCode: 0,
            errMessage: "Sửa sản phẩm thành công!!!",
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// delete item
const deleteItem = (Item) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = Item;
      if (!data) {
        resolve({
          errCode: 2,
          errMessage: "Mày chưa chọn item sao mà xóa ? ?",
        });
      } else {
        let item = await db.Item.findOne({
          where: { id: data },
        });
        if (item) {
          await db.Item.destroy({
            where: { id: item.id },
          });
          resolve({
            errCode: 0,
            errMessage: "Xóa sản phẩm thành công!!!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage:
              "Không tìm thấy sản phẩm trong hệ thống, vui lòng kiểm tra lại dữ liệu ? ?",
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// Find Item
const findItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let find = await db.Item.findOne({
        where: { name: data.name },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!find.name) {
        resolve({
          errCode: 2,
          errMessage: "Mày chưa nhập dữ liệu cho việc tìm kiếm ? !!!",
        });
      } else {
        if (find) {
          find.image = new Buffer(find.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          errMessage: "Lấy thành công !!!",
          data: find,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  addItem,
  getAllItem,
  getOneItem,
  editItem,
  deleteItem,
  findItem,
};
