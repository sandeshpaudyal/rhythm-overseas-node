"use strict";

module.exports = (sequelize, DataTypes) => {
  const CandidatePreviousExperience = sequelize.define(
    "CandidatePreviousExperience",
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
      sector_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      tableName: "candidate_previous_experiences",
    }
  );

  CandidatePreviousExperience.associate = function (models) {
    CandidatePreviousExperience.belongsTo(models.Candidate, {
      foreignKey: "candidate_id",
      as: "candidate_previous_experiences",
    });
    CandidatePreviousExperience.belongsTo(models.Sector, {
      foreignKey: "sector_id",
      as: "sector",
    });
  };

  return CandidatePreviousExperience;
};
