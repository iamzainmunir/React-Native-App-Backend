const products = require("./products");

let apis = {
  ...products
};

let configurations = {
  swagger: "2.0",
  info: {
    title: "React Native Backend Server",
    description: "",
    version: "1.0",
  },
  produces: ["application/json"],
  basePath: "/api/v1",
  securityDefinitions: {
    "auth-token": {
      type: "apiKey",
      in: "header",
      name: "token",
    },
    "auth-username": {
      type: "apiKey",
      in: "header",
      name: "username",
    },
    "auth-user-id": {
      type: "apiKey",
      in: "header",
      name: "user_id",
    },
    "auth-school-id": {
      type: "apiKey",
      in: "header",
      name: "school_id",
    },
  },
  security: [
    {
      "auth-token": [],
      "auth-username": [],
      "auth-user-id": [],
      "auth-school-id": [],
    },
  ],
  schemes: ["http", "https"],
  paths: apis,
};
module.exports = configurations;
