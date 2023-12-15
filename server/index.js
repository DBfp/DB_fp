const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "@Mason45ok",
  database: "final-project", // 这里使用你的数据库名称
});

// 建立課程
app.post("/createCourse", (req, res) => {
  const course_ID = req.body.course_ID;
  const course_name = req.body.course_name;
  const credits = req.body.credits;
  const teacher = req.body.teacher;
  db.query(
    "INSERT INTO courses (course_id, course_name, credits, teacher) VALUES (?, ?, ?, ?)",
    [course_ID, course_name, credits, teacher],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Course Inserted");
      }
    }
  );
});

// 獲得課程列表
app.get("/courses", (req, res) => {
  db.query("SELECT * FROM courses", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// 建立學生
app.post("/createStudent", (req, res) => {
  const student_id = req.body.student_id;
  const student_name = req.body.student_name;

  db.query(
    "INSERT INTO student (student_id, student_name) VALUES (?, ?)",
    [student_id, student_name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Student Inserted");
      }
    }
  );
});


// 獲得學生列表
app.get("/student", (req, res) => {
  db.query("SELECT * FROM student", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
// 更新课程
app.put("/updateCourse", (req, res) => {
  const course_id = req.body.course_id;
  const course_name = req.body.course_name;

  db.query(
    "UPDATE courses SET course_name = ? WHERE course_id = ?",
    [course_name, course_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Course Updated");
      }
    }
  );
});

// 更新學生
app.put("/updateStudent", (req, res) => {
  const student_id = req.body.student_id;
  const student_name = req.body.student_name;

  db.query(
    "UPDATE student SET student_name = ? WHERE student_id = ?",
    [student_name, student_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Student Updated");
      }
    }
  );
});
// 删除課程
app.delete("/deleteCourse/:id", (req, res) => {
  const courseId = req.params.id;

  db.query("DELETE FROM courses WHERE course_id = ?", courseId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Course Deleted");
    }
  });
});

// 删除學生
app.delete("/deleteStudent/:id", (req, res) => {
  const studentId = req.params.id;

  db.query("DELETE FROM student WHERE student_id = ?", studentId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Student Deleted");
    }
  });
});

// 創建朋友
app.post("/createFriend", (req, res) => {
  const student_ID_1 = req.body.student_ID_1;
  const student_ID_2 = req.body.student_ID_2;

  db.query(
    "INSERT INTO friendship (student_ID_1, student_ID_2) VALUES (?, ?)",
    [student_ID_1, student_ID_2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error creating friendship");
      } else {
        res.send("Friendship Inserted");
      }
    }
  );
});

// 獲得朋友列表
app.get("/friendship", (req, res) => {
  db.query("SELECT * FROM friendship", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching friendships");
    } else {
      res.send(result);
    }
  });
});

// 更新朋友關係
// app.put("/updateFriendship", (req, res) => {
//   const newStudent_ID_1 = req.body.newStudent_ID_1;
//   const newStudent_ID_2 = req.body.newStudent_ID_2;

//   db.query(
//     "UPDATE friendship SET student_ID_1 = ?, student_ID_2 = ?",
//     [newStudent_ID_1, newStudent_ID_2],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Error updating friendship");
//       } else {
//         res.send("Friendship Updated");
//       }
//     }
//   );
// });

// 刪除朋友關係
app.delete("/deleteFriendship/", (req, res) => {
  // Assuming student IDs are provided in the request body or query parameters
  const student_ID_1 = req.body.student_ID_1;
  const student_ID_2 = req.body.student_ID_2;
  //console.log('收到刪除朋友請求：', req.body);
  // Update the query to check both student IDs without considering friendshipId
  db.query(
    "DELETE FROM friendship WHERE (student_ID_1 = ? AND student_ID_2 = ?)",
    [student_ID_1, student_ID_2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting friendship");
      } else {
        if (result.affectedRows > 0) {
          res.send("Friendship Deleted");
        } else {
          res.status(404).send("Friendship not found");
        }
      }
    }
  );
});

//選課

//創建選課
app.post("/createstudent_course", (req, res) => {
  const student_ID = req.body.SC_S_id;
  const course_ID = req.body.SC_C_id;

  db.query(
    "INSERT INTO student_course (student_ID, course_ID) VALUES (?, ?)",
    [student_ID, course_ID],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error creating student_course");
      } else {
        res.send("student_course Inserted");
      }
    }
  );
});

// 獲得選課列表
app.get("/Student_course", (req, res) => {
  db.query("SELECT * FROM student_course", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching student_course");
    } else {
      res.send(result);
    }
  });
});

// 刪除選課
app.delete("/deleteStudent_course/", (req, res) => {
  const student_ID = req.body.SC_S_id;
  const course_ID = req.body.SC_C_id;
  db.query(
    "DELETE FROM student_course WHERE (student_ID = ? AND course_ID = ?)",
    [student_ID, course_ID],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting SC");
      } else {
        if (result.affectedRows > 0) {
          res.send("SC Deleted");
        } else {
          res.status(404).send("SC not found");
        }
      }
    }
  );
});

// 刪除朋友關係
app.delete("/deleteStudent_course/", (req, res) => {
  // Assuming student IDs are provided in the request body or query parameters
  const student_ID_1 = req.body.student_ID_1;
  const student_ID_2 = req.body.student_ID_2;
  //console.log('收到刪除朋友請求：', req.body);
  // Update the query to check both student IDs without considering friendshipId
  db.query(
    "DELETE FROM friendship WHERE (student_ID_1 = ? AND student_ID_2 = ?)",
    [student_ID_1, student_ID_2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting friendship");
      } else {
        if (result.affectedRows > 0) {
          res.send("Friendship Deleted");
        } else {
          res.status(404).send("Friendship not found");
        }
      }
    }
  );
});

app.get("/searchstudent", (req, res) => {
  const searchQuery = req.query.search || "";

  const sqlQuery = `
    SELECT
      student.student_ID,
      student_course.course_ID,
      courses.course_name
    FROM \`final-project\`.student AS student
    INNER JOIN student_course ON student.student_ID = student_course.student_ID
    INNER JOIN courses ON student_course.course_ID = courses.course_ID
    WHERE student.student_ID = ?
    OR student_course.course_ID = ?
    OR courses.course_name = ?
  `;

  db.query(
    sqlQuery,
    [searchQuery, searchQuery, searchQuery],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("檢索搜索結果時發生錯誤");
      } else {
        res.send(result);
      }
    }
  );
});


