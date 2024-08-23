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
            .populate({
                path: 'Novels.NovelId',
                model: 'novels'
            }) // grabs the novels list
            .exec();

        if (!q) {
            // no user list in database
            return res.status(404).json({ message: 'No list found' });
        }
        // return resulting list from database
        return res.status(200).json(q);
        
    } catch (err) {
        console.error('error retrieving users list', err);
        return res.status(500).json(err);
    }
};

/* 
 * POST: /lists/:id - adds a new NovelId reference to user list, 
 * including custom fields Status(required: ["To Read", "Completed"]), Rating([1,2,3,4,5]), and Notes.
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
        
        // check if existing novel copy exists
        if (list.Novels.find(novel => novel.NovelId.toString() === novelId)) {
            // novel found, cannot add new one or edit
            return res.status(400).json({ message: 'Novel already exists, cannot add new one, must delete or edit existing copy.' });
        }

        // add novel reference to list
        newNovel = {
            NovelId: novelId,
            Status: req.body.Status || 'To Read', // use provided status or default
            Rating: req.body.Rating || null,
            Notes: req.body.Notes || ''
        }
        list.Novels.push(newNovel);
        
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

        // check if existing novel copy exists, find the index of the novel in the novels array
        const index = list.Novels.findIndex(novel => novel.NovelId.toString() === novelId);
        if (index === -1) {
            // novel index not found
            return res.status(404).json({ message: 'No novel found in users list' });
        }
        // found novel index, remove element at index from novels array
        list.Novels.splice(index, 1);

        await list.save(); // send changes to database. 
        res.status(201).json(list);
    } catch (err) {
        console.error('error removing novel', err);
        return res.status(500).json(err);
    }
};

/* 
 * PUT: /lists/:id - updates a novel reference from user list 
 * Regardless of outcome, response must include HTML status code.
 * and JSON message to the req client. 
 */
const userUpdateNovel = async (req, res) => {
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

        // find the novel in the novels array
        const newNovel = list.Novels.find(novel => novel.NovelId.toString() === novelId);
            if (!newNovel) {
            // novel not found
            return res.status(404).json({ message: 'No novel found in users list' });
        }

        // update novel reference in list
        Object.assign(newNovel, req.body);
        
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
    userDeleteNovel,
    userUpdateNovel
};

