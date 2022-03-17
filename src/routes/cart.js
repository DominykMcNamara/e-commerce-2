const Router = require("express-promise-router");
const db = require("../db/index");

const router = new Router();

/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: Everything about your cart
 */
//GET ROUTES
/**
 * @swagger
 * /cart:
 *  get:
 *    summary: Get all carts
 *    tags: [Cart]
 *
 *    responses:
 *      200:
 *          description: A list of all carts.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          cart_id:
 *                              type: integer
 *                              description: The cart's ID.
 *                              example: 1
 *                         
 *      400:
 *          description: No carts can be found.
 */
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM cart");
    if (rows.length === 0) {
      res.status(200).send("There are currently no carts");
    } else {
      res.status(200).send(rows);
    }
  } catch (err) {
    res.status(400).send("No carts can be found.");
  }
});
/**
 * @swagger
 * /cart/{cartOd}:
 *  get:
 *      summary: Retrieve a single cart.
 *      tags: [Cart]
 *      parameters:
 *          - name: cartId
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          201:
 *              description: Successfully retrieved a single cart.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                          cart_id:
 *                              type: integer
 *                              description: The cart's ID.
 *                              example: 1
 *                     
 *          400:
 *              description: Cart cannot be found.
 */
 router.get("/:cartId", async (req, res) => {
    try {
      const { rows } = await db.query("SELECT * FROM users WHERE cart_id = $1", [
        req.params.userId,
      ]);
      if (rows.length === 0) {
        res.status(201).send("Cart does not exist.");
      } else {
        res.status(201).send(rows[0]);
      }
    } catch {
      res.status(400).send("Cart cannot be found.");
    }
  });
 //POST ROUTE
/**
 *  @swagger
 * /users/register:
 *  post:
 *      summary: Create a new cart.
 *      tags: [Cart]
 *     
 *      responses:
 *          201:
 *              description: Successfully created a new cart.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                          cart_id:
 *                              type: integer
 *                              description: The user's ID.
 *                              example: 1
 *                          
 *          400:
 *              description: Failed to create a new user
 *
 *
 */
router.post('/', async(req, res) => {
    try {
        const getRandomNumber = Math.floor(Math.random() * 10000)
        const { rows } = await db.query("INSERT INTO cart (cart_id) VALUES ($1)", [getRandomNumber])
        res.status(201).send("Successfully created a new cart.")
    } catch {
        res.status(400).send('Failed to create a new cart.')
    }
})
//PUT ROUTES
/*
/**
 * @swagger
 * /cart/{cartId}:
 *  put:
 *      summary: Update a user's information.
 *      tags: [Cart]
 *      parameters:
 *         - name: body
 *           in: body
 *           required: true
 *           description: Updated cart_id.
 *         - name: cartId
 *           in: path
 *           required: true
 *           description: ID of the cart to update.
 *           schema:
 *              type: integer
 *          
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          cart_id:
 *                              type: string
 *                              description: updated cart_id for cart
 *                              example: 2
 *                          
 * 
 *      responses:
 *          201:
 *              description: Successfully updated the cart.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              cart_id:
 *                                  type: integer
 *                                  description: The user_id of the updated cart.
 *                                  example: 2
 *                             
 *          400:
 *              description: User could not be updated        
 *
 *
 */ 

    /*
 /*
    router.put("/:cartId", async (req, res) => {
    try {
       const  { newId } = req.body
       const { rows } = await db.query("UPDATE cart SET cart_id = $1 WHERE cart_id = $2 ", [newId, req.params.cartId])
       res.status(200).send('Cart successfully updated.')
    } catch (err){
        res.status(400).send(err)
    }
}) */

//DELETE ROUTES
/**
 * @swagger
 * /cart/{cartId}:
 *   delete:
 *    summary: Delete a single cart.
 *    tags: [Cart]
 *    parameters:
 *      - name: cartId
 *        in: path
 *        required: true
 *        description: The ID of the cart to delete
 *        schema:
 *         type: integer
 *
 *    responses:
 *      201:
 *          description: Cart successfully deleted.
 *
 *      400:
 *          description: Cart cannot be found.
 */
 router.delete("/:cartId", async (req, res) => {
    try {
      const { rows } = await db.query(
        "DELETE FROM cart WHERE cart_id = $1",
        [req.params.cartId]
      );
      res.status(200).send("Cart successfully deleted");
    } catch {
      res.status(404).send("Failed to delete cart.");
    }
  });

module.exports = router
