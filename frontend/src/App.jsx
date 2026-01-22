import React from 'react'
import { Routes , Route } from 'react-router-dom'
import ResumeBuilder from './pages/ResumeBuilder.jsx'
import Success from './pages/Sucess.jsx'

import './App.css'

function App() {
 

  return (
   <>
   <Routes>



    <Route path='/' element={<ResumeBuilder/>}/>
    <Route path='/sucess' element={<Success/>}/>

   </Routes>

   
   
   
   
   </>
  )
}

export default App
