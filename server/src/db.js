const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/BlogApp';

const connectToDatabase = async () => {
    if (mongoose.connections[0].readyState) {
        return mongoose.connections[0];
    }
    return mongoose.connect(MONGODB_URI);
};

module.exports = { connectToDatabase };
