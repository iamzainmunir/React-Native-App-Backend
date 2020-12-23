module.exports = {
    "/user/register": {
            post: {
                tags: ["User"],
                summary: "It will register user",
                description: "It will register user",
                operationId: "user_register",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        description: "User Registration",
                        required: true,
                        schema: {
                        type: "object",
                        properties: {
                                name: {
                                    type: "string",
                                    example: "username",
                                    required: true
                                },
                                email: {
                                    type: "string",
                                    example: "username",
                                    required: true
                                },
                                password: {
                                    type: "string",
                                    example: "password",
                                    required: true
                                }
                            }
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "User registered successfully"
                    },
                    400: {
                        description: "Invalid input"
                    }
                }
            },
        },
    "/user/login": {
            post: {
                tags: ["User"],
                summary: "It will login user",
                description: "It will login user",
                operationId: "user_login",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        description: "User Login",
                        required: true,
                        schema: {
                        type: "object",
                        properties: {
                                email: {
                                    type: "string",
                                    example: "example@gmail.com",
                                    required: true
                                },
                                password: {
                                    type: "string",
                                    example: "password",
                                    required: true
                                }
                            }
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "User login successfully"
                    },
                    401: {
                        description: "Invalid email or password"
                    }
                }
            }
        }
    }