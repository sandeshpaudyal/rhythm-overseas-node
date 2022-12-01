"use strict";
const User = require("../models").User;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userID = await queryInterface.rawSelect(
      "users",
      {
        where: { role_id: "5f9eeaa3-44bc-41ab-9c1b-a154fa844907" },
      },
      ["id"]
    );
    if (!userID) {
      let data = [
        {
          name: "Super Admin",
          password: "R#ythm123",
          email: "sushan.shr10@gmail.com",
          phone: "9849787330",
          role_id: "5f9eeaa3-44bc-41ab-9c1b-a154fa844907",
        },
      ];
      return await User.bulkCreate(data);
    }
    console.log("User seed has already been performed");
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
