module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  // Create a new user
  app.post("/user", user.create);

  // Attempt to create session
  app.post("/login", user.login);

  // Retrieve all user
  app.get("/users", user.findAll);

  // Retrieve a single user via sfsu id
  app.get("/user/:sfsu_id", user.findOne);

  // Retrieve user's type by session key
  app.get("/user/session/:sess_key", user.findUserType);

  // Update a user with sfsu id
  app.put("/user/:sfsu_id", user.update);

  // Delete a user with sfsu id
  app.delete("/user/:sfsu_id", user.delete);

  // Delete all user
  app.delete("/user", user.deleteAll);
};
