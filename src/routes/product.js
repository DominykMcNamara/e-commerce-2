const Router = require("express-promise-router");
const db = require("../db/index");

const router = new Router();

/**
 * @swagger
 *  tags:
 *    name: Product
 *    description: Everything about your products.
 */
//GET ROUTES
/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *
 *     responses:
 *       200:
 *          description: A list of products.
 *          content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                product_id:
 *                  type: integer
 *                  description: The product ID.
 *                  example: 1
 *                name:
 *                  type: string
 *                  description: The name of the product.
 *                  example: Tomato
 *                description:
 *                  type: string
 *                  description: A description of the product.
 *                  example: Farm fresh grape tomatoes
 *                price:
 *                  type: integer
 *                  description: The price of the product
 *                  example: 1.00
 *
 *       400:
 *          description: Products cannot be found.
 */
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM product");
    if (rows.length === 0) {
      res.status(200).send("There are currently no products");
    } else {
      res.status(200).send(rows);
    }
  } catch (err) {
    res.status(404).send(err);
  }
});
/**
 * @swagger
 * /product/{productId}:
 *   get:
 *    summary: Retrieve a single product
 *    tags: [Product]
 *    parameters:
 *     parameters:
 *      - name: productId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *
 *    responses:
 *      201:
 *          description: A single product.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  product_id:
 *                    type: integer
 *                    description: The product ID.
 *                    example: 1
 *                  name:
 *                    type: string
 *                    description: The name of the product.
 *                    example: Tomato
 *                  description:
 *                    type: string
 *                    description: A description of the product.
 *                    example: Farm fresh grape tomatoes
 *                  price:
 *                    type: integer
 *                    description: The price of the product
 *                    example: 1.00
 *
 *      400:
 *          description: Products cannot be found.
 */
router.get("/:productId", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM product WHERE product_id = ($1)",
      [req.params.productId]
    );
    if (rows.length === 0) {
      res.status(201).send("Product does not exist.");
    } else {
      res.status(200).send(rows[0]);
    }
  } catch (err) {
    res.status(404).send(err);
  }
});
//POST ROUTES
/**
 * @swagger
 * /product:
 *  post:
 *    summary: Create a new product.
 *    tags: [Product]
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the new product.
 *                example: Tomato.
 *              description:
 *                type: string
 *                description: the new product's description
 *                example: Farm fresh grape tomatoes.
 *              price:
 *                type: integer
 *                description: The price of the new product.
 *                example: 1.00
 *          required:
 *            - name
 *            - description
 *            - price
 *
 *    responses:
 *      201:
 *        description: Successfully created a new product.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                product_id:
 *                type: integer
 *                description: The product_id of the created product.
 *                example: 1
 *              name:
 *                type: string
 *                description: The name of the created product.
 *                example: Tomato
 *              price:
 *                type: integer
 *                description: The price of the created product.
 *                example: 1.00
 *
 *      400:
 *          description: Product could not be created.
 */
router.post("/", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const { rows } = await db.query(
      "INSERT INTO product (name, description, price) VALUES ( $1, $2, $3)",
      [name, description, price]
    );
    res.status(201).send("Product successfully created.");
  } catch (err) {
    res.status(400).send(err);
  }
});
//PUT ROUTES
/**
 * @swagger
 * /product/{productId}:
 *  put:
 *    summary: Update a product's information.
 *    tags: [Product]
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        description: Updated product information.
 *      - name: productId
 *        in: path
 *        required: true
 *        description: The ID of the product to update
 *        schema:
 *         type: integer
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The new name product.
 *                example: Tomato.
 *              description:
 *                type: string
 *                description: the new description of the product
 *                example: Farm fresh grape tomatoes.
 *              price:
 *                type: integer
 *                description: The new price of the product.
 *                example: 1.00
 *
 *    responses:
 *      201:
 *        description: Successfully updated the product.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                product_id:
 *                type: integer
 *                description: The product_id of the updated product.
 *                example: 1
 *              name:
 *                type: string
 *                description: The updated name of the product.
 *                example: Tomato
 *              price:
 *                type: integer
 *                description: The updated price of the product.
 *                example: 1.00
 *
 *      400:
 *          description: Product could not be updated.
 */
router.put("/:productId", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const { rows } = await db.query(
      "UPDATE product SET name = $1, description = $2, price = $3 WHERE product_id = $4",
      [name, description, price, req.params.productId]
    );
    res.status(200).send("Product successfully updated.");
  } catch (err) {
    res.status(400).send(err);
  }
});
//DELETE ROUTES
/**
 * @swagger
 * /product/{productId}:
 *   delete:
 *    summary: Delete a single product
 *    tags: [Product]
 *    parameters:
 *      - name: productId
 *        in: path
 *        required: true
 *        description: The ID of the product to delete
 *        schema:
 *         type: integer
 *
 *    responses:
 *      201:
 *          description: Product successfully deleted.
 *
 *      400:
 *          description: Product cannot be found.
 */
router.delete("/:productId", async (req, res) => {
  try {
    const { rows } = await db.query(
      "DELETE FROM product WHERE product_id = $1",
      [req.params.productId]
    );
    res.status(200).send("Product successfully deleted");
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
