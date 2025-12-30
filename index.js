require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(express.json());

const Connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

Connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("database connected");
  }
});

app.post("/auth/signup", (req, res) => {
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
});

app.post("/auth/login", (req, res) => {
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
});

app.get("/auth/get-user-profile/:id", (req, res) => {
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
});

app.post("/blogs/add-blog", (req, res) => {
  let { title, content, userId } = req.body;

  Connection.query(
    `INSERT INTO blogs (title , content, userId) values('${title}' , '${content}','${userId}')`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "internal server error" });
        return;
      } else if (result.affectedRows > 0) {
        res.json({ message: "blog added successfully" });
      } else {
        res.json({ message: "failed to add blog" });
      }
    }
  );
});

app.get("/blogs/get-all-blogs", (req, res) => {
  Connection.query(`SELECT * from blogs b INNER JOIN users u ON b.userId = u.id`, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "internal server error" });
      return;
    } else {
      res.json({message:"blogs fetched successfully", result});
    }
  });
});

app.listen(port, () =>
  console.log("Example app listening at http://localhost:3000")
);
