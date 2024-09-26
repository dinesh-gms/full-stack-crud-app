const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const apiRoutes = require("./routes/user.routes");
require("./config/db.config")();
const port = process.env.PORT || 4000;

//initialize express to the variable app
const app = express();

//middlewares
app.use(cors());
app.use(express.static("./uploads"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use("/api/students/", apiRoutes);

//create server
app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);
