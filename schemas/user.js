const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    settings: {
        type: Object,
        default: {},
    },
    email_id: {
        type: String,
        required: true,
    },
    phone_no: {
        type: String,
        required: true,
    },
    last_login_at: Date,
}, schemaOptions);

module.exports = UserSchema;