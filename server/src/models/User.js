const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true }, // Thêm trường role vào mô hình User
});

const User = mongoose.model('User', userSchema);

module.exports = User;
