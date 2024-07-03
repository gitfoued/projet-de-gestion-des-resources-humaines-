import React ,{useState} from 'react'
import { Link } from 'react-router-dom'

import axios  from 'axios';


export default function Signup() {
  const[values,setvalues]=useState({
    username:"",
    lastname:"",
    email:"",
    password:"",
    role:"",
  });
  const[flag,setflag]=useState(true);
  
  const[accept,setaccept]=useState(false);
  const submit=(e)=>{
    e.preventDefault();
    setaccept(true);
    if(values.name === "" || values.password.length < 8){
        setflag(false);
    }else{
        axios.post('http://localhost:4000/Signup',values).then((res)=>{
            console.log(res.data)
           if(res.data==="Success"){
            console.log("Success")
           
           }else{
            alert("Erreur")
           }
          })
          .catch((err)=>{
       console.log(err);
          })
        }
    
  }

    return (
        <div>
            <div className='bg-blue-800 h-screen flex flex-col items-center'>
                
                <div className='bg-white h-screen mt-[40px] w-[650px] shadow'>
                <h1 className='ml-[180px] mt-[40px] text-[rgba(12,12,189,0.845)]'> Welcome to The RH <span className='text-[rgb(200,200,27)]'>System</span></h1>
                    <p className='text-black ml-[180px] relative top-[15px] mb-[-6px] opacity-70'>Enregistrez-vous pour pouvoir naviguer !</p>
                       <p className='ml-[280px]'> we'll never send  you spam</p>

                    <div className='flex flex-col items-center relative top-[80px] z-5'>
                    <form className= 'flex flex-col justify-center' onSubmit={submit} action="rechercher" method="get">
                        <input type='text' className="placeholder-black relative focus:border-[rgb(116,87,183)]   px-15 py-20 w-400 outline-none border-2 border-white rounded-10 shadow transition duration-300 mb-20"   placeholder='Username' required value={values.username} onChange={(e)=>setvalues({...values,username:e.target.value})}></input>
                        {values.name=== "" && accept && <p className='error'>username is required</p>}
                        <input type='Email' className="placeholder-black relative focus:border-[rgb(116,87,183)]   px-15 py-20 w-400 outline-none border-2 border-white rounded-10 shadow transition duration-300 mb-20"   placeholder='Email' required value={values.email} onChange={(e)=>setvalues({...values,email:e.target.value})}></input>
                        <input type='password' className="placeholder-black relative focus:border-[rgb(116,87,183)]   px-15 py-20 w-400 outline-none border-2 border-white rounded-10 shadow transition duration-300 mb-20"   placeholder='Password' required value={values.password} onChange={(e)=>setvalues({...values,password:e.target.value})}></input>
                        {values.password.length < 8 && accept && <p className='error'>password should be 8 caracter</p>}
                        <input type='password' className="placeholder-black relative focus:border-[rgb(116,87,183)]   px-15 py-20 w-400 outline-none border-2 border-white rounded-10 shadow transition duration-300 mb-20"   placeholder='lastname' required value={values.lastname} onChange={(e)=>setvalues({...values,lastname:e.target.value})}></input>
                        {values.password.length < 8 && accept && <p className='error'>password should be 8 caracter</p>}
                        <input type='password' className="placeholder-black relative focus:border-[rgb(116,87,183)]   px-15 py-20 w-400 outline-none border-2 border-white rounded-10 shadow transition duration-300 mb-20"   placeholder='role' required value={values.role} onChange={(e)=>setvalues({...values,role:e.target.value})}></input>
                        {values.password.length < 8 && accept && <p className='error'>password should be 8 caracter</p>}
                        <button className='outline-none border-none bg-[rgba(12,12,189,0.845)] w-280 h-50 text-white ml-80 rounded-2xl cursor-pointer transition duration-100 border-2 border-white font-bold' type='submit'>Sign up</button>
                        
                    </form>
                    <div className='bg-gray-300 relative left-[-172px] top-[45px] w-[47%] h-1'></div>
                    <h3 className='relative top-[15px]'>OR</h3>
                    <div className='bg-gray-300 relative left-[170px] w-[47%] top-[-15px] h-1'></div>
                    </div>    
                    



                </div>
            </div>
          






        </div>
    )
}

