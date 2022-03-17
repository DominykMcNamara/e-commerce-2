const Router = require("express-promise-router");
const db = require("../db/index");

const router = new Router();

/**
 * @swagger
 *  tags:
 *    name: Orders
 *    description: Everything about your orders.
 */

 //GET ROUTES
 /**
  * @swagger
  * /orders:
  *   get:
  *     summary: Get all orders
  *     tags: [Orders]
  *
  *     responses:
  *       200:
  *          description: A list of orders.
  *          content:
  *            application/json:
  *              schema:
  *              type: object
  *              properties:
  *                status:
  *                  type: boolean
  *                  description: The status of the order (active/inactive).
  *                  example: true
  *                total:
  *                  type: integer
  *                  description: The total price of the order.
  *                  example: 60.00
  *                order_id:
  *                  type: integer
  *                  description: The ID of the order.
  *                  example: 3
  *                user_id:
  *                  type: integer
  *                  description: The ID of the user who the order belongs to.
  *                  example: 3
  *
  *       400:
  *          description: Orders cannot be found.
  */
 router.get("/", async (req, res) => {
   try {
     const { rows } = await db.query("SELECT * FROM orders");
     if (rows.length === 0) {
       res.status(200).send("There are currently no orders");
     } else {
       res.status(200).send(rows);
     }
   } catch (err){
     res.status(404).send(err);
   }
 });
/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *    summary: Retrieve a single order
 *    tags: [Orders]
 *    parameters:
 *      - name: orderId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *
 *    responses:
 *      201:
 *          description: A single order.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    description: The order's status.
 *                    example: true
 *                  total:
 *                    type: integer
 *                    description: The total price of the order.
 *                    example: 60.00
 *                  order_id:
 *                    type: string
 *                    description: The ID of an order.
 *                    example: 2
 *                  user_id:
 *                    type: integer
 *                    description:  The ID of the user who the order belongs to.
 *                    example: 3
 *
 *      400:
 *          description: order cannot be found.
 */
 router.get("/:orderId", async (req, res) => {
    try {
      const { rows } = await db.query(
        "SELECT * FROM orders WHERE order_id = ($1)",
        [req.params.productId]
      );
      if (rows.length === 0) {
        res.status(201).send("order does not exist.");
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
 * /orders:
 *  post:
 *    summary: Create a new order.
 *    tags: [Orders]
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
 *              status:
 *                type: boolean
 *                description: The status of the new order.
 *                example: true.
 *              total:
 *                type: integer
 *                description: the new order's total price
 *                example: Farm fresh grape tomatoes.
 *              user_id:
 *                type: integer
 *                description: The ID of the user who the order belongs to..
 *                example: 1.00
 *          required:
 *            - status
 *            - total
 *            - user_id
 *
 *    responses:
 *      201:
 *        description: Successfully created a new order.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                type: boolean
 *                description: The status of the new order.
 *                example: 1
 *              total:
 *                type: string
 *                description: The total of the created order.
 *                example: Tomato
 *              user_id:
 *                type: integer
 *                description: The ID of the user who the order belongs to.
 *                example: 1.00
 *
 *      400:
 *          description: Order could not be created.
 */
 router.post("/", async (req, res) => {
    try {
      const { status, total, user_id } = req.body;
      const { rows } = await db.query(
        "INSERT INTO orders (status, total, user_id) VALUES ( $1, $2, $3)",
        [status, total, user_id]
      );
      res.status(201).send("Order successfully created.");
    } catch (err) {
      res.status(400).send(err);
    }
  });

  //PUT ROUTES
/**
 * @swagger
 * /orders/{orderId}:
 *  put:
 *    summary: Update a orders's information.
 *    tags: [Orders]
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        description: Updated order information.
 *      - name: orderId
 *        in: path
 *        required: true
 *        description: The ID of the order to update
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
 *              status:
 *                type: boolean
 *                description: The new status of the order.
 *                example: true.
 *              total:
 *                type: integer
 *                description: the new total of the order
 *                example: 60.00
 *        
 *
 *    responses:
 *      201:
 *        description: Successfully updated the product.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                order_id:
 *                type: integer
 *                description: The order_id of the updated order.
 *                example: 1
 *              user_id:
 *                  type: integer
 *                  description: The user who the order belongs to
 *                  example: 2
 *              status:
 *                type: boolean
 *                description: The updated status of the order.
 *                example: true
 *              total:
 *                type: integer
 *                description: The updated total of the order.
 *                example: 61.00
 *
 *      400:
 *          description: Product could not be updated.
 */
 router.put("/:orderId", async (req, res) => {
    try {
      const { status, total } = req.body;
      const { rows } = await db.query(
        "UPDATE order SET status = $1, total = $2 WHERE order_id = $3",
        [status, total, req.params.orderId]
      );
      res.status(200).send("Product successfully updated.");
    } catch (err) {
      res.status(400).send(err);
    }
  });
//DELETE ROUTES
/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *    summary: Delete a single order
 *    tags: [Orders]
 *    parameters:
 *      - name: orderId
 *        in: path
 *        required: true
 *        description: The ID of the order to delete
 *        schema:
 *         type: integer
 *
 *    responses:
 *      201:
 *          description: Order successfully deleted.
 *
 *      400:
 *          description: Order cannot be found.
 */
 router.delete("/:orderId", async (req, res) => {
    try {
      const { rows } = await db.query(
        "DELETE FROM order WHERE order_id = $1",
        [req.params.productId]
      );
      res.status(200).send("order successfully deleted");
    } catch (err) {
      res.status(404).send(err);
    }
  });
module.exports = router