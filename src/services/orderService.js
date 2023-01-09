const db = require("../models/index");
const { Op } = require("sequelize");

const createNewOrder = (data) => {
  console.log("check>>>", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        await db.Order.create({
          userId: data.userId,
          itemId: data.itemId,
          priceTotal: data.priceTotal,
          quantity: data.quantity,
          status: data.status,
        });
        resolve({
          errCode: 0,
          errMessage: "Đặt hàng thành công!!!",
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Order.findAll();
      if (res) {
        resolve({
          errCode: 0,
          data: res,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Đã có gì đó xảy ra!!!",
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getOrderInfoById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findOne({
        where: { id: id },
        raw: false,
        nest: true,
      });
      if (order) {
        let user = await db.User.findOne({
          where: { id: order.userId },
          attributes: {
            exclude: ["password"],
          },
          raw: false,
          nest: true,
        });
        let arr = order.itemId.split(",");

        let orders = await db.Item.findAll({
          where: {
            id: {
              [Op.in]: arr,
            },
          },
          raw: false,
          nest: true,
        });
        orders.forEach((item) => {
          if (item.image) {
            return (item.image = new Buffer(item.image, "base64").toString(
              "binary"
            ));
          }
        });
        const data = {
          userInfo: user,
          order: order,
          orderProduct: orders,
        };
        resolve({
          errCode: 0,
          data: data,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy hóa đơn trong hệ thống!!!",
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  createNewOrder,
  getAllOrder,
  getOrderInfoById,
};
