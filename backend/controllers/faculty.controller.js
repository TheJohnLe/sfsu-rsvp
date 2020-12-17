const Faculty = require("../models/faculty.model");
const Schedule = require("../models/schedule.model");

// Create and Save a new faculty
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // create a faculty
  const faculty = new Faculty({
    sfsu_id: req.body.sfsu_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    zoom: req.body.zoom,
    type: "F",
  });

  // save faculty in the database
  Faculty.create(faculty, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the faculty.",
      });
    else res.send(data);
  });
};

// Retrieve all faculties from the database.
exports.findAll = (req, res) => {
  Faculty.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving faculties.",
      });
    else res.send(data);
  });
};

// Find a single faculty with a id
exports.findOne = (req, res) => {
  Faculty.findFacultyBySession(req.params.sess_key, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Faculty not found with session ${req.params.sess_key}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving faculty with session " + req.params.sess_key,
        });
      }
    } else res.send(data);
  });
};

// Find faculty's Zoom link
exports.findZoom = (req, res) => {
  Faculty.findZoomBySession(req.params.sess_key, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Faculty not found with session ${req.params.sess_key}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving faculty with session " + req.params.sess_key,
        });
      }
    } else res.send(data);
  });
};

// Find all appointments with faculty id
exports.findAllAppointments = (req, res) => {
  Faculty.findAppointmentsBySession(req.params.sess_key, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Appointment not found with session ${req.params.sess_key}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving appointment with session " + req.params.sess_key,
        });
      }
    } else res.send(data);
  });
};

// Find all active appointments with faculty id
exports.findTodaysAppointments = (req, res) => {
  Faculty.findTodaysAppointmentsBySession(req.params.sess_key, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Appointments not found with session ${req.params.sess_key}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving appointments with session " + req.params.sess_key,
        });
      }
    } else res.send(data);
  });
};

// Find all active appointments with faculty id
exports.findActiveAppointments = (req, res) => {
  Faculty.findActiveAppointmentsBySession(req.params.sess_key, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Appointments not found with session ${req.params.sess_key}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving appointments with session " + req.params.sess_key,
        });
      }
    } else res.send(data);
  });
};

exports.findSchedule = (req, res) => {
  Schedule.findByFaculty(req.params.sess_key, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Schedule not found with session ${req.params.sess_key}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving schedule with session " + req.params.sess_key,
        });
      }
    } else res.send(data);
  });
};

// Update a faculty identified by the id in the request
exports.update = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Faculty.updateById(req.params.f_id, new Faculty(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Faculty not found with id ${req.params.f_id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating Faculty with id " ${req.params.f_id}`,
        });
      }
    } else res.send(data);
  });
};

// Delete a faculty with the specified id in the request
exports.delete = (req, res) => {
  Faculty.remove(req.params.f_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `faculty not found with id ${req.params.f_id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete faculty with id ${req.params.f_id}.`,
        });
      }
    } else res.send({ message: `Faculty deleted successfully!` });
  });
};

// Delete all Faculty from the database.
exports.deleteAll = (req, res) => {
  Faculty.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all faculties.",
      });
    } else res.send({ message: `All faculties were deleted successfully!` });
  });
};
