const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 5000;

// bypass Access-Control-Allow-Origin
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend server." });
});

require("./routes/appointment.routes")(app);
require("./routes/faculty.routes")(app);
require("./routes/student.routes")(app);
require("./routes/schedule.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
