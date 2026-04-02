import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './pages/login'
import { Register } from './pages/register'

import Customer from './pages/customer-dash'
import Admin from './pages/admin-dash'

function App() {
 

  return (
    <>
      <Login/>
      <Register/>
      
      <Customer/>
      <Admin/>
    </>
  )
}

export default App
