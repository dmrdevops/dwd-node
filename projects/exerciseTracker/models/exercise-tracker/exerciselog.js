const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseLogs = new Schema ({
  description: {
    type: String,
    required: true,
    maxlength: [50, 'Please keep the description under 50 characters']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'Minimum duration is 1 minute']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

ExerciseLogs.pre('save', next => {
  if(!this.date) {
    this.date = Date.now();
  }
  next();
})

module.exports = mongoose.model('ExcerciseLogs', ExerciseLogs)