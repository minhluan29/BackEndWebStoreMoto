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
