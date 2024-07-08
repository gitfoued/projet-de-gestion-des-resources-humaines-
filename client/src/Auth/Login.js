import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [accept, setAccept] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const submit = (e) => {
        e.preventDefault();
        setAccept(true);
        const emailValid = validateEmail(values.email);
        if (values.password.length < 8 || !emailValid) {
            setErrors({
                ...errors,
                password: values.password.length < 8 ? 'Password should be 8 characters' : '',
                email: !emailValid ? 'Invalid email address' : '',
            });
        } else {
            axios.post('http://localhost:5000/auth/Login', values)
                .then((res) => {
                    console.log('Response data:', res);
                    const token = res.data.token;
                    if (token) {
                        localStorage.setItem('monToken', token);
                    } else {
                        console.error('Token not found in response');
                    }
                })
                .catch((err) => {
                    console.error('Error during login:', err.response ? err.response.data : err.message);
                });
        }
    };

    return (
        <div className='bg-indigo-900 h-[100vh] flex flex-col items-center'>
            <h1 className="mt-[80px] text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-pink-500">
                Welcome to the RH 
                <span className="relative inline-block">
                    <span className="ml-3 text-yellow-300 relative z-10">System</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                        <span className="block w-16 h-16 bg-neutral-300 rounded-full animate-pulse"></span>
                    </span>
                </span>
            </h1>
            <div className="bg-white h-auto mt-[40px] w-[400px] p-10 shadow-xl rounded-lg flex flex-col items-center">
                <p className="text-black text-center mb-4 opacity-70">Connectez-vous pour pouvoir naviguer !</p>
                <p className="text-center mb-8 opacity-70">We'll never send you spam</p>
                <form className="flex flex-col w-full" onSubmit={submit} action="rechercher" method="post">
                    <input type="email" className="placeholder-black px-4 py-2 w-full outline-none border-2 border-gray-300 rounded-md mb-4 transition duration-300 focus:border-indigo-500" placeholder="Email" required value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
                    {errors.email && accept && <p className="text-red-500 text-xs absolute mt-[40px]">{errors.email}</p>}
                    <input type="password" className="placeholder-black px-4 py-2 w-full outline-none border-2 border-gray-300 rounded-md mb-4 transition duration-300 focus:border-indigo-500" placeholder="Password" required value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
                    {errors.password && accept && <p className="text-red-500 text-xs absolute mt-[100px]">{errors.password}</p>}
                    <button className="outline-none border-none bg-indigo-600 hover:bg-indigo-700 w-full h-12 text-white rounded-md cursor-pointer transition duration-300 font-bold mb-4" type="submit">Log in</button>
                </form>
                <div className="flex items-center w-full mb-4">
                    <div className="bg-gray-300 flex-grow h-[1px]"></div>
                    <h3 className="px-2">OR</h3>
                    <div className="bg-gray-300 flex-grow h-[1px]"></div>
                </div>
                <p><Link to="/Signup" className="text-indigo-600 hover:text-indigo-800 transition duration-300">Sign up</Link></p>
            </div>
        </div>
    );
}
