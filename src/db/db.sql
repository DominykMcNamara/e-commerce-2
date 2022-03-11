CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS product
(
  product_id UUID DEFAULT uuid_generate_v4 () NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(50) NOT NULL,
  price MONEY NOT NULL,
  PRIMARY KEY (product_id)
);

CREATE TABLE IF NOT EXISTS cart
(
  cart_id UUID DEFAULT uuid_generate_v4 () NOT NULL,
  PRIMARY KEY (cart_id)
);

CREATE TABLE IF NOT EXISTS cart_item
(
  cart_item_id UUID DEFAULT uuid_generate_v4 () NOT NULL,
  product_id UUID DEFAULT uuid_generate_v4 () NOT NULL,
  cart_id UUID DEFAULT uuid_generate_v4 () NOT NULL,
  PRIMARY KEY (cart_item_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id),
  FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
);

CREATE TABLE IF NOT EXISTS users
(
  user_id UUID DEFAULT uuid_generate_v4 () NOT NULL,
  email VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE (email),
  UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS orders
(
  status BOOLEAN NOT NULL,
  total MONEY NOT NULL,
  order_id UUID DEFAULT uuid_generate_v4 () NOT NULL,
  user_id UUID DEFAULT uuid_generate_v4 () NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS order_item
(
  order_item_id UUID DEFAULT uuid_generate_v4 () NOT NULL,
  quantity INT NOT NULL,
  price FLOAT NOT NULL,
  order_id UUID DEFAULT uuid_generate_v4 () NOT NULL,
  product_id UUID DEFAULT uuid_generate_v4 () NOT NULL,
  PRIMARY KEY (order_item_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);