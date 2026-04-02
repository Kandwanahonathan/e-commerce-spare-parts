import React,{useState} from "react";

import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

export function Register() {
    const [name, setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    
    const handleClick=async(e)=>{
        e.preventDefault()

        try {
            const res= await axios.post("http://localhost:5000/user/register",{name,email,password})
            alert("data inserted successfully")
            setName("")
            setEmail("")
            setPassword("")
        } catch (err) {
            alert("not inserted")
        }
    }
   
    return(
        <div>
            
          <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
           
            <form action="" onSubmit={handleClick} className="w-130 bg-white rounded shadow-lg p-3">
                 <h2 className="text-blue font-bold text-center ">Registeration for user</h2>
                <input type="text" value={name} placeholder="enter the name"  onChange={(e)=>{setName(e.target.value)}} 
                className="w-full p-3 border border  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                /><br/><br/>
                <input type="email" value={email} placeholder="enter the email"  onChange={(e)=>{setEmail(e.target.value)}} 
                className="w-full p-3 border border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                /><br/><br />
                <input type="password" value={password} placeholder="enter the password"  onChange={(e)=>{setPassword(e.target.value)}} 
                className="w-full p-3 border border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                /><br/><br />
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-500 rounded p-3 text-white font-bold font-500 ">Register</button><br /><br />
                {/* <button type="button" className="w-full bg-blue-500 hover:bg-blue-500 rounded p-3 text-white font-bold font-500 " onClick={()=>navigate('/login')}>login</button> */}
                <a href="login.jsx">login if you have account</a>
            </form>
          </div>
        </div>
    )
}