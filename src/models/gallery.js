"use strict";

module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define(
    "Gallery",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      image_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue("image")
            ? this.getDataValue("image").includes("uploads/")
              ? `${process.env.APP_URL}/${this.getDataValue("image")}`
              : this.getDataValue("image")
            : null;
        },
      },
    },
    {
      tableName: "galleries",
    }
  );

  return Gallery;
};
