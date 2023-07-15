const mongoose = require('../db');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role:{ type: Number, default: null },
  address:{ type: String, default: null },
  image:{ type: String, default: null },
  phone:{ type: Number, default: null },
  subjects:{ type: String, default: null }
});


const User = mongoose.model('User', userSchema);
// const Teacher = mongoose.model('Teacher', userSchema);
// const Lecturer = mongoose.model('Lecturer', userSchema);
// const  Councillor= mongoose.model('Councillor', userSchema);

const Admin = mongoose.model('Admin', userSchema);

module.exports = {
  User:User,
  Admin:Admin
};