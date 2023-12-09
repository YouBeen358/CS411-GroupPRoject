import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from "./Signup"
import GoogleRegistration from './GoogleRegister'
import Login from './Login'
import Home from './Home'
import GoogleLogin from './LoginGoogle'



function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/googlelogin" element={<GoogleLogin />}></Route>
        <Route path="/home" element={<Home />}></Route>


        <Route path="/registerwithgoogle" element={<GoogleRegistration />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
