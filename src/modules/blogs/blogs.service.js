const Connection = require("../../database/connection.js");


const addBlog = (req, res) => {
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
}

const getAllBlogs =  (req, res) => {
  Connection.query(
    `SELECT * from blogs b INNER JOIN users u ON b.userId = u.id`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "internal server error" });
        return;
      } else {
        res.json({ message: "blogs fetched successfully", result });
      }
    }
  );
}

const getUserBlogs = (req, res) => {
  let { userId } = req.params;

  Connection.query(
    `SELECT title,content from blogs WHERE userId = '${userId}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "internal server error" });
        return;
      } else if (result.length > 0) {
        res.json({ message: "user blogs fetched successfully", result });
      } else {
        res.json({ message: "no blogs found for this user" });
      }
    }
  );
}

const updateBlog = (req, res) => {
  let { blogId } = req.params;
  let { title, content } = req.body;

  Connection.query(
    `UPDATE blogs SET title = '${title}', content = '${content}' WHERE id = '${blogId}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "internal server error" });
        return;
      } else if (result.length > 0) {
        res.json({ message: "blog updated successfully", result });
      } else {
        res.json({ message: "blog update failed" });
      }
    }
  );
}

const deleteBlog = (req, res) => {
  let { blogId } = req.params;
  Connection.query(
    `DELETE from blogs where id = '${blogId}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "internal server error" });
        return;
      } else if (result.affectedRows > 0) {
        res.json({ message: " blog deleted successfully" });
      } else {
        res.json({ message: "blog delete faild" });
      }
    }
  );
}

module.exports = {
    addBlog,
    getAllBlogs,
    getUserBlogs,
    updateBlog,
    deleteBlog
}