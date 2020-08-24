const sql = require("../config/db");

// constructor
const Faculty = function (faculty) {
  this.sfsu_id = faculty.sfsu_id;
  this.first_name = faculty.first_name;
  this.last_name = faculty.last_name;
  this.email = faculty.email;
  this.password = faculty.password;
  this.zoom = faculty.zoom;
  this.type = faculty.type;
};

Faculty.create = (newFaculty, result) => {
  sql.query("INSERT INTO users SET ?", newFaculty, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created faculty: ", {
      sfsu_id: res.insertId,
      ...newFaculty,
    });
    result(null, { sfsu_id: res.insertId, ...newFaculty });
  });
};

Faculty.getAll = (result) => {
  sql.query("SELECT * FROM users WHERE type = 'F'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("faculty: ", res);
    result(null, res);
  });
};

Faculty.findFacultyBySession = (sess_key, result) => {
  sql.query(
    `SELECT sfsu_id FROM sessions WHERE sess_key = ${sess_key}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        var sfsu_id = res[0].sfsu_id;
        sql.query(
          `SELECT sfsu_id, first_name, last_name, email, zoom FROM users WHERE sfsu_id = ${sfsu_id}`,
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }

            if (res.length) {
              result(null, res);
              return;
            }

            // no appointment found with the id
            result({ kind: "not_found" }, null);
          }
        );
      }
    }
  );
};

Faculty.findZoomBySession = (sess_key, result) => {
  sql.query(
    `SELECT sfsu_id FROM sessions WHERE sess_key = ${sess_key}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        var sfsu_id = res[0].sfsu_id;
        sql.query(
          `SELECT zoom FROM users where sfsu_id = ${sfsu_id}`,
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }

            if (res.length) {
              result(null, res);
              return;
            }

            // no appointment found with the id
            result({ kind: "not_found" }, null);
          }
        );
      }
    }
  );
};

Faculty.findAppointmentsBySession = (sess_key, result) => {
  sql.query(
    `SELECT sfsu_id FROM sessions WHERE sess_key = ${sess_key}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        var sfsu_id = res[0].sfsu_id;

        sql.query(
          `SELECT * FROM appointments WHERE sfsu_id = ${sfsu_id}`,
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }

            if (res.length) {
              console.log("found appointments: ", res);
              result(null, res);
              return;
            }

            // no appointment found with the id
            result({ kind: "not_found" }, null);
          }
        );
      }
    }
  );
};

Faculty.findTodaysAppointmentsBySession = (sess_key, result) => {
  sql.query(
    `SELECT sfsu_id FROM sessions WHERE sess_key = ${sess_key}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        var sfsu_id = res[0].sfsu_id;

        let todaysDate = new Date().toLocaleDateString();

        let todayMidnight = new Date(todaysDate);
        todayMidnight = Math.floor(todayMidnight.getTime() / 1000.0);

        let tomorrowMidnight = new Date(todaysDate);
        tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1);
        tomorrowMidnight = Math.floor(tomorrowMidnight.getTime() / 1000.0);

        sql.query(
          `SELECT * FROM appointments WHERE sfsu_id = ${sfsu_id} AND completed = 0 AND start >= ${todayMidnight} AND end < ${tomorrowMidnight}`,
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }

            if (res.length) {
              result(null, res);
              console.log("res", res);
              return;
            }

            // no appointment found with the id
            result({ kind: "not_found" }, null);
          }
        );
      }
    }
  );
};

Faculty.findActiveAppointmentsBySession = (sess_key, result) => {
  sql.query(
    `SELECT sfsu_id FROM sessions WHERE sess_key = ${sess_key}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        var sfsu_id = res[0].sfsu_id;

        sql.query(
          `SELECT * FROM appointments WHERE sfsu_id = ${sfsu_id} AND completed = 0`,
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }

            if (res.length) {
              result(null, res);
              console.log("res", res);
              return;
            }

            // no appointment found with the id
            result({ kind: "not_found" }, null);
          }
        );
      }
    }
  );
};

Faculty.updateById = (sfsu_id, faculty, result) => {
  sql.query(
    "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, sfsu_id = ?, zoom = ? WHERE sfsu_id = ?",
    [
      faculty.first_name,
      faculty.last_name,
      faculty.email,
      faculty.password,
      faculty.zoom,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no faculty found with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated faculty: ", {
        sfsu_id: sfsu_id,
        ...faculty,
      });
      result(null, { sfsu_id: sfsu_id, ...faculty });
    }
  );
};

Faculty.remove = (sfsu_id, result) => {
  sql.query("DELETE FROM users WHERE sfsu_id = ?", sfsu_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // no faculty found with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted faculty with id: ", sfsu_id);
    result(null, res);
  });
};

Faculty.removeAll = (result) => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} faculty`);
    result(null, res);
  });
};

module.exports = Faculty;
