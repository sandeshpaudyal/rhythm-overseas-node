"use strict";

module.exports = (sequelize, DataTypes) => {
  const CandidateJobWilling = sequelize.define(
    "CandidateJobWilling",
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
      tableName: "candidate_job_willings",
    }
  );

  CandidateJobWilling.associate = function (models) {
    CandidateJobWilling.belongsTo(models.Candidate, {
      foreignKey: "candidate_id",
      as: "candidate_job_willings",
    });
    CandidateJobWilling.belongsTo(models.Sector, {
      foreignKey: "sector_id",
      as: "sector",
    });
  };

  return CandidateJobWilling;
};
