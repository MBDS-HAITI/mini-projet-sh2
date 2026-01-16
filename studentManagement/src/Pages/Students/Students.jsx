import { StudentList, StudentCard } from "../../Components/StudentComponents";
import { getStudents, getStudent } from "../../DataAccess/Services/studentService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
   
      getStudents()
        .then(res => setStudents(res.data))
        .catch(console.error);
    });
    return <StudentList students={students} />;
  
}

function StudentDetails(){
  const { id } = useParams();
  const [studentDetails, setStudentDetails] = useState([]);

  useEffect(() => {
   
      getStudent(id)
        .then(res => {setStudentDetails(res.data); console.log(studentDetails);})
        .catch(console.error);
    
  }, []);
  return <StudentCard data={studentDetails} />;
}

export {Students, StudentDetails}