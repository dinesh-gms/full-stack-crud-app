const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}-${crypto.randomUUID()}-${file.originalname}`
    );
  },
});

const upload = multer({ storage: storage });
module.exports.upload = upload;
