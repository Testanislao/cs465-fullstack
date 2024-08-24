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

/* 
 * GET: /novels/search - returns novels collection query
 * Regardless of outcome, response must include HTML status code.
 * and JSON message to the req client. 
 */
const novelsSearch = async (req, res) => {
    try {
        const { title, tag, sortBy = 'Title', sortOrder = 'asc', limit = 10 } = req.query;      
        const q = {};

        if (title) {
            // if title exists in the query, change it to case insensitive
            q.Title = new RegExp(title, 'i');
        }
        if (tag) {
            q.Tags = tag;
        }

        // validate sorting params
        const validParams = ['Title', 'Stats.Followers', 'Stats.Rating', 'Stats.Pages', 'Stats.Views', 'Stats.Chapters', 'Stats.Last Updated'];
        const sortField = validParams.includes(sortBy) ? sortBy : 'Title';
        const sortOrderValue = sortOrder === 'desc' ? -1 : 1;

        const novels = await Model.find(q).sort({[sortField] : sortOrderValue }).limit(parseInt(limit)).exec();
        return res.status(200).json(novels);
    } catch (err) {
        console.error('error searching novels', err);
        return res.status(500).json(err);
    }
};

module.exports = {
    novelsList,
    novelsFindById,
    novelsSearch
};