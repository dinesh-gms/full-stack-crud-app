const express = require("express");
const router = express.Router();
const StudentController = require("../controller/student.controller");
const LoginController = require("../controller/login.controller");
const jwt = require("jsonwebtoken");
const { upload } = require("../middleware/upload");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const authUser = jwt.decode(token);

  if (token == null)
    return res.status(401).json({ message: "you're not authorised" });

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
    if (err) {
      req.body = authUser;
      LoginController.logout(req, res);
      return;
    }
    req.user = user;
    next();
  });
}

router.get("/checkLogin", authenticateToken, StudentController.find);
router.get("/", StudentController.find);
router.post("/", upload.single("profile"), StudentController.create);
router.get("/:id", StudentController.find);
router.put("/:id", StudentController.update);
router.delete("/:id", StudentController.delete);
router.post("/login", LoginController.login);
router.post("/logout", LoginController.logout);

module.exports = router;
