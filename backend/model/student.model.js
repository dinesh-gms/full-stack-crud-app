const mongoose = require('mongoose');

//create user schema
const StudentSchema = new mongoose.Schema({
  student_name: {
    type: String,
    required: [true, "username mustn't be empty"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate: {
      validator: (v) => v.includes('@'),
      message: props => `${props.value} is not a valid email. @ is used in email field`,
    }
  },
  password: {
    type: String,
    minLength: [8, "password must be more than 8 letters"],
    required: true,
  },
  roll_no: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  is_login: { type: Boolean, default: false },
}, {
  timestamps: true,
})

module.exports = mongoose.model("student", StudentSchema);