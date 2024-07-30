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

// define route for /novels endpoint
router
.route('/novels')
.get(novelsController.novelsList); // Get request

// define search by param request
router
    .route('/novels/:id') // Search param is named tripCode
    .get(novelsController.novelsFindById) // Get request returns single trip

/*
// define route for /lists endpoint
router
    .route('/lists')
    .get(listsController.userList) // Get request
    .post(auth, listsController.userAddNovel); // Post request to add Trip to DB

// define search by param request
router
    .route('/lists/:novelTitle') // Search param is named tripCode
    .get(listsController.userFindByTitle) // Get request returns single trip
    .put(auth, listsController.userUpdateTitle) // Put requests updates and returns trip
    .delete(auth, listsController.userDeleteTitle); // Delete requests deletes trip by code

    */
module.exports = router;
