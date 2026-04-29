const User = require('./User');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    
});

const Administration = User.discriminator('administration', adminSchema);
module.exports = Administration;
