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
            ? `https://rhythmoverseas.com.np/${this.getDataValue(
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
            ? `https://rhythmoverseas.com.np/${this.getDataValue(
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
            ? `https://rhythmoverseas.com.np/${this.getDataValue(
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
            ? `https://rhythmoverseas.com.np/${this.getDataValue(
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
            ? `https://rhythmoverseas.com.np/${this.getDataValue("cv")}`
            : null;
        },
      },
      job_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      country_willing: {
        type: DataTypes.STRING,
        allowNull: true,
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
      other_country: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      other_job_willing: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      other_previous_experience: {
        allowNull: true,
        type: DataTypes.STRING,
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

  Candidate.associate = function (models) {
    Candidate.hasMany(models.CandidateJobWilling, {
      foreignKey: "candidate_id",
      as: "job_willings",
    });
    Candidate.hasMany(models.CandidateCountriesWilling, {
      foreignKey: "candidate_id",
      as: "countries_willings",
    });
    Candidate.hasMany(models.CandidatePreviousExperience, {
      foreignKey: "candidate_id",
      as: "previous_experiences",
    });
  };

  return Candidate;
};
