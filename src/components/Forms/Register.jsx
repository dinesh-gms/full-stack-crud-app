import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../store/data-context';

const Register = () => {
  const navigate = useNavigate();
  const dataCtx = useContext(DataContext);
  
  const formSubmitHandler = (e) => { 
    e.preventDefault();
    let registerData = {
      name: document.getElementById('uname').value,
      mail: document.getElementById('email').value,
      mobile: document.getElementById('mobile').value,
      dob: document.getElementById('dob').value,
      role: document.getElementById('role').value,
      region: document.getElementById('region').value,
    }
    dataCtx.addData(registerData);
    navigate('/')
   }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className='bg-slate-800 text-gray-300 w-11/12 max-w-[500px] rounded-lg p-2'>
        <h2 className='text-center text-3xl font-bold mt-4'>Sign in</h2>
        <form onSubmit={formSubmitHandler} className='my-2 mx-4'>
          <label htmlFor="uname" className='text-lg font-semibold'>Name </label>
          <input required className='w-full px-4 py-2 mb-1 bg-slate-900 outline-none rounded-md' id='uname' type="text" placeholder='eg: John' />
          <label htmlFor="email" className='text-lg font-semibold'>Email </label>
          <input required className='w-full px-4 py-2 mb-1 bg-slate-900 outline-none rounded-md' id='email' type="email" placeholder='john@example.com' />
          <label htmlFor="phone" className='text-lg font-semibold'>Mobile no </label>
          <input required className='w-full px-4 py-2 mb-1 bg-slate-900 outline-none rounded-md' id='mobile' type="tel" pattern='[6-9]{1}[0-9]{9}' maxLength={10} />
          <label htmlFor="dob" className='text-lg font-semibold'>Date of Birth </label>
          <input required className='w-full px-4 py-2 mb-1 bg-slate-900 outline-none rounded-md' id='dob' type="date" />
          <label htmlFor="role" className='text-lg font-semibold'>Role </label>
          <select required className='w-full px-4 py-2 mb-1 bg-slate-900 outline-none rounded-md' id='role'>
            <option defaultChecked hidden></option>
            <option value='Manager'>Manager</option>
            <option value='Developer'>Developer</option>
            <option value='Sales Representative'>Sales Representative</option>
            <option value='Team Lead'>Team Lead</option>
          </select>
          <label htmlFor="region" className='text-lg font-semibold'>Region </label>
          <select required className='w-full px-4 py-2 mb-1 bg-slate-900 outline-none rounded-md' id='region'>
            <option defaultChecked hidden></option>
            <option value='Japan'>Japan</option>
            <option value='Srilanka'>Srilanka</option>
          </select>
          <button className='w-full  px-4 py-2 mt-4 bg-blue-800 outline-none rounded-md hover:bg-blue-900 hover:text-gray-400' type='submit'>Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Register