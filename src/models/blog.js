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
      is_published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "blogs",
    }
  );

  return Blog;
};
