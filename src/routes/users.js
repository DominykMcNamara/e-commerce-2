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
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM users')
       if (rows.length === 0) {
           res.status(200).send('There are currently no users')
       } else {
           res.status(200).send(rows)
       }
    } catch (err) {
        res.status(400).send('Users cannot be found.')
    }
})
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
router.get('/:userId', async(req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE user_id = $1', [req.params.userId])
        if (rows.length === 0) {
            res.status(201).send('User does not exist.')
        } else {
            res.status(201).send(rows[0])
        }
    } catch {
        res.status(400).send("User cannot be found.")
    }
})

module.exports = router;