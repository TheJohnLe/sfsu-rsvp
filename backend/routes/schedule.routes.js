module.exports = (app) => {
  const schedules = require("../controllers/schedule.controller.js");

  // Create a new schedule
  app.post("/schedules", schedules.create);

  // Retrieve all schedules
  app.get("/schedules", schedules.findAll);

  // Retrieve a single Schedule with schedule id
  app.get("/schedules/:schedule_id", schedules.findOne);

  // Update a Schedule with schedule id
  app.put("/schedules/:schedule_id", schedules.update);

  // Delete a Schedule with schedule id
  app.delete("/schedules/:schedule_id", schedules.delete);

  // Delte all Schedules
  app.delete("/schedules", schedules.deleteAll);
};
