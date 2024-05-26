const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Task Manager API",
    description: "API documentation for the Task Manager project",
    version: "1.0.0",
  },

  host: "cse341l05-l08.onrender.com/", // Change this to your host if different
  schemes: ["https"],

  //   // local dev
  //   host: "localhost:3000",
  basePath: "/tasks", // Correct base path
  schemes: ["http"],
  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "60f6f91a0c5d4b3d1c8e4b9a",
          },
          title: {
            type: "string",
            example: "Sample Task",
          },
          description: {
            type: "string",
            example: "This is a sample task description.",
          },
          status: {
            type: "string",
            enum: ["pending", "in-progress", "completed"],
            example: "pending",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2021-07-20T17:32:28Z",
          },
          finishedAt: {
            type: "string",
            format: "date-time",
            example: "2021-07-21T17:32:28Z",
          },
        },
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/tasks.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
