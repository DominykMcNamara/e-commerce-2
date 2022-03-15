require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mountRoutes = require("./routes/index");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//SWAGGER CONFIGURATION
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "A simple REST API",
    },
  },
  apis: ["src/routes/product.js"],
};

//EXPRESS CONFIGURATION
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//INITIATE SWAGGER DOCUMENTATION
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//INITIATE ROUTES
mountRoutes(app);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`E-commerce API listening on port ${process.env.SERVER_PORT}`);
});
