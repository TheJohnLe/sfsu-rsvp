const Schedule = require("../models/schedule.model");

// Create and Save a new schedule
/*
TODO: 
- Restrict creating same timeslot
- Populate more appointments
*/
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // create a schedule
  const schedule = new Schedule({
    schedule_id: req.body.schedule_id,
    f_id: req.body.f_id,
    type: req.body.type,
    day: req.body.day,
    start: req.body.start,
    end: req.body.end,
  });

  // save schedule in the database
  Schedule.create(schedule, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the schedule.",
      });
    else res.send(data);
  });
};

// Retrieve all schedules from the database.
exports.findAll = (req, res) => {
  Schedule.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving schedules.",
      });
    else res.send(data);
  });
};

// Find a single schedule with a id
exports.findOne = (req, res) => {
  Schedule.findById(req.params.schedule_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Schedule not found with id ${req.params.schedule_id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving schedule with id " + req.params.schedule_id,
        });
      }
    } else res.send(data);
  });
};

// Update a schedule identified by the id in the request
exports.update = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Schedule.updateById(
    req.params.schedule_id,
    new Schedule(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(400).send({
            message: `Schedule not found with id ${req.params.schedule_id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating Schedule with id " ${req.params.schedule_id}`,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a schedule with the specified id in the request
exports.delete = (req, res) => {
  Schedule.remove(req.params.schedule_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `schedule not found with id ${req.params.schedule_id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete schedule with id ${req.params.schedule_id}.`,
        });
      }
    } else res.send({ message: `Schedule deleted successfully!` });
  });
};

// Delete all Schedule from the database.
exports.deleteAll = (req, res) => {
  Schedule.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all schedules.",
      });
    } else res.send({ message: `All schedules were deleted successfully!` });
  });
};
