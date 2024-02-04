"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("candidates", "secondary_contact_number", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "candidates",
      "secondary_contact_number"
    );
  },
};
