"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn("candidates", "previous_experience", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn("candidates", "previous_experience", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },
};
