module.exports = (app) => {
  const appointments = require("../controllers/appointment.controller.js");

  // Create a new Appointment
  app.post("/appointments", appointments.create);

  // Retrieve all appointments
  app.get("/appointments", appointments.findAll);

  // Retrieve a single Appointments with appointment id
  app.get("/appointments/:appointment_id", appointments.findOne);

  // Update a Appointments with appointment id
  app.put("/appointments/:appointment_id", appointments.update);

  // Delete a Appointments with appointment id
  app.delete("/appointments/:appointment_id", appointments.delete);

  // Create a new Appointments
  app.delete("/appointments", appointments.deleteAll);
};
