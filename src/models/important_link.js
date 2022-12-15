"use strict";

module.exports = (sequelize, DataTypes) => {
  const ImportantLink = sequelize.define(
    "ImportantLink",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "important_links",
    }
  );

  return ImportantLink;
};
