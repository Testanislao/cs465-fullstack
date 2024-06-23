const express = require('express');
const router = express.Router();

// Import controllers
const tripsController = require('../controllers/trips');

// define route for /trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // Get request
    .post(tripsController.tripsAddTrip); // Post request to add Trip to DB

// define search by param request
router
    .route('/trips/:tripCode') // Search param is named tripCode
    .get(tripsController.tripsFindByCode) // Get request returns single trip
    .put(tripsController.tripsUpdateTrip); // Put requests updates and returns trip

module.exports = router;
