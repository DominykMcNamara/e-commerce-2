const Router = require("express-promise-router");
const db = require("../db/index");
const passport = require("../services/passport")

const router = new Router();

//POST ROUTE
/**
 *  @swagger
 * /users/register:
 *  post:
 *      summary: Create a new user.
 *      tags: [Users]
 *      parameters:
 *          - name: body
 *            in: body
 *            required: true
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
 *                              description: The user's email.
 *                              example: DominykSmith@gmail.com
 *                          name:
 *                              type: string
 *                              description: The user's name.
 *                              example: Dominyk McNamara
 *                          username:
 *                              type: string
 *                              description: The user's username
 *                              example: DominykMcNamara
 *                          password:
 *                              type: string
 *                              description: The user's password
 *                              example: HelloWorld123!
 *                      required:
 *                          -  email
 *                          -  name
 *                          -  username
 *                          -  password
 *
 *      responses:
 *          201:
 *              description: Successfully created a new user.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                          user_id:
 *                              type: integer
 *                              description: The user's ID.
 *                              example: 1
 *                          email:
 *                              type: string
 *                              description: The user's email
 *                              example: domniykMcNamara@gmail.com
 *                          name:
 *                              type: string
 *                              description: The user's name.
 *                              example: Dominyk McNamara
 *
 *                          username:
 *                                  type: string
 *                                  description: user's username
 *                                  example: DominykMcNamara
 *                          password:
 *                                  type: string
 *                                  description: The user's password
 *                                  example: HelloWorld123!
 *
 *          400:
 *              description: Failed to create a new user
 *
 *
 */
 router.post("/register", async (req, res) => {
    try {
      const { email, name, username, password } = req.body;
      const { rows } = await db.query(
        "INSERT INTO users (email, name, username, password) VALUES ($1, $2, $3, $4)",
        [email, name, username, password]
      );
      res.status(201).send("User successfully created.");
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.post("/login", async(req, res) => {
      try {
          const {username, password} = req.body
          const response = await db.query( "SELECT * FROM users WHERE username = $1 AND password = $2",
          [username, password])
          res.status(200).send(response);
      } catch (err) {
          res.status(400).send(err)
      }
  })

  module.exports = router