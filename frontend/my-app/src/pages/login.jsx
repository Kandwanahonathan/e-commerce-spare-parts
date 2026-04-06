import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/login", { email, password });

      const user = res.data.user;
      // notify use toastify

      toast.success(`Welcome ${user.name}!`,{
        position:"top-right",
        autoClose:2000
      })

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      
      // Redirect based on role
      setTimeout(()=>{
        const role=user.role.toLowerCase();
      if (role === "admin") {
        navigate("/admin-dash");
      } else {
        navigate("/customer-dash");
      }
      },500)
    } catch (error) {
      toast.error("invalid email and name",{
        position:"top-right",
        autoClose:200
        
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="w-96 bg-white rounded shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          User Login
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold p-3 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}