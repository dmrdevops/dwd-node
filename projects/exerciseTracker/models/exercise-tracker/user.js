const mongoose = require('mongoose');
const { Schema } = mongoose;

const Users = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Username too short, please enter between 3 and 30 characters'],
    maxlength: [30, 'Username too long, please enter between 3 and 30 characters']
  }
})

module.exports = mongoose.model('Users', Users);