module.exports = (app) => {
  const faculties = require("../controllers/faculty.controller.js");

  // Create a new Faculty
  app.post("/faculties", faculties.create);

  // Retrieve all faculties
  app.get("/faculties", faculties.findAll);

  // Retrieve a single Faculty with session_key
  app.get("/faculty/:sess_key", faculties.findOne);

  // Retrieve faculty's zoom
  app.get("/faculty/:sess_key/zoom", faculties.findZoom);

  // Retrieve all appointments from specific faculty with session key
  app.get("/faculties/:sess_key/appointments", faculties.findAllAppointments);

  // Retrieve all of todays appointments from specific faculty
  app.get(
    "/faculty/:sess_key/appointments/today",
    faculties.findTodaysAppointments
  );

  // Retrieve all active appointments from specific faculty
  app.get(
    "/faculty/:sess_key/appointments/active",
    faculties.findActiveAppointments
  );

  // Retrieve the list of scheduled times of a particular faculty
  app.get("/faculty/:sess_key/schedules", faculties.findSchedule);

  // Update a Faculty with faculty id
  app.put("/faculty/:f_id", faculties.update);

  // Delete a Faculty with faculty id
  app.delete("/faculty/:f_id", faculties.delete);

  // Create a new Faculty
  app.delete("/faculties", faculties.deleteAll);
};
