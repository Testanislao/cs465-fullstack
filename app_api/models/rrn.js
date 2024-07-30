const mongoose = require('mongoose');
// Define the trip schema
const novelSchema = new mongoose.Schema({
    Title: { type: String, required: true, index: true },
    Link: { type: String, required: false },
    Tags: { type: [String], required: false },
    Stats: {
        Followers: { type: Number, required: false },
        Rating: { type: Number, required: false },
        Pages: { type: Number, required: false },
        Views: { type: Number, required: false },
        Chapters: { type: Number, required: false },
        LastUpdated: { type: Date, required: false }
    }
});
const Novel = mongoose.model('Novel', novelSchema);
module.exports = Novel;