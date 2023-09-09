const User = require('../models/user');
const AuthHelper = require('../helpers/auth');
const AuthPresenter = require('../presenters/auth');
const jwt = require('jsonwebtoken');

class AuthController {
    static async login(req, res, next) {
        try {
            const { email_id, password } = req.body.data;
            const user = await User.findOne({ email_id: email_id });
            if (user) {
                const isPasswordMatch = await AuthHelper.isPasswordMatch(password, user.password);
                if (!isPasswordMatch) {
                    res.json(401).json({ message: 'Invalid credentials' });
                } else {
                    await user.updateLastLogin();
                    const presentableUserData = AuthPresenter.userDetails(user);
                    const token = jwt.sign({
                        user_id: user._id,
                        // exp: 2 * 24 * 60 * 6    0 * 1000, // 2 days
                    }, 'meet-it'); // TODO: need to change app secret
                    res.header('Authorization', `Bearer ${token}`);
                    res.json({ data: presentableUserData });
                }
                // TODO: need to set JWT token
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            next(error);
        }
    }

    static logout(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    } 

    static async createUser(req, res, next) {
        try {
            const data = req.body.data;
            const user = await User.findOne({ email_id: data.email_id }, { _id: 1 }).lean();
            if (user) {
                res.sendStatus(409);
            } else {
                const userCreationData = await AuthHelper.constructUserCreationPayload(data);
                await User.createUser(userCreationData);
                res.sendStatus(204);
            }
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = AuthController;