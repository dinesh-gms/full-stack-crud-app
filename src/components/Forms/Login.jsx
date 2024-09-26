import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DataContext from "../../store/data-context";
import AuthContext from "../../store/auth-context";

const Login = () => {
  const [error, setError] = useState({ state: false, message: null });
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);

  const formSubmithandler = async (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let res = await authCtx.onLogin({ email, password });
    if(res) {
      setError({ state: true, message: res.data.message })
    }
    else {
      setError({state: false, message: null })
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-slate-800 text-gray-300 w-11/12 max-w-[500px] rounded-lg p-2">
        <h2 className="text-center text-3xl font-bold mt-4">Login</h2>
        <form className="my-6 mx-4" onSubmit={formSubmithandler}>
          <label htmlFor="email" className="text-lg font-semibold">
            Email{" "}
          </label>
          <input
            required
            id="email"
            className="w-full px-4 py-2 mt-1 bg-slate-900 outline-none rounded-md"
            type="email"
            placeholder="address@example.com"
          />
          <label htmlFor="password" className="text-lg font-semibold">
            Password{" "}
          </label>
          <input
            required
            id="password"
            className="w-full px-4 py-2 mt-1 bg-slate-900 outline-none rounded-md"
            type="password"
          />
          <button
            className="w-full px-4 py-2 mt-4 bg-blue-800 outline-none rounded-md hover:bg-blue-900 hover:text-gray-400"
            type="submit">
            Login
          </button>
        </form>
        {/* <p className='mx-4'>Don't have an account? <Link to='/register' className='text-sm text-blue-500 underline hover:text-blue-600'>Sign in</Link></p> */}
        {error.state && (
          <div className="mx-4 mt-1 text-red-600">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
