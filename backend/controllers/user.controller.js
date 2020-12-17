const User = require("../models/user.model");

// Create and Save a new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // create a user object
  const user = new User({
    sfsu_id: req.body.sfsu_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    zoom: req.body.zoom,
    type: req.body.type,
  });

  // create a session and save the user object
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while creating the user.",
      });
    else res.send(data);
  });
};

exports.login = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // create a login object
  const login = new User({
    email: req.body.email,
    password: req.body.password,
  });
  //console.log("email", email, "password", password);
  // create a session and save the user object
  User.login(login, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while creating the user.",
      });
    else res.send(String(data));
  });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while retrieving students.",
      });
    else res.send(data);
  });
};

// Find a single user with a id
exports.findOne = (req, res) => {
  User.findById(req.params.sfsu_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with sfsu id ${req.params.sfsu_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with sfsu id " + req.params.sfsu_id,
        });
      }
    } else res.send(data);
  });
};

exports.findUserType = (req, res) => {
  User.findType(req.params.sess_key, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with session ${req.params.sess_key}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with session " + req.params.sess_key,
        });
      }
    } else res.send(data);
  });
}

// Update a user identified by the id in the request
exports.update = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.updateById(req.params.email, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `User not found with id ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating User with id " ${req.params.email}`,
        });
      }
    } else res.send(data);
  });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  User.remove(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `user not found with id ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete user with id ${req.params.email}.`,
        });
      }
    } else res.send({ message: `User deleted successfully!` });
  });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all students.",
      });
    } else res.send({ message: `All students were deleted successfully!` });
  });
};
