"use strict";
const Country = require("../models").Country;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const checkCountry = await queryInterface.rawSelect(
      "countries",
      {
        where: { id: "f4ceaa33-ba15-4927-a04c-822417c6ccc7" },
      },
      ["id"]
    );
    if (!checkCountry) {
      let data = [
        {
          id: "f4ceaa33-ba15-4927-a04c-822417c6ccc7",
          name: "Bahrain",
          order_by: 10,
        },
        {
          id: "ec20e9f3-23db-49fd-8d95-c6b476d39090",
          name: "Belgium",
          order_by: 20,
        },
        {
          id: "d9cd6a26-04aa-48e6-89f0-b49670239267",
          name: "Bulgari",
          order_by: 30,
        },
        {
          id: "6e676133-e881-4ba3-87d1-c33f82256441",
          name: "Canada",
          order_by: 40,
        },
        {
          id: "27461a8d-b130-464d-82de-b8437563d9c9",
          name: "Cyprus",
          order_by: 50,
        },
        {
          id: "bfceb522-5b09-4bbb-bd6d-cc69dfc6c099",
          name: "France",
          order_by: 60,
        },
        {
          id: "6cc48acc-942c-46e1-83d9-ce54e2339045",
          name: "Germany",
          order_by: 70,
        },
        {
          id: "751bf3c1-e312-4168-ad62-355d4e8d6bae",
          name: "Greece",
          order_by: 80,
        },
        {
          id: "558140b8-2b5b-4338-b486-4154c2de99bf",
          name: "Hungary",
          order_by: 90,
        },
        {
          id: "aea9fd36-1f3c-43f3-973e-2d91210aa49f",
          name: "India",
          order_by: 100,
        },
        {
          id: "e3bdcbcb-afac-4307-a7c4-2775b2a98695",
          name: "Italy",
          order_by: 110,
        },
        {
          id: "14036988-e370-4dd1-aea9-7a7b28c49b9e",
          name: "Japan",
          order_by: 120,
        },
        {
          id: "50a5870f-c13f-4c59-9729-f8975f8c0a12",
          name: "Kuwait",
          order_by: 130,
        },
        {
          id: "ecc3c940-f588-4433-93f0-5a46f46dae98",
          name: "Malaysia",
          order_by: 140,
        },
        {
          id: "5bfe1f9b-91b7-4149-a6ab-1a51261373e6",
          name: "Malta",
          order_by: 150,
        },
        {
          id: "3911d11f-bccb-4c0d-882e-a3eeb870fa05",
          name: "Morocco",
          order_by: 160,
        },
        {
          id: "c8781e33-6622-4c14-b50b-3abdd71ba0f3",
          name: "Oman",
          order_by: 170,
        },
        {
          id: "ba98565e-4029-490b-8194-842629fccc7a",
          name: "Poland",
          order_by: 190,
        },
        {
          id: "dd328890-6251-48dc-810f-12dc12310980",
          name: "Portugal",
          order_by: 200,
        },
        {
          id: "981159c8-56f5-4e83-b0a8-0e06655737ce",
          name: "Qatar",
          order_by: 210,
        },
        {
          id: "8feb8717-fe69-47ce-b49b-615829d2d387",
          name: "Romania",
          order_by: 220,
        },
        {
          id: "20c2d695-6187-41ce-b389-7578cd973309",
          name: "Russia",
          order_by: 230,
        },
        {
          id: "e95c31da-567a-41c7-953d-5de55f3524a8",
          name: "Saudi",
          order_by: 240,
        },
        {
          id: "57ccbcb5-e11e-46f2-a51e-b4c8412df51d",
          name: "Serbia",
          order_by: 250,
        },
        {
          id: "654f4a31-ab0b-41b6-8750-582b40de50c4",
          name: "Slovakia",
          order_by: 260,
        },
        {
          id: "84f9ffaf-6036-4720-90ea-be4beac52593",
          name: "Slovenia",
          order_by: 270,
        },
        {
          id: "ca4c2727-17cb-46c0-969b-b7bfb974fbf7",
          name: "Thailand",
          order_by: 280,
        },
        {
          id: "9f55b745-078d-4820-b594-fbc4b1c5c4bd",
          name: "UAE",
          order_by: 290,
        },
        {
          id: "3f5e82ca-80aa-4e45-9b33-ab40c3f6d149",
          name: "UK",
          order_by: 300,
        },
        {
          id: "9e35e9c6-1065-4e65-af8a-5c727321222a",
          name: "Ukraine",
          order_by: 310,
        },
        {
          id: "6f9b7bf1-1dc0-4c41-b997-9a4567d8ed8b",
          name: "USA",
          order_by: 320,
        },
        {
          id: "1ea10df7-04ba-4ac8-8608-f3b345f71bd8",
          name: "Other",
          order_by: 10000,
        },
      ];
      return await Country.bulkCreate(data);
    }
    console.log("Country seed has already been performed");
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("countries", null, {});
  },
};
