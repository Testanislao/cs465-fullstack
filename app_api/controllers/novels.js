const Mongoose = require('mongoose');
const Model = require('../models/rrn'); // endpoint
const { ObjectId } = Mongoose.Types;

/*
 * GET: /novels - lists all the novels  
 * Regardless of outcome, response must include HTML status code.
 * and JSON message to the req client. 
 */
const novelsList = async (req, res) => {
    const q = await Model
        .find({}) // return all records
        .exec();
    if (!q) {
        // no data in database
        return res.status(404).json({ message: 'No novels found' });
    }
    else {
        // return resulting list from database
        return res.status(200).json(q);
    }
};

/* 
 * GET: /novels/:id - lists a single novel
 * Regardless of outcome, response must include HTML status code.
 * and JSON message to the req client. 
 */
const novelsFindById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    const q = await Model
        .findById(req.params.id) // return single record
        .exec();
    if (!q) {
        // no data in database
        return res.status(404).json({ message: 'No novel found' });
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