import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Signup() {
    const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
  });
  const [accept, setAccept] = useState(false);
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const submit = (e) => {
    e.preventDefault();
    setAccept(true);
    const emailValid = validateEmail(values.email);
    if (values.username === '' || values.password.length < 8 || !emailValid) {
      setErrors({
        ...errors,
        username: values.username === '' ? 'Username is required' : '',
        password: values.password.length < 8 ? 'Password should be 8 characters' : '',
        email: !emailValid ? 'Invalid email address' : '',
      });
    } else {
      console.log(values)
      axios.post('http://localhost:5000/auth/register', values)
        .then((res) => {
          if (res.status === 200) {
            console.log('Success');
          } else {
            alert('Erreur');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="bg-indigo-900 h-screen flex flex-col items-center justify-center overflow-hidden">
      <h1 className="mt-[80px] text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-pink-500">
        Welcome to The RH
        <span className="relative inline-block">
          <span className="ml-2 text-yellow-300 relative z-10">System</span>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="block w-12 h-12 bg-neutral-300 rounded-full animate-pulse"></span>
          </span>
        </span>
      </h1>
      <div className="bg-white h-auto mt-[40px] w-[400px] p-10 shadow-xl rounded-lg flex flex-col items-center">
        <p className="text-black text-center mb-4 opacity-70">Enregistrez-vous pour pouvoir naviguer !</p>
        <p className="text-center mb-8 opacity-70">We'll never send you spam</p>
        <form className="flex flex-col w-full" onSubmit={submit} action="rechercher" method="post">
          <input type="text" className="placeholder-black px-4 py-2 w-full outline-none border-2 border-gray-300 rounded-md mb-4 transition duration-300 focus:border-indigo-500" placeholder="Username" required value={values.username} onChange={(e) => setValues({ ...values, username: e.target.value })} />
          {errors.username && accept && <p className="text-red-500 text-xs absolute  mt-8">{errors.username}</p>}
          <input type="email" className="placeholder-black px-4 py-2 w-full outline-none border-2 border-gray-300 rounded-md mb-4 transition duration-300 focus:border-indigo-500" placeholder="Email" required value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
          {errors.email && accept && <p className="text-red-500 text-xs absolute mt-[100PX]">{errors.email}</p>}
          <input type="password" className="placeholder-black px-4 py-2 w-full outline-none border-2 border-gray-300 rounded-md mb-4 transition duration-300 focus:border-indigo-500" placeholder="Password" required value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
          {errors.password && accept && <p className="text-red-500 text-xs absolute mt-[160PX]">{errors.password}</p>}
          <input type="text" className="placeholder-black px-4 py-2 w-full outline-none border-2 border-gray-300 rounded-md mb-4 transition duration-300 focus:border-indigo-500" placeholder="Lastname" required value={values.lastname} onChange={(e) => setValues({ ...values, lastname: e.target.value })} />
          <input type="text" className="placeholder-black px-4 py-2 w-full outline-none border-2 border-gray-300 rounded-md mb-4 transition duration-300 focus:border-indigo-500" placeholder="Role" required value={values.role} onChange={(e) => setValues({ ...values, role: e.target.value })} />
          <button className="outline-none border-none bg-indigo-600 hover:bg-indigo-700 w-full h-12 text-white rounded-md cursor-pointer transition duration-300 font-bold mb-4" type="submit">Sign up</button>
        </form>
        <div className="flex items-center w-full mb-4">
          <div className="bg-gray-300 flex-grow h-[1px]"></div>
          <h3 className="px-2">OR</h3>
          <div className="bg-gray-300 flex-grow h-[1px]"></div>
        </div>
        <p><Link to="/" className="text-indigo-600 hover:text-indigo-800 transition duration-300">Log in</Link></p>
      </div>
    </div>
  );
}
