// Retrieve all appointments from specific student
module.exports = (app) => {
  const students = require("../controllers/student.controller.js");

  // Create a new Student
  app.post("/students", students.create);

  // Retrieve all students
  app.get("/students", students.findAll);

  // Retrieve a single student with student_id
  app.get("/students/:s_id", students.findStudent);

  // Retrieve a history of student's completed/inactive appointments
  app.get("/students/:s_id/history", students.findHistory);

  // Retrieve student's active appointments
  app.get("/student/:sess_key/appointments", students.findCurrentAppointments);

  // Update a Student with student_id
  app.put("/students/:s_id", students.update);

  // Delete a Student with student_id
  app.delete("/students/:s_id", students.delete);

  // Delete all Students
  app.delete("/students", students.deleteAll);
};
