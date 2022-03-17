const product = require("./product");
const users = require("./users");
const cart = require("./cart");
const orders = require('./orders')

module.exports = (app) => {
  app.use("/product", product);
  app.use("/users", users);
  app.use("/cart", cart);
  app.use("/orders", orders)
};
