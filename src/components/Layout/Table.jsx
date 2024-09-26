import React from "react";

export default function Table({ children }) {
  return (
    <table className="w-full mt-8 text-gray-300 border rounded-md border-slate-600">
      {children}
    </table>
  );
}

export function TableHeading({ heading, edit }) {
  return (
    <thead>
      <tr>
        {heading.map((el, ind) => (
          <th className="py-2 text-lg bg-slate-900 font-semibold" key={ind}>
            {el}
          </th>
        ))}
        {edit && (
          <th className="py-2 text-lg bg-slate-900 font-semibold">Actions</th>
        )}
      </tr>
    </thead>
  );
}

export function TableBody({ data, edit, onUpdate, onDelete }) {
  return (
    <tbody>
      {data.map((el, ind) => {
        let arr = new Array();
        if (edit) {
          arr.push(ind + 1, el.roll_no, el.student_name, el.dob, el.email);
        } else {
          arr.push(
            ind + 1,
            el.profile,
            el.roll_no,
            el.student_name,
            el.dob,
            el.email
          );
        }
        return (
          <tr key={ind}>
            {arr.map((e, i) => (
              <td
                key={i}
                className="py-4 border-t border-slate-600 text-md text-center text-slate-400">
                {!edit && i === 1 ? (
                  <div className="w-14 h-14 inline-block rounded-full overflow-hidden">
                    <img className="w-full h-full" src={e} alt="profile" />
                  </div>
                ) : (
                  e
                )}
              </td>
            ))}
            {edit ? (
              <td className="py-2 border-t border-slate-600 text-md text-center flex justify-evenly text-slate-400">
                <button
                  onClick={() => onUpdate(el.roll_no)}
                  className="px-4 py-2 my-1 bg-yellow-600 outline-none rounded-md text-gray-300 hover:bg-yellow-700 hover:text-gray-400">
                  Edit
                </button>
                <button
                  onClick={() => onDelete(el.roll_no)}
                  className="px-4 py-2 my-1 bg-red-700 outline-none rounded-md text-gray-300 hover:bg-red-800 hover:text-gray-400">
                  Delete
                </button>
              </td>
            ) : (
              ""
            )}
          </tr>
        );
      })}
    </tbody>
  );
}
