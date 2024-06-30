const Mongoose = require('mongoose');
const Trip = require('../models/travlr');
const User = require('../models/user');
const Model = Mongoose.model('trips') // endpoint

/**
 * 
 * Had to refractor methods to async functions 
 * that used promises. 
 * Awaits the get user function, 
 * returns a callback, 
 * continues with the promise (req, res) 
 * for each Post, Put, Delete. 
 * .then and .catch for resolution/rejection of promise. 
 * 
 * Tried to use multiple await functions 
 * with try/catch blocks. 
 * Ended up having issues with multiple return statements 
 * and .json header responses. 
 * The db manipulations worked but the status codes and 
 * error handling was messed up.
 * 
 */

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
        return res.status(404).json.log(q);
    }
    else {
        // return resulting list from database
        return res.status(200).json(q);
    }
};

// POST: /trips - add a new trip
// Regardless of outcome, response must include HTML status code.
// and JSON message to the req client. 
const tripsAddTrip = async (req, res) => {
    await getUser(req, res,
        (req, res) => {
            Trip.create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }).then(q => {
                if (!q) {
                    // returned no data
                    return res.status(404).send({
                        message: "Trip not found with code"
                    });
                }
                // return new trip from database
                res.status(201).json(q);
            }).catch(err => {
                // user not validated. 
                console.error('error adding trip', err);
                return res.status(500).json(err);
            })
        }
    )
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
        return res.status(404).json.log(q);
    }
    else {
        // return resulting list from database
        return res.status(200).json(q);
    }
};

// PUT: /trips/:tripCode - edit a trip
// Regardless of outcome, response must include HTML status code.
// and JSON message to the req client. 
const tripsUpdateTrip = async (req, res) => {
    await getUser(req, res,
        (req, res) => {
            Model.findOneAndUpdate(
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
            ).then(q => {
                if (!q) {
                    // database returned no data
                    return res.status(400).send({
                        message: "Trip not found with code"
                    });
                }
                // return updated trip from database
                res.status(201).json(q);
            }).catch(err => {
                // user not validated. 
                console.error('error editing trip', err);
                return res.status(500).json(err);
            })
        }
    )
};

// DELETE: /trips/:tripCode - delete a trip
// Regardless of outcome, response must include HTML status code.
// and JSON message to the req client. 
const tripsDeleteTrip = async (req, res) => {
    await getUser(req, res,
        (req, res) => {
            Model.findOneAndDelete(
                { code: req.params.tripCode }
            ).then(q => {
                if (!q) {
                    // database returned no data
                    return res.status(404).send({
                        message: "Trip not found with code"
                    });
                }
                // return deleted trip from database
                res.status(200).json(q);
            }).catch(err => {
                // user not validated. 
                console.error('error editing trip', err);
                return res.status(500).json(err);
            })
        }
    )
};

// Helper method to validate user credentials. 
// Finds user in db with email, 
// if found invokes the callback with (req, res, user.name)
const getUser = async (req, res, callback) => {
    if (req.auth && req.auth.email) {
        try {
            const user = await User
                .findOne({
                    email: req.auth.email
                })
                .exec();

            if (!user) {
                return res
                    .status(404)
                    .json({
                        message: "User not found"
                    });
            }
            callback(req, res, user.name);
        } catch (err) {
            return res
                .status(404)
                .json({
                    message: "User not found"
                });
        }
    }
};

module.exports = {
    tripsList,
    tripsAddTrip,
    tripsFindByCode,
    tripsUpdateTrip,
    tripsDeleteTrip
};