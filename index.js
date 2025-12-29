require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const port = 3000;

app.use(express.json());

const databaseConnection = async () => {
  await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}).then(() => {
      console.log("datbase connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

databaseConnection()

app.listen(port, () =>
  console.log("Example app listening at http://localhost:3000")
);
