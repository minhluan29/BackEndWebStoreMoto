const db = require("../models/index");
import bcrypt from "bcryptjs";

// Tao user
const registerAccountUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password || !data.fullName) {
        resolve({
          errCode: 2,
          errMessage: "Bạn chưa truyền dữ liệu cho tui sao tui tạo?",
        });
      } else {
        let user = await db.User.findOne({
          where: { email: data.email },
          raw: false,
          nest: true,
        });
        if (user) {
          console.log("user >>>>>", user);
          resolve({
            errCode: 2,
            errMessage: "Dữ liệu đã có sẵn trong server !!!",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hased = await bcrypt.hash(data.password, salt);

          await db.User.create({
            email: data.email,
            fullName: data.fullName,
            password: hased,
            phoneNumber: data.phoneNumber,
            address: data.address,
            dob: data.dob,
            role_id: 2,
            status: data.status,
          });
          resolve({
            errCode: 0,
            errMessage: "Tạo tài khoản thành công!!!",
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
// Dang nhap
const loginUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve({
          errCode: 2,
          errMessage: "Chưa nhập email hoặc chưa nhập password !!",
        });
      } else {
        let checkemail = await db.User.findOne({
          where: { email: data.email },
          attributes: ["email", "password", "fullName", "id"],
          raw: false,
          nest: true,
        });

        if (!checkemail) {
          resolve({
            errCode: 2,
            errMessage: "Sai email !!!",
          });
        } else {
          let checkpassword = await bcrypt.compareSync(
            data.password,
            checkemail.password
          );
          console.log("check boolean", checkpassword);
          if (!checkpassword === true) {
            resolve({
              errCode: 2,
              errMessage: "Sai password !!!",
            });
          } else {
            resolve({
              errCode: 0,
              errMessage: "Đăng nhập thành công !!!",
              data: checkemail,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
        raw: false,
        nest: true,
      });
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

module.exports = {
  registerAccountUser,
  loginUser,
  getAllUser,
};
