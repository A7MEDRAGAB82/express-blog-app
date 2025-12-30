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
      }
      else if (result.affectedRows > 0) {
        res.json({message: "user registered successfully"})
      }
      else {
        res.status(500).json({message: "user registiration failed"})
      }
    }
  );
});

app.post('/auth/login', (req,res)=>{
  let {email , password} = req.body;

  Connection.query(`SELECT * from users WHERE email = '${email}' and password = '${password}'`,(err,result)=>{
        if(err){
          console.log(err);
          res.json({message: "internal server error"})
          return
        }
        else if (result.length > 0) {
           res.json({message: " login successfully",result})
       
        }
        else {
          res.json({message: "invalid credintials"})
        }
  } )


})

app.listen(port, () =>
  console.log("Example app listening at http://localhost:3000")
);
