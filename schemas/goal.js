const mongoose = require('mongoose');
const { Schema } = mongoose;
const { goalStatus, goalPriority } = require('../constants');

const tasks = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    priority: {
        type: Number,
        required: true,
        enum: Object.values(goalPriority),
    },
    status: {
        type: Number,
        required: true,
        enum: Object.values(goalStatus),
    },
}, { _id: false });

const schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
};

const GoalSchema = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    tasks: [tasks],
}, schemaOptions);

module.exports = GoalSchema;