import "./App.css";
import { useState } from "react";

function App() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);

  const createStudentHandler = () => {
    if (studentName) {
      const newStudent = {
        id: Date.now(),
        name: studentName,
        // isPresent: null,
      };
      setStudents([...students, newStudent]);
      setStudentName("");
    } else {
      alert("Please Enter a Valid Name");
    }
  };

  const editStudentHandler = (id) => {
    const toBeEditedStudent = students.find((item) => item.id === id);

    setEditMode(true);
    setStudentName(toBeEditedStudent.name);
    setEditableStudent(toBeEditedStudent);
  };

  const deleteStudentHandler = (id) => {
    console.log(id)
    setStudents(students.filter((item) => item.id !== id));
  };

  const updateStudentHandler = () => {
    // console.log(id)
    setStudents(
      students.map((student) => {
        if (student.id === editableStudent.id) {
          student.name = studentName;
        }
        return student;
      })
    );

    setEditMode(false);
    setStudentName("");
    setEditableStudent(null);
  };

  const presentHandler = (id) => {
    
    
    
    const student = students.find(item => item.id===id);
   
    if(student.isPresent===true){
      alert("This student is already present in present list");
    }
    else if(student.isPresent===false) {
      alert("This student is already present in absent list");
    } 
    else if(student.isPresent=== undefined){
      setStudents(students.map((item) =>{
        if(item.id===student.id){
          item.isPresent= true;
        }
        return item;
      }))
    }
  };
  const absentHandler = (id) => {
    const student = students.find(item => item.id===id);
    console.log(student)
   
    if(student.isPresent===true){
      alert("This student is already present in present list");
    }
    else if(student.isPresent===false) {
      alert("This student is already present in absent list");
    } 
    else if(student.isPresent=== undefined){
      setStudents(students.map((item) =>{
        if(item.id===student.id){
          item.isPresent= false;
        }
        return item;
      }))
    }
  };
  const toggleHandler = (id) => {
    const student = students.find(item => item.id===id);
    setStudents(students.map((item) => {
      if(item.id === student.id){
        item.isPresent = !item.isPresent;
      }
      return item;
    }))
  };
  return (
    <div className="App">
      <form
      style={{display:"flex",justifyContent:"center",alignItem:"center"}}
        onSubmit={(e) => {
          e.preventDefault();
          editMode ? updateStudentHandler() : createStudentHandler();
        }}
      >
        <input
          type="text"
          value={studentName}
          onChange={(event) => setStudentName(event.target.value)}
          placeholder="Enter your valid name"
        />
        <button>{editMode ? "Update Student" : "Add Student"}</button>
      </form>

      <div className="student-section" style={{display:"flex",justifyContent:"space-around",padding:"20px 0"}}>
        <div className="all-student" style={{border:"1px solid black"}}>
          <ul>
            {students.map((student) => (
              <li>
                <span>{student.name} </span>
                <button onClick={() => editStudentHandler(student.id)}>Edit</button>
                <button onClick={() => deleteStudentHandler(student.id)}>Delete</button>
                <button onClick={() => presentHandler(student.id)}> Present</button>
                <button onClick={() => absentHandler(student.id)}>Absent</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="present-student"style={{border:"1px solid black"}}>
          <ul>
            {students
              .filter((item) => item.isPresent === true)
              .map((student) => (
                <li>
                  <span>{student.name}</span>
                  <button onClick={() => toggleHandler(student.id)}>Accidentally Added</button>
                </li>
              ))}
          </ul>
        </div>
        <div className="absent-student"style={{border:"1px solid black"}}>
          <ul>
            {students
              .filter((item) => item.isPresent === false)
              .map((student) => (
                <li>
                  <span>{student.name}</span>
                  <button onClick={() => toggleHandler(student.id)}>Accidentally Added</button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
