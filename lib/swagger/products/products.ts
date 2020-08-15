module.exports = {
  "/products": {
    get: {
      tags: ["Products"],
      summary: "It will fetch product list",
      operationId: "fetch_product",
      consumes: ["application/json"],
      produces: ["application/json"],
      responses: {
        200: {
          description: "Successfully",
        },
        400: {
          description: "Unauthorized",
        },
        403: {
          description: "Invalid input",
        },
      },
    },
    post: {
      tags: ["Products"],
      summary: "It will create product",
      operationId: "create_product",
      consumes: ['multipart/form-data'],
      parameters: [
        {
          in: "formData",
          name: "title",
          description: "Product Title",
          schema: {
            type: "string", example: "Table"
          },
          required: true
        },
        {
          in: "formData",
          name: "title",
          description: "Product Title",
          schema: {
            type: "string", example: "Table"
          },
          required: true
        },
        {
          in: "formData",
          name: "description",
          description: "Product description",
          schema: {
            type: "string", example: "Table for sale in good condition"
          },
          required: true
        },
        {
          in: "formData",
          name: "price",
          description: "Product Price",
          schema: {
            type: "number", example: 5000
          },
          required: true
        },
        {
          in: "formData",
          name: "category",
          description: "Product Category",
          schema: {
            type: "string", enum: ["furniture", "camera", "laptop", "vehicles", "fitness", "other"], example: "other", required: false
          }
        },
        {
          in: "formData",
          name: "image1",
          type: "file",
          description: "it will upload the file to the server",
          required: true
        },
        {
          in: "formData",
          name: "image2",
          type: "file",
          description: "it will upload the file to the server",
          required: false
        },
        {
          in: "formData",
          name: "image3",
          type: "file",
          description: "it will upload the file to the server",
          required: false
        },
        {
          in: "formData",
          name: "image4",
          type: "file",
          description: "it will upload the file to the server",
          required: false
        },
        {
          in: "formData",
          name: "image5",
          type: "file",
          description: "it will upload the file to the server",
          required: false
        }
      ],
      responses: {
        200: {
          description: "Successfully",
        },
        400: {
          description: "Unauthorized",
        },
        403: {
          description: "Invalid input",
        },
      },
    }
  }
};
