require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('./config/mongoConnection');

const usersRouter = require('./routes/users');
const resourcesRouter = require('./routes/resources');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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