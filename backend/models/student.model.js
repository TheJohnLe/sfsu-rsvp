const sql = require("../config/db");

// constructor
const Student = function (student) {
  this.sfsu_id = student.sfsu_id;
  this.first_name = student.first_name;
  this.last_name = student.last_name;
  this.email = student.email;
  this.password = student.password;
  this.zoom = student.zoom;
  this.type = student.type;
};

Student.create = (newStudent, result) => {
  sql.query("INSERT INTO users SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created student: ", {
      sfsu_id: res.insertId,
      ...newStudent,
    });
    result(null, { sfsu_id: res.insertId, ...newStudent });
  });
};

Student.findById = (sfsu_id, result) => {
  sql.query(
    `SELECT sfsu_id, first_name, last_name, email FROM users WHERE sfsu_id = ${sfsu_id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found student: ", res[0]);
        result(null, res[0]);
        return;
      }

      // no student found with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Student.retrieveHistory = (sfsu_id, result) => {
  sql.query(
    `SELECT * FROM appointments WHERE sfsu_id = ${sfsu_id} AND completed = 1`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length === 0) {
        console.log(`student with id ${sfsu_id} has an empty history.`);
        result(null, null);
        return;
      } else if (res.length > 0) {
        console.log(`student sfsu_id ${sfsu_id}'s history`, res);
        result(null, res);
        return;
      }

      // no student found with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Student.findActiveAppointments = (sess_key, result) => {
  sql.query(
    `SELECT * FROM appointments WHERE sess_key = ${sess_key} AND completed = 0`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length === 0) {
        console.log(`student with session ${sess_key} has an empty history.`);
        result(null, null);
        return;
      } else if (res.length > 0) {
        console.log(`student session ${sess_key}'s history`, res);
        result(null, res);
        return;
      }

      // no student found with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Student.getAll = (result) => {
  sql.query("SELECT * FROM users WHERE type= 'S'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("student: ", res);
    result(null, res);
  });
};

Student.updateById = (sfsu_id, student, result) => {
  sql.query(
    "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, sfsu_id = ?, WHERE sfsu_id = ?",
    [student.first_name, student.last_name, student.email, student.password],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no student found with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated student: ", {
        sfsu_id: sfsu_id,
        ...student,
      });
      result(null, { sfsu_id: sfsu_id, ...student });
    }
  );
};

Student.remove = (sfsu_id, result) => {
  sql.query("DELETE FROM users WHERE sfsu_id = ?", sfsu_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // no student found with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted student with id: ", sfsu_id);
    result(null, res);
  });
};

Student.removeAll = (result) => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} student`);
    result(null, res);
  });
};

module.exports = Student;
