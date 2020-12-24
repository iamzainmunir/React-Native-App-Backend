const products = require("./products"),
user = require("./user")

let apis = {
  ...products,
  ...user
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
    "x-auth-token": {
      type: "apiKey",
      in: "header",
      name: "x-auth-token",
    }
  },
  security: [
    {
      "x-auth-token": []
    },
  ],
  schemes: ["http", "https"],
  paths: apis,
};
module.exports = configurations;
