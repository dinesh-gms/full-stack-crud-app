require('dotenv').config();
const Student = require('../model/student.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;

  Student.findOne({ email }).then(user => {
    if (!user) return res.status(404).json({ message: "no users found with this email address" });
    const hash_password = user.password;

    bcrypt.compare(password, hash_password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: err.message })
      if (!isMatch) return res.status(401).json({ message: "Incorrect email and password" })

      const payload = { username: user.student_name, email: user.email }
      const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '1h'})

      Student.findOneAndUpdate({ email }, { is_login: true }, { new: true })
        .then((user) => res.status(200).json({ user, accessToken }))
        .catch(err => res.status(500).json({ message: err.message }))
    })
  }).catch(err => res.status(500).json({ message: err.message }))
}

exports.logout = (req, res) => {
  const email = req.body.email;
  Student.findOneAndUpdate({ email: email }, { is_login: false }, { new: true })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "no users found" });
      return res.status(200).json({ message: "logout successful" })
    })
    .catch(err => res.status(500).json({ message: err.message }))
}