require("dotenv").config();
const express = require("express");
const Connection = require("./src/database/connection.js");
const userRouter = require("./src/modules/user/user.controller.js");
const blogsRouter = require("./src/modules/blogs/blogs.controller.js")
const app = express();
const port = 3000;

app.use(express.json());
app.use("/auth",userRouter)
app.use("/blogs",blogsRouter)


app.listen(port, () =>
  console.log("Example app listening at http://localhost:3000")
);
