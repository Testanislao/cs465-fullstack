const express = require('express');
const router = express.Router();

// Import controllers
const tripsController = require('../controllers/trips');

// define route for /trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList); // Get request

// define Get search by param request
router
    .route('/trips/:tripCode') // Search param is named tripCode
    .get(tripsController.tripsFindByCode);

module.exports = router;
