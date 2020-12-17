const Student = require("../models/student.model");

// Create and Save a new student
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // create a student
  const student = new Student({
    s_id: req.body.s_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    zoom: null,
    type: "S",
  });

  // save student in the database
  Student.create(student, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the student.",
      });
    else res.send(data);
  });
};

// Retrieve all students from the database.
exports.findAll = (req, res) => {
  Student.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while retrieving students.",
      });
    else res.send(data);
  });
};

// Find a single student with a id
exports.findStudent = (req, res) => {
  Student.findById(req.params.s_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Student not found with id ${req.params.s_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving student with id " + req.params.s_id,
        });
      }
    } else res.send(data);
  });
};

// Find the history of completed appointments of particular student
exports.findHistory = (req, res) => {
  Student.retrieveHistory(req.params.s_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Student not found with id ${req.params.s_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving student with id " + req.params.s_id,
        });
      }
    } else res.send(data);
  });
};

// Find all appointments with student id
exports.findCurrentAppointments = (req, res) => {
  Appointment.findActiveAppointments(req.params.sess_key, (err, data) => {
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

// Update a student identified by the id in the request
exports.update = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Student.updateById(req.params.s_id, new Student(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Student not found with id ${req.params.s_id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating Student with id " ${req.params.s_id}`,
        });
      }
    } else res.send(data);
  });
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
  Student.remove(req.params.s_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `student not found with id ${req.params.s_id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete student with id ${req.params.s_id}.`,
        });
      }
    } else res.send({ message: `Student deleted successfully!` });
  });
};

// Delete all Student from the database.
exports.deleteAll = (req, res) => {
  Student.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all students.",
      });
    } else res.send({ message: `All students were deleted successfully!` });
  });
};
