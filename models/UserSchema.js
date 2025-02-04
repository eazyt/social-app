const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "/images/profilePic.png"
  }

})

// const User = mongoose.model("User", UserSchema)
module.exports  = mongoose.model('User', UserSchema)


// module.exports = User;