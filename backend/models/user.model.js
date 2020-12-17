const sql = require("../config/db");

// constructor
const User = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.type = user.type;
};

User.login = (attempt, result) => {
  // Find cooresponding user
  sql.query(
    `SELECT * FROM users WHERE email = \'${attempt.email}\' AND password = \'${attempt.password}\'`,

    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      // If found, create new (sess_key, email)
      if (res.length) {
        console.log("found user: ", res[0]);

        attempt.sfsu_id = null;

        if (res.length) {
          sfsu_id = res[0].sfsu_id;

          sql.query(
            `INSERT INTO sessions (sfsu_id) VALUES (${sfsu_id})`,
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
            }
          );

          //Retrieve session key
          sql.query(
            `SELECT * FROM sessions WHERE sfsu_id = ${sfsu_id}`,
            (err, res) => {
              if (err) {
                if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }
              }

              if (res.length) {
                console.log("sending this session key", res[0].sess_key);
                result(null, res[0].sess_key);
                return;
              }
            }
          );
        }
        return;
      }

      // no user found with the id
      result({ kind: "not_found" }, null);
    }
  );
};

User.findById = (sfsu_id, result) => {
  sql.query(`SELECT * FROM users WHERE sfsu_id = ${sfsu_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // no user found with the id
    result({ kind: "not_found" }, null);
  });
};

User.findType = (sess_key, result) => {
  sql.query(`SELECT sfsu_id FROM sessions WHERE sess_key = ${sess_key}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      var sfsu_id = res[0].sfsu_id;

      sql.query(
        `SELECT type FROM users WHERE sfsu_id = ${sfsu_id}`, (err, res) => {
          if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          if(res.length) {
            console.log("returning found user-type", res);
            result(null, res[0].type);
            return;
          }
          
          // no user found with the id
    result({ kind: "not_found" }, null);
          result({ kind: "not_found" }, null);
        }
      )
    }

  });
}

User.getAll = (result) => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateByEmail = (email, user, result) => {
  sql.query(
    "UPDATE users SET password = ? WHERE email = ?",
    [user.password],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no user found with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", {
        email: email,
        ...user,
      });
      result(null, { email: email, ...user });
    }
  );
};

User.remove = (email, result) => {
  sql.query("DELETE FROM users WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // no user found with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", email);
    result(null, res);
  });
};

User.removeAll = (result) => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user`);
    result(null, res);
  });
};

module.exports = User;
