// Bring in the DB connection and Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from trips.json
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf-8'));

// Delete existing records from DB then insert seed documents
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close DB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
})