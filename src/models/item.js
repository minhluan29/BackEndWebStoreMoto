"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Brand, { foreignKey: "brandId" });
      Item.belongsTo(models.Categorie, { foreignKey: "cateId" });

      // define association here
    }
  }
  //Dang suy nghi, khong biet lam theo nao tim tat ca nhung thang co trong mang roi dem di query
  // ma` sao lay// duoc nhieu item vao 1 cai
  //cai do de
  //cai bulk ak
  // t khong dinh dung bulk, t dang suy nghi logic khac cai bai cua t lam

  Item.init(
    {
      name: DataTypes.STRING,
      originalPrice: DataTypes.INTEGER,
      promotionPrice: DataTypes.INTEGER,
      image: DataTypes.BLOB("long"),
      cateId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      des: DataTypes.STRING,
      status: DataTypes.STRING,
      soldCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
