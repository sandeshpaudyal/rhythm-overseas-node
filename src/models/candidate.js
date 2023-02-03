"use strict";

module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define(
    "Candidate",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      passport_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pp_size_photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pp_size_photo_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue("pp_size_photo")
            ? `https://insta.outcodetest.com/${this.getDataValue(
                "pp_size_photo"
              )}`
            : null;
        },
      },
      full_size_photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      full_size_photo_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue("full_size_photo")
            ? `https://insta.outcodetest.com/${this.getDataValue(
                "full_size_photo"
              )}`
            : null;
        },
      },
      passport_front: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passport_front_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue("passport_front")
            ? `https://insta.outcodetest.com/${this.getDataValue(
                "passport_front"
              )}`
            : null;
        },
      },
      passport_back: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passport_back_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue("passport_back")
            ? `https://insta.outcodetest.com/${this.getDataValue(
                "passport_back"
              )}`
            : null;
        },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emergency_contact_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emergency_contact_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emergency_contact_relation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      secondary_contact_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cv_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue("cv")
            ? `https://insta.outcodetest.com/${this.getDataValue("cv")}`
            : null;
        },
      },
      job_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      country_willing: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      previous_experience: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      approved_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      defaultScope: {
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      tableName: "candidates",
    }
  );

  return Candidate;
};
