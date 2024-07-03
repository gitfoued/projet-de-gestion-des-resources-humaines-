
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import axios from "axios"

export default function Login() {
    const[values,setvalues]=useState({
        email:"",
        password:"",
      });
      
    const [accept,setaccept]=useState(false);
    const submit=(e)=>{
        e.preventDefault();
        setaccept(true);
        axios.post('http://localhost:4000/Login',values).then((res)=>{
            console.log(res.data)
            console.log("Success")
            const token = res.data.token;
            localStorage.setItem('monToken', token);
            
          })
          .catch((err)=>{
       console.log(err);
          })
    }
    return (
        <div>
           <div className='bg-indigo-900 h-[100vh] flex flex-col items-center'>
              
                <div className='bg-white h-[90vh] mt-[40px] w-[650px] shadow-[1px_1px_1px_1px_aliceblue]'>
                    <h1 className='ml-[180px] mt-[40px] text-[rgba(12,12,189,0.845)]'> Welcome to The RH <span className='text-[rgb(200,200,27)]'>System</span></h1>
                    <p className='text-black ml-[180px] relative top-[15px] mb-[-6px] opacity-70'>Connectez-vous pour pouvoir naviguer !</p>
                       <p className='ml-[280px]'> we'll never send  you spam</p>
                    
                    <div className='flex flex-col items-center relative top-[80px] z-5'>
                    <form className= 'flex flex-col justify-center' onSubmit={submit} action="rechercher" method='post' >
                        
                    <input type='email' className="placeholder-black relative focus:border-[rgb(116,87,183)]   px-15 py-20 w-400 outline-none border-2 border-white rounded-10 shadow transition duration-300 mb-20"  placeholder='email' required value={values.email} onChange={(e)=>setvalues({...values,email:e.target.value})}></input>
                        <input className=' placeholder-black relative focus:border-[rgb(116,87,183)]   px-15 py-20 w-400 outline-none border-2 border-white rounded-10 shadow transition duration-300 mb-20' type='password'   placeholder='Password' required value={values.password} onChange={(e)=>setvalues({...values,password:e.target.value})}></input>
                        {values.password.length < 8 && accept && <p className='text-red-500 text-xs relative top-[-15px]'>password should be 8 caracter</p>}
                        <button className='outline-none border-none bg-[rgba(12,12,189,0.845)] w-280 h-50 text-white ml-80 rounded-2xl cursor-pointer transition duration-100 border-2 border-white font-bold' type='submit'>Log in</button>
                        
                    </form>
                    <div className='bg-gray-300 relative left-[-172px] top-[45px] w-[47%] h-1'></div>
                    <h3 className='relative top-[15px]'>OR</h3>
                    <div className='bg-gray-300 relative left-[170px] w-[47%] top-[-15px] h-1'></div>
                   <p><Link to='/Signup' className='text-black relative opacity-70 top-[100px]'>Sign up</Link></p>
                    </div>    
                </div>
            </div>








        </div>
    )
}
