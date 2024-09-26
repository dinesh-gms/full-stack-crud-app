const Student = require("../model/student.model");
const bcrypt = require("bcrypt");

exports.find = (req, res) => {
  Student.find(req.user ? { email: req.user.email } : null)
    .sort({ roll_no: 1 })
    .then((users) => {
      if (users.length === 0)
        return res.status(404).json({ message: "no users found" });
      res.status(200).json(users);
    })
    .catch((err) => res.status(404).json(err.message));
};

exports.create = (req, res) => {
  const { student_name, roll_no, email, password, dob } = req.body;
  const hash_password = bcrypt.hashSync(password, 10);
  const newStudent = new Student({
    student_name,
    roll_no,
    dob,
    email,
    password: hash_password,
    profile: req.file.filename,
  });
  newStudent.save().then((user) => res.status(201).json(user)).catch((err) => res.status(500).json({ message: err.message }))
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { student_name, roll_no, email, dob } = req.body;
  Student.findOneAndUpdate(
    { roll_no: id },
    {
      student_name,
      roll_no,
      dob,
      email,
    }
  )
    .then((user) => {
      if (!user)
        return res.status(404).json({ message: "no user found this id" });
      return res.status(200).json(user);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Student.findOneAndDelete({ roll_no: id })
    .then((user) => {
      if (!user)
        return res.status(404).json({ message: "no user found this id" });
      return res.status(200).json({ message: "deleted successfully" });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};
