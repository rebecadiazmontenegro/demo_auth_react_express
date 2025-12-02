require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('./config/mongoConnection');
require('./config/googleAuth');

const usersRouter = require('./routes/users');
const resourcesRouter = require('./routes/resources');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors());

// Middleware de sesión y Passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the React app only in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use('/api/test', (req, res) => { res.status(200).json({ status: "connected" }) });
app.use('/api/users', usersRouter);
app.use('/api/resources', resourcesRouter);

// Fallback to React app for non-API routes in production
if (process.env.NODE_ENV === 'production') {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});