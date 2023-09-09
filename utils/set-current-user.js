const jwt = require('jsonwebtoken');
const User = require('../models/user');

const unauthenticatedRoutes = ['/login', '/create-user'];

module.exports = async (req, res, next) => {
    try {
        if (!unauthenticatedRoutes.includes(req.url)) {
            const bearerToken = req.headers.authorization;
            const token = bearerToken.replace('Bearer ', '');
            const decoded = jwt.verify(token, 'meet-it');
            const user = await User.findOne({ _id: decoded.user_id });
            if (!user) {
                res.sendStatus(401);
                return;
            }
            req.currentUser = user;
        }  
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
};