const Mongoose = require('mongoose');
const Model = require('../models/rrn'); // endpoint
const { ObjectId } = Mongoose.Types;

// GET: /trips - lists all the trips 
// Regardless of outcome, response must include HTML status code.
// and JSON message to the req client. 
const novelsList = async (req, res) => {
    const q = await Model
        .find({}) // return all records
        .exec();
    // uncomment the following to show results of query
    // console.log(q);
    if (!q) {
        // no data in database
        return res.status(404).json.log(q);
    }
    else {
        // return resulting list from database
        return res.status(200).json(q);
    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code.
// and JSON message to the req client. 
const novelsFindById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    const q = await Model
        .findById(req.params.id) // return single record
        .exec();
    // uncomment the following to show results of query
    // console.log(q);
    if (!q) {
        // no data in database
        return res.status(404).json.log(q);
    }
    else {
        // return resulting list from database
        return res.status(200).json(q);
    }
};


module.exports = {
    novelsList,
    novelsFindById
};