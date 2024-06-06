const Mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = Mongoose.model('trips') // endpoint

// GET: /trips - lists all the trips 
// Regardless of outcome, response must include HTML status code.
// and JSON message to the req client. 
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // return all records
        .exec();
    // uncomment the following to show results of query
    // console.log(q);
    if(!q) {
        // no data in database
        return res
            .status(404)
            .json.log(q);
    }
    else {
        // return resulting list from database
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code.
// and JSON message to the req client. 
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // return single record
        .exec();
    // uncomment the following to show results of query
    // console.log(q);
    if(!q) {
        // no data in database
        return res
            .status(404)
            .json.log(q);
    }
    else {
        // return resulting list from database
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};