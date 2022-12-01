"use strict";
const Role = require("../models").Role;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roleID = await queryInterface.rawSelect(
      "roles",
      {
        where: { id: "5f9eeaa3-44bc-41ab-9c1b-a154fa844907" },
      },
      ["id"]
    );
    if (!roleID) {
      let data = [
        {
          id: "5f9eeaa3-44bc-41ab-9c1b-a154fa844907",
          name: "Super Admin",
        },
        {
          id: "f3ccfa61-7e4e-4684-a088-b0cb449d554f",
          name: "Executive Director",
        },
        {
          id: "9adec18a-db49-42e9-a20b-6b5fffdad3ec",
          name: "Front Line",
        },
        {
          id: "bd79e6c5-2b58-457b-9e76-dbc4622fce18",
          name: "Client",
        },
      ];
      return await Role.bulkCreate(data);
    }
    console.log("Role seed has already been performed");
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
