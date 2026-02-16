import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';

function App() {
  const API = import.meta.env.VITE_API_URL;
  const [allTasks,setAllTasks] = useState([])

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage allTasks={allTasks} setAllTasks={setAllTasks}/>}></Route>
        <Route path='/About' element={<About/>}></Route>
      </Routes>
     
    </>
  )
}

export default App
