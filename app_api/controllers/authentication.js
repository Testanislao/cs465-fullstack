const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }
    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);
        await user.save();
        const token = user.generateJwt();
        return res
            .status(200)
            .json({ token });
    } catch (err) {
        return res
            .status(400)
            .json(err);
    }
};

const login = async (req, res) => {
    //console.log(req.body);
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('passport authentication error', err);
            return res
                .status(404)
                .json(err);
        }
        if (user) {
            const token = user.generateJwt();
            res
                .status(200)
                .json({ token });
        } else {
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};

module.exports = {
    register,
    login
};