const mongoose = require('mongoose');
const { GoalSchema } = require('../schemas');
const { Model } = mongoose;

class Goal extends Model {

}

module.exports = mongoose.model(Goal, GoalSchema, 'goals');