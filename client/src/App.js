import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [course_ID, setCourse_id] = useState("");
  const [course_name, setCourse_name] = useState("");
  const [credits, setCredits] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student_ID, setStudent_id] = useState("");
  const [student_name, setStudent_name] = useState("");

  const [courseList, setCourseList] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const [editCourseId, setEditCourseId] = useState("");
  const [editCourseName, setEditCourseName] = useState("");
  const [editCredits, setEditCredits] = useState("");
  const [editTeacher, setEditTeacher] = useState("");
  const [editStudentId, setEditStudentId] = useState("");
  const [editStudentName, setEditStudentName] = useState("");

  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  const [showCourseList, setShowCourseList] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);

  useEffect(() => {
    getCourseList();
    getStudentList();
    getFriendList();
    getstudent_course();
  }, []);

  //朋友
  const [student_ID_1, setStudent_ID_1] = useState("");
  const [student_ID_2, setStudent_ID_2] = useState("");
  // const [newStudent_ID_1, setnewStudent_ID_1] = useState("");
  // const [newStudent_ID_2, setnewStudent_ID_2] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [showFriendList, setShowFriendList] = useState(false);

  const getFriendList = () => {
    // 發送獲取朋友列表的請求
    Axios.get("http://localhost:3001/friendship").then((response) => {
      setFriendList(response.data);
    });
  };


  // const editFriend = (friend) => {
  //   setnewStudent_ID_1(friend.student_ID_1);
  //   setnewStudent_ID_2(friend.student_ID_2);
  // };

  // const updateFriend = () => {
  //   // 在這裡發送更新朋友的請求
  //   Axios.put("http://localhost:3001/updateFriend", {
  //     setnewStudent_ID_1: newStudent_ID_1,
  //     setnewStudent_ID_2: newStudent_ID_2,
  //   }).then(() => {
  //     getFriendList();
  //     setnewStudent_ID_1("");
  //     setnewStudent_ID_2("");
  //   });
  // };

  const deleteFriend = (studentId1, studentId2) => {
    // 除錯模塊(請注意下方HTML處也需要正確設定為「,」不是其他的)
    console.log("Request data:", {
      student_ID_1: studentId1,
      student_ID_2: studentId2,
    });
    //發送刪除要求
    Axios.delete(`http://localhost:3001/deleteFriendship/`, {
      data: {
        student_ID_1: studentId1,
        student_ID_2: studentId2,
      }
    })
      .then(() => {
        getFriendList(); // 刪除後刷新朋友列表
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addFriendship = () => {
    // 新增朋友關係
    Axios.post("http://localhost:3001/createFriend", {
      student_ID_1: student_ID_1,
      student_ID_2: student_ID_2,
    }).then(() => {
      getFriendList();
      setStudent_ID_1("");
      setStudent_ID_2("");
    });
  };

  //選課
  const [student_courseList, setstudent_courseList] = useState([]);
  const [showstudent_courseList, setShowstudent_courseList] = useState(false);
  const [SC_S_id, setSC_S_id] = useState("");
  const [SC_C_id, setSC_C_id] = useState("");

  const getstudent_course = () => {
    // 發送獲取選課列表的請求
    Axios.get("http://localhost:3001/Student_course").then((response) => {
      setstudent_courseList(response.data);
    });
  };

  const addstudent_course = () => {
    // 新增選課關係
    Axios.post("http://localhost:3001/createstudent_course", {
      SC_S_id: SC_S_id,
      SC_C_id: SC_C_id,
    }).then(() => {
      getstudent_course();
      setSC_S_id("");
      setSC_C_id("");
    });
  };

  const deletestudent_course = (SC_Sid, SC_Cid) => {
    // 除錯模塊(請注意下方HTML處也需要正確設定為「,」不是其他的)
    console.log("Request data:", {
      SC_S_id: SC_Sid,
      SC_C_id: SC_Cid,
    });
    //發送刪除要求
    Axios.delete(`http://localhost:3001/deleteStudent_course/`, {
      data: {
        SC_S_id: SC_Sid,
        SC_C_id: SC_Cid,
      }
    })
      .then(() => {
        getstudent_course(); // 刪除後刷新選課列表
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //課程
  const addCourse = () => {
    Axios.post("http://localhost:3001/createCourse", {
      course_ID: course_ID,
      course_name: course_name,
      credits: credits,
      teacher: teacher,
    }).then(() => {
      setCourseList([
        ...courseList,
        {
          course_ID: course_ID,
          course_name: course_name,
          credits: credits,
          teacher: teacher,

        },
      ]);
      // 清空输入框
      setCourse_id("");
      setCourse_name("");
      setCredits("");
      setTeacher("");
      getCourseList();
    });
  };

  const getCourseList = () => {
    Axios.get("http://localhost:3001/courses").then((response) => {
      setCourseList(response.data);
    });
  };

  const editCourse = (course) => {
    setEditCourseId(course.course_ID);
    setEditCourseName(course.course_name);
    setEditCredits(course.credits);
    setEditTeacher(course.teacher);
  };

  const updateCourse = () => {
    Axios.put("http://localhost:3001/updateCourse", {
      course_id: editCourseId,
      course_name: editCourseName,
      credits: editCredits,
      teacher: editTeacher,
    }).then(() => {
      getCourseList();
      setEditCourseId("");
      setEditCourseName("");
      setEditCredits("");
      setEditTeacher("");
    });
  };

  const deleteCourse = (courseId) => {
    Axios.delete(`http://localhost:3001/deleteCourse/${courseId}`).then(() => {
      getCourseList(); // 删除后刷新课程列表
    });
  };

  //學生
  const addStudent = () => {
    Axios.post("http://localhost:3001/createStudent", {
      student_id: student_ID,
      student_name: student_name,
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          student_ID: student_ID,
          student_name: student_name,
        },
      ]);
      // 清空输入框
      setStudent_id("");
      setStudent_name("");
      getStudentList();
    });
  };

  const getStudentList = () => {
    Axios.get("http://localhost:3001/student").then((response) => {
      setStudentList(response.data);
    });
  };
  const editStudent = (student) => {
    setEditStudentId(student.student_ID);
    setEditStudentName(student.student_name);
  };

  const updateStudent = () => {
    Axios.put("http://localhost:3001/updateStudent", {
      student_id: editStudentId,
      student_name: editStudentName,
    }).then(() => {
      getStudentList();
      setEditStudentId("");
      setEditStudentName("");
    });
  };

  const deleteStudent = (studentId) => {
    Axios.delete(`http://localhost:3001/deleteStudent/${studentId}`).then(() => {
      getStudentList(); // 删除后刷新学生列表
    });
  };
  const searchstudent = () => {
    Axios.get(`http://localhost:3001/searchstudent?search=${searchQuery}`).then(
      (response) => {
        setSearchResults(response.data);
      }
    );
  };

  //前端介面

  return (
    <div className="App">
      <div className="information">
        <div className="course-input">
          <h3>
            Add Course:
          </h3>
          <input
            type="text"
            placeholder="Course ID:"
            value={course_ID}
            onChange={(event) => {
              setCourse_id(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Course Name:"
            value={course_name}
            onChange={(event) => {
              setCourse_name(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Credits:"
            value={credits}
            onChange={(event) => {
              setCredits(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Teacher:"
            value={teacher}
            onChange={(event) => {
              setTeacher(event.target.value);
            }}
          />
          <button onClick={addCourse}>Add Course</button>
        </div>
        <div className="student-input">
          <h3>
            Add Student:
          </h3>
          <input
            type="text"
            placeholder="Student ID:"
            value={student_ID}
            onChange={(event) => {
              setStudent_id(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Student Name:"
            value={student_name}
            onChange={(event) => {
              setStudent_name(event.target.value);
            }}
          />
          <button onClick={addStudent}>Add Student</button>
        </div>
      </div>
      {/* Add Friendship */}
      <div>
        <h3>Add Friendship:</h3>
        <input
          type="text"
          placeholder="Student 1 ID"
          value={student_ID_1}
          onChange={(event) => setStudent_ID_1(event.target.value)}
        />
        <input
          type="text"
          placeholder="Student 2 ID"
          value={student_ID_2}
          onChange={(event) => setStudent_ID_2(event.target.value)}
        />
        <button onClick={addFriendship}>Add Friendship</button>
      </div>
      {/* Add student_course */}
      <div>
        <h3>Add Student_Course:</h3>
        <input
          type="text"
          placeholder="Student ID"
          value={SC_S_id}
          onChange={(event) => setSC_S_id(event.target.value)}
        />
        <input
          type="text"
          placeholder="course ID"
          value={SC_C_id}
          onChange={(event) => setSC_C_id(event.target.value)}
        />
        <button onClick={addstudent_course}>Add student_course</button>
      </div>

      <div className="search">
        <h3>Search student:</h3>
        <input
          type="text"
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <button onClick={searchstudent}>Search</button>
      </div>

      {/* Display search results */}

      <div className="search-results">
        {searchResults.map((result, index) => {
          return (
            <div className="search-result" key={index}>
               {/* <p>Username: {result.user_name}</p> */}
                <p>course_ID: {result.course_ID}</p>
                <p>course_name: {result.course_name}</p>
            </div>
          );
        })}
      </div>

      {/* 朋友 */}
      <div className="friend">
        <button onClick={() => setShowFriendList(!showFriendList)}>
          {showFriendList ? 'Hide Friend' : 'Show Friend'}
        </button>
        {showFriendList && friendList.map((friend, index) => (
          <div className="friend" key={index}>
            <div>
              <h3>Friend SID_1: {friend.student_ID_1}</h3>
              <h3>Friend SID_2: {friend.student_ID_2}</h3>
            </div>
            <div>
              {/* <button onClick={() => editFriend(friend)}>Edit</button> */}
              <button onClick={() => deleteFriend(friend.student_ID_1, friend.student_ID_2)}>Delete</button>
              {/* {newStudent_ID_1 === friend.student_ID_1 && newStudent_ID_2 === friend.student_ID_2 && (
                // <div>
                //   <input
                //     type="text"
                //     placeholder="Student 1 ID"
                //     value={newStudent_ID_1}
                //     onChange={(event) => {
                //       setnewStudent_ID_1(event.target.value)
                //     }}
                //   />
                //   <input
                //     type="text"
                //     placeholder="Student 2 ID"
                //     value={newStudent_ID_2}
                //     onChange={(event) => {
                //       setnewStudent_ID_2(event.target.value);
                //     }}
                //   />
                //   <button onClick={updateFriend}>Update</button>
                // </div>
              )} */}
            </div>
          </div>
        ))}
      </div>
      <div className="courses">
        <button onClick={() => setShowCourseList(!showCourseList)}>
          {showCourseList ? 'Hide Courses' : 'Show Courses'}
        </button>
        {showCourseList && courseList.map((course, index) => (
          <div className="course" key={index}>
            <div>
              <h3>Course ID: {course.course_ID}</h3>
              <h3>Course Name: {course.course_name}</h3>
              <h3>Credits: {course.credits}</h3>
              <h3>Teacher: {course.teacher}</h3>
            </div>
            <div>
              {/* 添加 "Edit" 和 "Update" 按钮 */}
              <button onClick={() => editCourse(course)}>Edit</button>
              <button onClick={() => deleteCourse(course.course_ID)}>Delete</button>
              {editCourseId === course.course_ID && (
                <div>
                  <input
                    type="text"
                    value={editCourseName}
                    onChange={(event) => {
                      setEditCourseName(event.target.value);
                    }}
                  />
                  <button onClick={updateCourse}>Update</button>
                </div>
              )}
            </div>
          </div>
        ))}

      </div>
      {/* 學生 */}
      <div className="student">
        <button onClick={() => setShowStudentList(!showStudentList)}>
          {showStudentList ? 'Hide Student' : 'Show Student'}
        </button>
        {showStudentList && studentList.map((student, index) => (
          <div className="student" key={index}>
            <div>
              <h3>Student ID: {student.student_ID}</h3>
              <h3>Student Name: {student.student_name}</h3>
            </div>
            <div>
              {/* 添加 "Edit" 和 "Update" 按钮 */}
              <button onClick={() => editStudent(student)}>Edit</button>
              <button onClick={() => deleteStudent(student.student_ID)}>Delete</button>
              {editStudentId === student.student_ID && (
                <div>
                  <input
                    type="text"
                    value={editStudentName}
                    onChange={(event) => {
                      setEditStudentName(event.target.value);
                    }}
                  />
                  <button onClick={updateStudent}>Update</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* 選課 */}
      <div className="student_course">
        <button onClick={() => setShowstudent_courseList(!showstudent_courseList)}>
          {showstudent_courseList ? 'Hide student_course' : 'Show student_course'}
        </button>
        {showstudent_courseList && student_courseList.map((student_courseList, index) => (
          <div className="student_course" key={index}>
            <div>
              <h3>student_ID: {student_courseList.student_ID}</h3>
              <h3>course_ID: {student_courseList.course_ID}</h3>
            </div>
            <div>
              {/* <button onClick={() => editFriend(friend)}>Edit</button> */}
              <button onClick={() => deletestudent_course(student_courseList.student_ID, student_courseList.course_ID)}>Delete</button>
              {/* 刪除格式為 table.column */}
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default App;