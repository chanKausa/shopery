const mongoose = require('mongoose');
const { UserSchema } = require('../schemas');
const { Model } = mongoose;

class User extends Model {
    static async createUser(data) {
        return User.create(data);
    }

    updateLastLogin() {
        return this.updateOne({ last_login_at: new Date() });
    }
}

module.exports = mongoose.model(User, UserSchema, 'users');