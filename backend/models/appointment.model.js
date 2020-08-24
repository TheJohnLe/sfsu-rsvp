const sql = require("../config/db");

// constructor
const Appointment = function (appointment) {
  this.appointment_id = appointment.appointment_id;
  this.type = appointment.type;
  this.start = appointment.start;
  this.end = appointment.end;
  this.s_id = appointment.s_id;
  this.f_id = appointment.f_id;
  this.s_notes = appointment.s_notes;
  this.f_notes = appointment.f_notes;
  this.absent = appointment.absent;
  this.late = appointment.late;
  this.completed = appointment.completed;
};

Appointment.create = (newAppointment, result) => {
  sql.query(
    `SELECT * FROM appointments WHERE s_id = ${newAppointment.s_id} AND type = \"${newAppointment.type}\" AND completed = 0`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      // If there exists an appointment of same type with the same student, return
      if (res.length) {
        result(err, "Appointment with the same advising type already exists.");
        return;
      } else {
        // Otherwise, add the appointment
        sql.query(
          "INSERT INTO appointments SET ?",
          newAppointment,
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }

            console.log("created appointment: ", {
              appointment_id: res.insertId,
              ...newAppointment,
            });
            result(null, { appointment_id: res.insertId, ...newAppointment });
          }
        );
      }
    }
  );
};

Appointment.findById = (appointment_id, result) => {
  sql.query(
    `SELECT * FROM appointments WHERE appointment_id = ${appointment_id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found appointment: ", res[0]);
        result(null, res[0]);
        return;
      }

      // no appointment found with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Appointment.getAll = (result) => {
  sql.query("SELECT * FROM appointments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("appointments: ", res);
    result(null, res);
  });
};

Appointment.updateById = (appointment_id, appointment, result) => {
  sql.query(
    "UPDATE appointments SET type = ?, start = ?, end = ?, s_id = ?, f_id = ?, s_notes = ?, f_notes = ?, absent = ?, late = ?, completed = ? WHERE appointment_id = ?",
    [
      appointment.type,
      appointment.start,
      appointment.end,
      appointment.s_id,
      appointment.f_id,
      appointment.s_notes,
      appointment.f_notes,
      appointment.absent,
      appointment.late,
      appointment.completed,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no appointment found with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated appointment: ", {
        appointment_id: appointment_id,
        ...appointment,
      });
      result(null, { appointment_id: appointment_id, ...appointment });
    }
  );
};

Appointment.remove = (appointment_id, result) => {
  sql.query(
    "DELETE FROM appointments WHERE appointment_id = ?",
    appointment_id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no appointment found with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted appointment with id: ", appointment_id);
      result(null, res);
    }
  );
};

Appointment.removeAll = (result) => {
  sql.query("DELETE FROM appointments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} appointments`);
    result(null, res);
  });
};

module.exports = Appointment;
