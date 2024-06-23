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
    if (!q) {
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

// POST: /trips - add a new trip
// Regardless of outcome, response must include HTML status code.
// and JSON message to the req client. 
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if (!q) {
        // database returned no data
        return res
            .status(404)
            .json(err);
    }
    else {
        // return new trip from database
        return res
            .status(201)
            .json(q);
    }

    // uncomment the following to show results of query
    // console.log(q);
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code.
// and JSON message to the req client. 
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode }) // return single record
        .exec();
    // uncomment the following to show results of query
    // console.log(q);
    if (!q) {
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

// PUT: /trips/:tripCode - edit a trip
// Regardless of outcome, response must include HTML status code.
// and JSON message to the req client. 
const tripsUpdateTrip = async (req, res) => {
    const q = await Model
        .findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        ).exec();

    if (!q) {
        // database returned no data
        return res
            .status(400)
            .json(err);
    }
    else {
        // return updated trip from database
        return res
            .status(201)
            .json(q);
    }

    // uncomment the following to show results of query
    // console.log(q);
};

module.exports = {
    tripsList,
    tripsAddTrip,
    tripsFindByCode,
    tripsUpdateTrip
};