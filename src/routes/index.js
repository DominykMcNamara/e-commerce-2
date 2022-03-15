const product = require("./product");
const users = require("./users");

module.exports = (app) => {
  app.use("/product", product);
  app.use("/users", users);
};
