import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const API = import.meta.env.VITE_API_URL;
  const [allTasks,setAllTasks] = useState([])
  const [allCategory, setAllCategory] = useState(null)


    const getData = async () => {
    try {
      const Response = await axios.get(`${API}/tasks?_expand=category`);
      setAllTasks(Response.data);
      const response = await axios.get(`${path}/categories`)
      setAllCategory(response.data)
      // console.log(Response.data);
    } catch (error) {
      return "error";
    }
  };
  useEffect(() => {
    getData();
  }, []);


  //conditions should be after hooks

  // if (allCategory === null) {
  //   return <h3>loading...</h3>;
  // }

  if (allTasks.length === 0) {
    return <h3>loading...</h3>;
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage allTasks={allTasks} setAllTasks={setAllTasks} allCategory={allCategory} setAllCategory={setAllCategory} api={API}/>}></Route>
        <Route path='/About' element={<About/>}></Route>
      </Routes>
     
    </>
  )
}

export default App
