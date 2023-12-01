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
  }, []);
  const [student_ID_1, setStudent_ID_1] = useState("");
  const [student_ID_2, setStudent_ID_2] = useState("");
  const [editFriendId1, setEditFriendId1] = useState("");
  const [editFriendId2, setEditFriendId2] = useState("");
  const [editFriendName, setEditFriendName] = useState("");
  const [editFriendship, setEditFriendship] = useState({ student_ID_1: '', student_ID_2: '' });
  const [friendList, setFriendList] = useState([]);
  const [showFriendList, setShowFriendList] = useState(false);

  const getFriendList = () => {
    // 發送獲取朋友列表的請求
    Axios.get("http://localhost:3001/friendship").then((response) => {
      setFriendList(response.data);
    });
  };


  const editFriend = (friend) => {
    setEditFriendId1(friend.student_ID_1);
    setEditFriendId2(friend.student_ID_2);
  };

  const updateFriend = () => {
    // 在這裡發送更新朋友的請求
    Axios.put("http://localhost:3001/updateFriend", {
      editFriendId1: editFriendId1,
      editFriendId2: editFriendId2,
    }).then(() => {
      getFriendList();
      setEditFriendId1("");
      setEditFriendId2("");
    });
  };

  const deleteFriend = (friendId) => {
    // 在這裡發送刪除朋友的請求
    Axios.delete(`http://localhost:3001/deleteFriend/${friendId}`).then(() => {
      getFriendList(); // 刪除後刷新朋友列表
    });
  };

  const addFriendship = () => {
  // 新增朋友關係
  Axios.post("http://localhost:3001/createFriend", {
    student_ID_1: parseInt(student_ID_1, 10),
    student_ID_2: parseInt(student_ID_2, 10),
  }).then(() => {
    getFriendList();
    setStudent_ID_1("");
    setStudent_ID_2("");
  });
};

  const updateFriendship = () => {
    // 在這裡發送更新朋友關係的請求
    const { student_ID_1, student_ID_2 } = editFriendship;

    if (student_ID_1 && student_ID_2) {
      Axios.put("http://localhost:3001/updateFriendship", {
        student_ID_1: parseInt(student_ID_1, 10),
        student_ID_2: parseInt(student_ID_2, 10),
      }).then(() => {
        getFriendList();
        setEditFriendship({ student_ID_1: '', student_ID_2: '' });
      });
    }
  };

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
    });
  };

  const getCourseList = () => {
    Axios.get("http://localhost:3001/courses").then((response) => {
      setCourseList(response.data);
    });
  };

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
    });
  };

  const getStudentList = () => {
    Axios.get("http://localhost:3001/student").then((response) => {
      setStudentList(response.data);
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
  return (
    <div className="App">
      <div className="information">
        <div className="course-input">
          <label>Course ID:</label>
          <input
            type="text"
            value={course_ID}
            onChange={(event) => {
              setCourse_id(event.target.value);
            }}
          />
          <label>Course Name:</label>
          <input
            type="text"
            value={course_name}
            onChange={(event) => {
              setCourse_name(event.target.value);
            }}
          />
          <label>Credits:</label>
          <input
            type="text"
            value={credits}
            onChange={(event) => {
              setCredits(event.target.value);
            }}
          />

          <label>Teacher:</label>
          <input
            type="text"
            value={teacher}
            onChange={(event) => {
              setTeacher(event.target.value);
            }}
          />
          <button onClick={addCourse}>Add Course</button>
        </div>
        <div className="student-input">
          <label>Student ID:</label>
          <input
            type="text"
            value={student_ID}
            onChange={(event) => {
              setStudent_id(event.target.value);
            }}
          />
          <label>Student Name:</label>
          <input
            type="text"
            value={student_name}
            onChange={(event) => {
              setStudent_name(event.target.value);
            }}
          />
          <button onClick={addStudent}>Add Student</button>
        </div>
      </div>
      <div className="search">
        <label>Search student:</label>
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
              <p>course_id: {result.course_id}</p>
              <p>course_name: {result.course_name}</p>
            </div>
          );
        })}
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
      {/* 朋友 */}
      <div className="friend">
        <button onClick={() => setShowFriendList(!showFriendList)}>
          {showFriendList ? 'Hide Friend' : 'Show Friend'}
        </button>
        {showFriendList && friendList.map((friend, index) => (
          <div className="friend" key={index}>
            <div>
              <h3>Friend ID1: {friend.student_ID_1}</h3>
              <h3>Friend ID2: {friend.student_ID_2}</h3>
            </div>
            <div>
              <button onClick={() => editFriend(friend)}>Edit</button>
              <button onClick={() => deleteFriend(friend.student_ID_1 && friend.student_ID_2)}>Delete</button>
              {editFriendId1 === friend.student_ID_1 && editFriendId2 === friend.student_ID_2 &&(
                <div>
                  <input
                    type="text"
                    value={editFriendName}
                    onChange={(event) => {
                      setEditFriendName(event.target.value);
                    }}
                  />
                  <button onClick={updateFriend}>Update</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Add Friendship */}
      <div>
        <h3>Add Friendship:</h3>
        <input
          type="text"
          placeholder="Student 1 ID"
          value={editFriendId1.student_ID_1}
          onChange={(e) => setEditFriendship({ ...editFriendship, student_ID_1: e.target.value })}
        />
        <input
          type="text"
          placeholder="Student 2 ID"
          value={editFriendId2.student_ID_2}
          onChange={(e) => setEditFriendship({ ...editFriendship, student_ID_2: e.target.value })}
        />
        <button onClick={addFriendship}>Add Friendship</button>
        <button onClick={updateFriendship}>Update Friendship</button>
      </div>
    </div>

  );
}

export default App;
