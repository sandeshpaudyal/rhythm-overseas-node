"use strict";

module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    "Blog",
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cover_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cover_image_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue("cover_image")
            ? `https://rhythmoverseas.com.np/${this.getDataValue(
                "cover_image"
              )}`
            : null;
        },
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      defaultScope: {
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["updatedAt"] },
      },
      tableName: "blogs",
    }
  );

  return Blog;
};
