import React, { useContext, useEffect, useMemo, useState } from "react";
import DataContext from "../../store/data-context";
import Table, { TableBody, TableHeading } from "../Layout/Table";
import Modal from "../Layout/Modal";
import Creation from "../Forms/Creation";

const HomePage = ({ heading, edit, filter }) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [modalState, setModalState] = useState({
    shown: false,
    data: null,
  });
  const dataCtx = useContext(DataContext);
  const [filteredStudents, setFilteredStudent] = useState([]);
  const studentsData = dataCtx.students;

  useMemo(() => {
    setFilteredStudent(studentsData);
  }, [studentsData]);

  useEffect(() => {
    const filter = studentsData.filter(
      (student) =>
        student.student_name.includes(searchFilter) ||
        student.roll_no.includes(searchFilter) ||
        student.email.includes(searchFilter)
    );
    setFilteredStudent(filter);
  }, [searchFilter]);

  const searchHandler = (e) => {
    setSearchFilter(e.target.value);
  };

  const updateHandler = (id) => {
    let data = dataCtx.students.filter((student) => student.roll_no === id);
    setModalState({
      shown: true,
      data: {
        student_name: data[0].student_name,
        roll_no: data[0].roll_no,
        email: data[0].email,
        dob: data[0].dob,
      },
    });
  };

  const deleteHandler = (id) => {
    if (confirm("Are you confirm to delete the student?")) {
      dataCtx.removeStudent(id);
    }
  };

  const closeModalHandler = () => {
    setModalState({ shown: false, data: null });
  };

  return (
    <div className="flex flex-row flex-wrap">
      <div className={`w-[95%] @2xl:w-[90%] mt-8 mx-auto`}>
        {!filter && (
          <h2 className="text-gray-300 text-3xl font-semibold">{heading}</h2>
        )}
        {filter && (
          <div className="flex justify-between">
            <h2 className="text-gray-300 text-3xl font-semibold">{heading}</h2>
            <input
              className="px-4 py-2 mt-1 bg-slate-800 text-slate-400 outline-none rounded-md"
              type="search"
              placeholder="search here..."
              onChange={searchHandler}
              value={searchFilter}
            />
          </div>
        )}
        <Table>
          <TableHeading
            heading={
              edit
                ? ["Sno", "Roll no", "Student name", "Date of Birth", "Email"]
                : ["Sno", "Profile", "Roll no", "Student name", "Date of Birth", "Email",]
            }
            edit={edit}
          />
          <TableBody
            data={filteredStudents}
            edit={edit}
            onUpdate={updateHandler}
            onDelete={deleteHandler}
          />
        </Table>
      </div>
      {modalState.shown && (
        <Modal onClose={closeModalHandler}>
          <Creation
            heading="Edit Student"
            data={modalState.data}
            onclose={closeModalHandler}
          />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
