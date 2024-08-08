const mongoose = require('mongoose');

// Define the list schema
const listSchema = new mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    Novels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'novels' }]
});
const List = mongoose.model('lists', listSchema);
module.exports = List;