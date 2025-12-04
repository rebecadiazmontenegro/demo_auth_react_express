const express = require('express');
const passport = require('passport');
const usersRouter = express.Router();
const users = require('../controllers/users');
const getAccessToken = require('../middleware/getAccessToken');
const decodeToken = require('../middleware/decodeToken');
const adminRoutes = require('../middleware/adminRoutes');


usersRouter.post('/signup', users.signup);
usersRouter.post('/login', users.login);
usersRouter.get('/logout', users.logout);
usersRouter.get('/all', getAccessToken, decodeToken, adminRoutes, users.getAllUsers);

// Google OAuth login route
usersRouter.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], prompt: 'select_account' } ));

// Google OAuth callback route
usersRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const token = req.user.token;
        // La cookie debe tener httpOnly en false para ser accesible desde el frontend en la redirección de Google
        res.cookie('access_token', token, { httpOnly: false }); // Set the access_token cookie.
        res.set('Authorization', `Bearer ${token}`); // Set the Authorization header
        // FRONTEND_URL=http://localhost:3000
        res.redirect(process.env.FRONTEND_URL); // Use FRONTEND_URL from environment variables
    }
);

module.exports = usersRouter;