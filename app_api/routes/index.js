const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

// Import controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// define route for /login endpoint
router
    .route('/login')
    .post(authController.login);

// define route for /register endpoint
router
    .route('/register')
    .post(authController.register);

// define route for /trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // Get request
    .post(auth, tripsController.tripsAddTrip); // Post request to add Trip to DB

// define search by param request
router
    .route('/trips/:tripCode') // Search param is named tripCode
    .get(tripsController.tripsFindByCode) // Get request returns single trip
    .put(auth, tripsController.tripsUpdateTrip) // Put requests updates and returns trip
    .delete(auth, tripsController.tripsDeleteTrip); // Delete requests deletes trip by code

module.exports = router;
