const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true /* ,
    uniqueCaseInsensitive: true */
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//UserSchema.plugin(uniqueValidator);

module.exports = User = mongoose.model("user", UserSchema);
