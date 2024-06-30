var express = require('express');
var router = express.Router();
const ctrlError = require('../controllers/error');

/* GET error page. */
router.get('/', ctrlError.error);

module.exports = router;


