const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('./auth/passport');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/BlogApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

app.use(
    session({
        secret: '21rz2+7laLiq0VAV3Ss2LUg4/POU7/5dksHZ59EdeAM=',
        resave: false,
        saveUninitialized: true,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoutes'); // Đảm bảo đường dẫn đúng đến file authRoutes.js của bạn
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes'); // Đảm bảo đường dẫn đúng đến file userRoutes.js của bạn
app.use('/api/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
