import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './pages/login'
import { Register } from './pages/register'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Customer from './pages/customer-dash'
import Admin from './pages/admin-dash'
import ProtectedRouter from './pages/protectedRoute'

function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/admin-dash" element={<ProtectedRouter role={Admin}>
          
           <Admin/>
          </ProtectedRouter>}/>
          <Route path="/customer-dash" element={<ProtectedRouter role={Customer}>
          
           <Customer/>
          </ProtectedRouter>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
