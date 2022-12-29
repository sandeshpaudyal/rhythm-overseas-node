"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn("blogs", "description", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn("blogs", "description", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
