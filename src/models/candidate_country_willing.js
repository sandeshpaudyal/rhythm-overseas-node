"use strict";

module.exports = (sequelize, DataTypes) => {
  const CandidateCountriesWilling = sequelize.define(
    "CandidateCountriesWilling",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      candidate_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      country_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      tableName: "candidate_countries_willings",
    }
  );

  CandidateCountriesWilling.associate = function (models) {
    CandidateCountriesWilling.belongsTo(models.Candidate, {
      foreignKey: "candidate_id",
      as: "candidate_countries_willings",
    });
    CandidateCountriesWilling.belongsTo(models.Country, {
      foreignKey: "country_id",
      as: "country",
    });
  };
  return CandidateCountriesWilling;
};
