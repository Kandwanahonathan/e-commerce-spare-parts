import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
export default function Login() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate()
    const handleClick=async(e)=>{
        e.preventDefault();
        try{
        const res=await axios.post('http://localhost:5000/user/login',{email,password})
        alert(res.data.message);
        //saved to 
        localStorage.setItem("user",JSON.stringify(res.data.user))
        if (res.data.user.role ==="Admin") {
            navigate('/admin-dash')
        }
        else{
            navigate('/customer-dash')
        }
        }
    catch(error){
        alert("invalid email or password")
    }
    }
    
    return(
        <div>
              <div className="flex items-center justify-center min-h-screen p-3 bg-gray-100">
                <form action="" onSubmit={handleClick} className="rounded p-4 shadow-lg w-560">
                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}
                    className="w-full p-3 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    /><br></br><br></br> <br></br>  
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}
                    className="w-full p-3 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    /><br></br><br></br> <br></br>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-500 rounded p-3 text-white font-bold font-500 ">Login</button>
                </form>
              </div>
        </div>
    )
}