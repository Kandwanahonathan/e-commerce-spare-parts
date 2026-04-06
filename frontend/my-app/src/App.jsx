import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './pages/login'
import { Register } from './pages/register'
import { Routes,Route } from 'react-router-dom'
import Customer from './pages/customer-dash'
import Admin from './pages/admin-dash'
import ProtectedRouter from './pages/protectedRoute'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
 

  return (
    <>
      
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/customer-dash" element={<ProtectedRouter role="customer">
          
           <Customer/>
          </ProtectedRouter>}/>
          <Route path="/admin-dash" element={<ProtectedRouter role="admin">
          
           <Admin/>
          </ProtectedRouter>}/>
          
        </Routes>
        <ToastContainer/>
    </>
  )
}

export default App
