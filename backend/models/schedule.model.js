const sql = require("../config/db");

// constructor
const Schedule = function (schedule) {
  this.schedule_id = schedule.schedule_id;
  this.f_id = schedule.f_id;
  this.type = schedule.type;
  this.day = schedule.day;
  this.start = schedule.start;
  this.end = schedule.end;
};

Schedule.create = (newSchedule, result) => {
  sql.query("INSERT INTO schedules SET ?", newSchedule, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created schedule: ", {
      schedule_id: res.insertId,
      ...newSchedule,
    });
    result(null, { schedule_id: res.insertId, ...newSchedule });
  });
};

Schedule.findById = (schedule_id, result) => {
  sql.query(
    `SELECT * FROM schedules WHERE schedule_id = ${schedule_id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found schedule: ", res[0]);
        result(null, res[0]);
        return;
      }

      // no schedule found with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Schedule.getAll = (result) => {
  sql.query("SELECT * FROM schedules", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("schedule: ", res);
    result(null, res);
  });
};

Schedule.updateById = (schedule_id, schedule, result) => {
  sql.query(
    "UPDATE schedules SET f_id = ?, type = ?, day = ?, start = ?, end = ?, WHERE schedule_id = ?",
    [schedule.f_id, schedule.type, schedule.day, schedule.start, schedule.end],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no schedule found with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated schedule: ", {
        schedule_id: schedule_id,
        ...schedule,
      });
      result(null, { schedule_id: schedule_id, ...schedule });
    }
  );
};

Schedule.findByFaculty = (sess_key, result) => {
  sql.query(
    `SELECT sfsu_id FROM sessions WHERE sess_key = ${sess_key}`,
    (err, res) => {
      if(err) {
        console.log("error: ", err);
        result(err,null);
        return;
      }

      if(res.length) {
        var sfsu_id = res[0].sfsu_id;

        sql.query(
          `SELECT * FROM schedules WHERE sfsu_id = ${sfsu_id}`,
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

            // no schedule found with the id
            result({ kind: "not_found" }, null);
          }
        )
      }
    }
  )
}

Schedule.remove = (schedule_id, result) => {
  sql.query(
    "DELETE FROM schedules WHERE schedule_id = ?",
    schedule_id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no schedule found with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted schedule with id: ", schedule_id);
      result(null, res);
    }
  );
};

Schedule.removeAll = (result) => {
  sql.query("DELETE FROM schedules", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} schedule`);
    result(null, res);
  });
};

module.exports = Schedule;
