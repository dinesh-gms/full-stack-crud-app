import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../store/data-context";
import _ from "lodash";

const Creation = ({ heading, data, onclose }) => {
  const dataCtx = useContext(DataContext);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const formData = Object.fromEntries(form);
    let studentData = {
      student_name: formData.name,
      roll_no: formData.rollno,
      email: formData.email,
      dob: formData.dob,
      profile: formData.profile,
    };
    if (!data) {
      studentData.password = formData.password;
      console.log(studentData);
      dataCtx.addStudent(studentData);
      navigate("/");
    } else {
      if (!_.isEqual(data, studentData)) {
        dataCtx.updateStudent(data.roll_no, studentData);
        onclose();
      }
    }
  };
  return (
    <div className={`w-[95%] @2xl:w-[90%] mt-8 mx-auto`}>
      <h2 className="text-gray-300 text-3xl mb-8 font-semibold">{heading}</h2>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <label
          htmlFor="rollno"
          className="text-lg text-slate-400 font-semibold">
          Roll no
        </label>
        <input
          required
          id="rollno"
          name="rollno"
          className="w-full px-4 py-2 mt-1 mb-4 bg-slate-800 text-slate-400 outline-none rounded-md"
          type="text"
          defaultValue={data ? data.roll_no : ""}
          placeholder="Enter Roll no"
        />
        <label htmlFor="name" className="text-lg text-slate-400 font-semibold">
          Student name
        </label>
        <input
          required
          id="name"
          name="name"
          className="w-full px-4 py-2 mt-1 mb-4 bg-slate-800 text-slate-400 outline-none rounded-md"
          type="text"
          defaultValue={data ? data.student_name : ""}
          placeholder="Enter Student name"
        />
        <label htmlFor="dob" className="text-lg text-slate-400 font-semibold">
          Date of Birth
        </label>
        <input
          required
          id="dob"
          name="dob"
          className="w-full px-4 py-2 mt-1 mb-4 bg-slate-800 text-slate-400 outline-none rounded-md"
          type="date"
          defaultValue={data ? data.dob : ""}
        />
        <label htmlFor="email" className="text-lg text-slate-400 font-semibold">
          Email
        </label>
        <input
          required
          id="email"
          name="email"
          className="w-full px-4 py-2 mt-1 mb-4 bg-slate-800 text-slate-400 outline-none rounded-md"
          type="email"
          defaultValue={data ? data.email : ""}
          placeholder="address@example.com"
        />
        {!data && (
          <>
            <label
              htmlFor="password"
              className="text-lg text-slate-400 font-semibold">
              Password
            </label>
            <input
              required
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-1 mb-4 bg-slate-800 text-slate-400 outline-none rounded-md"
              type="password"
            />
          </>
        )}
        {!data && (
          <>
            <label
              htmlFor="profile"
              className="text-lg text-slate-400 font-semibold">
              Profile
            </label>
            <input
              required
              id="profile"
              name="profile"
              className="w-full px-4 py-2 mt-1 mb-4 bg-slate-800 text-slate-400 outline-none rounded-md"
              type="file"
            />{" "}
          </>
        )}

        <button
          className="w-full px-4 py-2 mt-4 bg-blue-800 outline-none rounded-md text-gray-300 hover:bg-blue-900 hover:text-gray-400"
          type="submit">
          {data ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Creation;
