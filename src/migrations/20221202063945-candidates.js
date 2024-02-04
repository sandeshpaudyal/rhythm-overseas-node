"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("candidates", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      passport_number: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      pp_size_photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      full_size_photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passport_front: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passport_back: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      province: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emergency_contact_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emergency_contact_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emergency_contact_relation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      cv: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      job_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      country_willing: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      previous_experience: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      approved_by: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("candidates");
  },
};
