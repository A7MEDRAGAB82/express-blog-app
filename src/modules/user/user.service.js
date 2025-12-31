const Connection = require("../../database/connection.js");

const signup = (req, res) => {
  let { name, email, password } = req.body;

  Connection.query(
    `INSERT INTO users (name,email,password) values ('${name}','${email}','${password}')`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.affectedRows > 0) {
        res.json({ message: "user registered successfully" });
      } else {
        res.status(500).json({ message: "user registiration failed" });
      }
    }
  );
};

const login = (req, res) => {
  let { email, password } = req.body;

  Connection.query(
    `SELECT * from users WHERE email = '${email}' and password = '${password}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "internal server error" });
        return;
      } else if (result.length > 0) {
        res.json({ message: " login successfully", result });
      } else {
        res.json({ message: "invalid credintials" });
      }
    }
  );
};

const getUserProfile = (req, res) => {
  let { id } = req.params;

  Connection.query(
    `SELECT name , email , id from users WHERE id = '${id}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "internal server error" });
        return;
      } else if (result.length > 0) {
        res.json({ message: "user profile fetched successfully", result });
      } else {
        res.json({ message: "user not found" });
      }
    }
  );
};

module.exports = {
  signup,
  login,
  getUserProfile,
};
