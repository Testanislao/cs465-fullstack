const Mongoose = require('mongoose');
const List = require('../models/lists');
const User = require('../models/user');
const Novel = require('../models/rrn');
const { ObjectId } = Mongoose.Types;

/* 
 * GET: /lists - retrieves userId document from lists collection, 
 * populates novels array from original id references. 
 * Regardless of outcome, response must include HTML status code.
 * and JSON message to the req client. 
 */
const userList = async (req, res) => {
    try {
        const userId = req.auth._id;
        const q = await List
            .findOne({ UserId: userId }) // find the users' document
            .populate('Novels') // grabs the novels list
            .exec();

        if (!q) {
            // no data in database
            return res.status(404).json({ message: 'No list found' });
        }
        else {
            // return resulting list from database
            return res.status(200).json(q);
        }
    } catch (err) {
        console.error('error retrieving users list', err);
        return res.status(500).json(err);
    }
};

/* 
 * POST: /lists/:id - adds a new novel reference to user list
 * Regardless of outcome, response must include HTML status code.
 * and JSON message to the req client. 
 */
const userAddNovel = async (req, res) => {
    try {
        const userId = req.auth._id;
        const novelId = req.params.id

        if (!ObjectId.isValid(novelId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const novel = await Novel
            .findById(novelId) // return single record
            .exec();
        if (!novel) {
            // novel not found
            return res.status(404).json({ message: 'No novel found' });
        }

        let list = await List
            .findOne({ UserId: userId })
            .exec();
        if (!list) {
            // custom user list not found, create new one
            list = new List({ UserId: userId, Novels: [] });
        }
        if (!list.Novels.includes(novelId)) {
            // add novel reference to list
            list.Novels.push(novelId);
        }
        await list.save(); // send changes to database. 
        res.status(201).json(list);
    } catch (err) {
        console.error('error adding novel', err);
        return res.status(500).json(err);
    }
};

/* 
 * DELETE: /lists/:id - delete a novel reference from user list
 * Regardless of outcome, response must include HTML status code.
 * and JSON message to the req client. 
 */
const userDeleteNovel = async (req, res) => {
    try {
        const userId = req.auth._id;
        const novelId = req.params.id

        if (!ObjectId.isValid(novelId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const novel = await Novel
            .findById(novelId) // return single record
            .exec();
        if (!novel) {
            // novel not found
            return res.status(404).json({ message: 'No novel found' });
        }

        let list = await List
            .findOne({ UserId: userId })
            .exec();
        if (!list) {
            // custom user list not found
            return res.status(404).json({ message: 'No list found' });
        }
        if (!list.Novels.includes(novelId)) {
            // add novel reference to list
            return res.status(404).json({ message: 'No novel found in users list' });
        }
        list.Novels.pull(novelId);

        await list.save(); // send changes to database. 
        res.status(201).json(list);
    } catch (err) {
        console.error('error removing novel', err);
        return res.status(500).json(err);
    }
};

module.exports = {
    userList,
    userAddNovel,
    userDeleteNovel
};

