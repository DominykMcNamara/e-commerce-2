const product = require("./product");
const users = require("./users");
const cart = require("./cart");

module.exports = (app) => {
  app.use("/product", product);
  app.use("/users", users);
  app.use("/cart", cart);
};
