import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from "./Signup"
import Signup2 from "./Signup2"
import Login from './Login'
import Home from './Home'


function App() {

  return (
   <BrowserRouter>
      <Routes>

        <Route path="/register" element={<Signup />}></Route>
        <Route path="/register2" element={<Signup2 />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        
      </Routes>
   </BrowserRouter>
  )
}

export default App
