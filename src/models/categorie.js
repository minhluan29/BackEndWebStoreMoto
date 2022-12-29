"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categorie.hasMany(models.Item, { foreignKey: "cateId" });
      // define association here
    }
  }
  Categorie.init(
    {
      name: DataTypes.STRING,
      is_parent: DataTypes.INTEGER,
      parentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Categorie",
    }
  );
  return Categorie;
};
