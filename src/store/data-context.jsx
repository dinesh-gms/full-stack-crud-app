import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const DataContext = React.createContext({
  students: [],
  addStudent: (data) => {},
  updateStudent: (id, data) => {},
  removeStudent: (id) => {},
});

export default DataContext;

export const DataContextProvider = (props) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function handler() {
      const response = await axios.get("http://localhost:4000/api/students/");
      const result = await response.data;
      setStudents(result);
    }
    handler();
  }, []);

  const addStudentHandler = async (data) => {
    const response = await axios.post(
      "http://localhost:4000/api/students/",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setStudents((prevStudents) => [...prevStudents, response.data]);
  };

  const updateStudentHandler = async (id, data) => {
    const response = await axios.put(
      `http://localhost:4000/api/students/${id}`,
      data
    );
    if (response.statusText !== "OK") {
      throw response.message;
    }

    const tempStudents = [...students];
    const existingStudentIndex = tempStudents.findIndex(
      (student) => student.roll_no === id
    );
    const existingStudent = tempStudents[existingStudentIndex];
    existingStudent.student_name = data.student_name;
    existingStudent.roll_no = data.roll_no;
    existingStudent.email = data.email;
    existingStudent.dob = data.dob;
    tempStudents[existingStudentIndex] = existingStudent;
    const updatedStudents = tempStudents;
    setStudents(updatedStudents);
  };

  const removeStudentHandler = async (id) => {
    const response = await axios.delete(
      `http://localhost:4000/api/students/${id}`
    );
    if (response.statusText !== "OK") {
      throw response.message;
    }
    const updatedStudents = students.filter(
      (student) => student.roll_no !== id
    );
    setStudents(updatedStudents);
  };

  const studentContext = {
    students,
    addStudent: addStudentHandler,
    updateStudent: updateStudentHandler,
    removeStudent: removeStudentHandler,
  };

  return (
    <DataContext.Provider value={studentContext}>
      {props.children}
    </DataContext.Provider>
  );
};
