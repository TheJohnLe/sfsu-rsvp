const Appointment = require("../models/appointment.model");

// Create and Save a new appointment
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // create a appointment
  const appointment = new Appointment({
    appointment_id: req.body.appointment_id,
    type: req.body.type,
    start: req.body.start,
    end: req.body.end,
    s_id: req.body.s_id,
    f_id: req.body.f_id,
    s_notes: req.body.s_notes,
    f_notes: req.body.f_notes,
    absent: req.body.absent,
    late: req.body.late,
    completed: req.body.completed,
  });

  // save appointment in the database
  Appointment.create(appointment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the appointment.",
      });
    else res.send(data);
  });
};

// Find a single appointment with a id
exports.findOne = (req, res) => {
  Appointment.findById(req.params.appointment_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Appointment not found with id ${req.params.appointment_id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving appointment with id " + req.params.appointment_id,
        });
      }
    } else res.send(data);
  });
};

// Retrieve all appointments from the database.
exports.findAll = (req, res) => {
  Appointment.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving appointments.",
      });
    else res.send(data);
  });
};

// Update a appointment identified by the id in the request
exports.update = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Appointment.updateById(
    req.params.appointment_id,
    new Appointment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(400).send({
            message: `Appointment not found with id ${req.params.appointment_id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating Appointment with id " ${req.params.appointment_id}`,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a appointment with the specified id in the request
exports.delete = (req, res) => {
  Appointment.remove(req.params.appointment_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `appointment not found with id ${req.params.appointment_id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete appointment with id ${req.params.appointment_id}.`,
        });
      }
    } else res.send({ message: `Appointment deleted successfully!` });
  });
};

// Delete all Appointment from the database.
exports.deleteAll = (req, res) => {
  Appointment.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all appointments.",
      });
    } else res.send({ message: `All appointments were deleted successfully!` });
  });
};
