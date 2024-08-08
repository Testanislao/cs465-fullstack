const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

// Import controllers
const novelsController = require('../controllers/novels');
const listsController = require('../controllers/lists');
const authController = require('../controllers/authentication');

// define route for /login endpoint
router
    .route('/login')
    .post(authController.login);

// define route for /register endpoint
router
    .route('/register')
    .post(authController.register);

/* 
 * /novels endpoint should be a public Get endpoint, 
 * for accessing both single novels and list of all novels.
 */

//define route for /novels endpoint
router
    .route('/novels')
    .get(novelsController.novelsList); // Get request for JSON off all novels in DB

// define search by param request
router
    .route('/novels/:id') // Search param is default MongoDB _id
    .get(novelsController.novelsFindById); // Get request returns single novel 

/* 
 * /lists endpoint should be a "private" endpoint, 
 * for accessing unique user list and modifying it. 
 */


// define route for /lists endpoint
router
    .route('/lists')
    .get(auth, listsController.userList); // Get request returns user list

// define search by param request
router
    .route('/lists/:id') // Search param is default MongoDB _id
    .post(auth, listsController.userAddNovel) // Post request to add novel to user list
    .delete(auth, listsController.userDeleteNovel); // Delete requests deletes novel by id
    
module.exports = router;
