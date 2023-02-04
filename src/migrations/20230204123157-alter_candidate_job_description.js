"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("candidates", "job_description", {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
      queryInterface.changeColumn("candidates", "country_willing", {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("candidates", "job_description", {
        type: Sequelize.TEXT,
        allowNull: false,
      }),
      queryInterface.changeColumn("candidates", "country_willing", {
        type: Sequelize.TEXT,
        allowNull: false,
      }),
    ]);
  },
};
