import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [course_ID, setCourse_id] = useState("");
  const [course_name, setCourse_name] = useState("");
  const [credits, setCredits] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student_id, setStudent_id] = useState("");
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
      student_id: student_id,
      student_name: student_name,
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          student_id: student_id,
          student_name: student_name,
        },
      ]);
      // 清空输入框
      setStudent_id("");
      setStudent_name("");
    });
  };

  const getStudentList = () => {
    Axios.get("http://localhost:3001/students").then((response) => {
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
    setEditStudentId(student.student_id);
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
            value={student_id}
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
      <div className="students">
        <button onClick={() => setShowStudentList(!showStudentList)}>
          {showStudentList ? 'Hide Students' : 'Show Students'}
        </button>
        {showStudentList && studentList.map((student, index) => (
          <div className="student" key={index}>
            <div>
              <h3>Student ID: {student.student_id}</h3>
              <h3>Student Name: {student.student_name}</h3>
            </div>
            <div>
              {/* 添加 "Edit" 和 "Update" 按钮 */}
              <button onClick={() => editStudent(student)}>Edit</button>
              <button onClick={() => deleteStudent(student.student_id)}>Delete</button>
              {editStudentId === student.student_id && (
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
    </div>
  );
}

export default App;
