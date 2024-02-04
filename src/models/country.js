"use strict";

module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    "Country",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      order_by: {
        type: DataTypes.INTEGER,
      },
    },
    {
      defaultScope: {
        // order: [["createdAt", "DESC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      tableName: "countries",
    }
  );

  return Country;
};
