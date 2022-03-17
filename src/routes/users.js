const Router = require("express-promise-router");
const { append } = require("express/lib/response");
const db = require("../db/index");

const router = new Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Everything about your users
 */
//GET ROUTES
/**
 * @swagger
 * /users:
 *  get:
 *    summary: Get all users
 *    tags: [Users]
 *
 *    responses:
 *      200:
 *          description: A list of all users.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user_id:
 *                              type: integer
 *                              description: The user's ID.
 *                              example: 1
 *                          name:
 *                              type: string
 *                              description: The user's name.
 *                              example: Dominyk McNamara
 *                          email:
 *                              type: string
 *                              description: The user's email
 *                              example: domniykMcNamara@gmail.com
 *                          username:
 *                                  type: string
 *                                  description: user's username
 *                                  example: DominykMcNamara
 *                          password:
 *                                  type: string
 *                                  description: The user's password
 *                                  example: 1223dsad
 *      400:
 *          description: Users cannot be found.
 */
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM users");
    if (rows.length === 0) {
      res.status(200).send("There are currently no users");
    } else {
      res.status(200).send(rows);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
/**
 * @swagger
 * /users/{userId}:
 *  get:
 *      summary: Retrieve a single user.
 *      tags: [Users]
 *      parameters:
 *          - name: userId
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          201:
 *              description: A single user.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                          user_id:
 *                              type: integer
 *                              description: The user's ID.
 *                              example: 1
 *                          name:
 *                              type: string
 *                              description: The user's name.
 *                              example: Dominyk McNamara
 *                          email:
 *                              type: string
 *                              description: The user's email
 *                              example: domniykMcNamara@gmail.com
 *                          username:
 *                                  type: string
 *                                  description: user's username
 *                                  example: DominykMcNamara
 *                          password:
 *                                  type: string
 *                                  description: The user's password
 *                                  example: 1223dsad
 *          400:
 *              description: User cannot be found.
 */
router.get("/:userId", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE user_id = $1", [
      req.params.userId,
    ]);
    if (rows.length === 0) {
      res.status(201).send("User does not exist.");
    } else {
      res.status(201).send(rows[0]);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//PUT ROUTES
/**
 * @swagger
 * /users/{userId}:
 *  put:
 *      summary: Update a user's information.
 *      tags: [Users]
 *      parameters:
 *         - name: body
 *           in: body
 *           required: true
 *           description: Updated user information.
 *         - name: userId
 *           in: path
 *           required: true
 *           description: ID of the user to update.
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
 *                          email:
 *                              type: string
 *                              description: user's updated email.
 *                              example: DominykMcNamara@gmail.com
 *                          name:
 *                              type: string
 *                              description: User's updated name.
 *                              example: Dominyk McNamara
 *                          username:
 *                              type: string
 *                              description: User's updated username.
 *                              example: DominykMcNamara
 *                          password:
 *                              type: string
 *                              description: User's updated password.
 *                              example: HelloWorld123
 * 
 *      responses:
 *          201:
 *              description: Successfully updated the user.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user_id:
 *                                  type: integer
 *                                  description: The user_id of the updated user.
 *                                  example: 1
 *                              email:
 *                                  type: string
 *                                  description: The updated email of the user.
 *                                  example: DominykMcNamara@gmail.com
 *                              name:
 *                                  type: string
 *                                  description: The updated name of the user.  
 *                                  example: Dominyk McNamara
 *                              username:
 *                                  type: string
 *                                  description: The updated username of the user
 *                                  example: DominykMcNamara
 *                              password:
 *                                  type: string
 *                                  description: The updated password of the user
 *                                  example: HelloWorld123!
 * 
 *          400:
 *              description: User could not be updated        
 *
 *
 */
router.put("/:userId", async (req, res) => {
    try {
       const  { email, name, username, password} = req.body
       const { rows } = await db.query("UPDATE users SET email = $1, name = $2, username = $3, password = $4 WHERE user_id = $5", [email, name, username, password, req.params.userId])
       res.status(200).send('User successfully updated.')
    } catch (err) {
        res.status(400).send(err)
    }
})
//DELETE ROUTES
/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *    summary: Delete a single user.
 *    tags: [Users]
 *    parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        description: The ID of the user to delete
 *        schema:
 *         type: integer
 *
 *    responses:
 *      201:
 *          description: User successfully deleted.
 *
 *      400:
 *          description: User cannot be found.
 */
 router.delete("/:userId", async (req, res) => {
    try {
      const { rows } = await db.query(
        "DELETE FROM users WHERE user_id = $1",
        [req.params.userId]
      );
      res.status(200).send("User successfully deleted");
    } catch (err) {
      res.status(404).send(err);
    }
  });
module.exports = router;
