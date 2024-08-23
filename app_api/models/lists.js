const mongoose = require('mongoose');

// Define the list schema
const listSchema = new mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    Novels: [{ 
        NovelId: { type: mongoose.Schema.Types.ObjectId, ref: 'novels' },
        Status: { type: String, enum: ["To Read", "Completed"], required: true },
        Rating: { type: Number, enum: [1,2,3,4,5], required: false }, 
        Notes: { type: String, required: false}
    }]
});
const List = mongoose.model('lists', listSchema);
module.exports = List;