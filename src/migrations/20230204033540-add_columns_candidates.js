"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("candidates", "other_country", {
        allowNull: true,
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("candidates", "other_job_willing", {
        allowNull: true,
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("candidates", "other_previous_experience", {
        allowNull: true,
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("candidates", "other_country"),
      queryInterface.removeColumn("candidates", "other_job_willing"),
      queryInterface.removeColumn("candidates", "other_previous_experience"),
    ]);
  },
};
