import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const API = import.meta.env.VITE_API_URL;
  const [allTasks,setAllTasks] = useState(null)
  const [allCategory, setAllCategory] = useState(null)


    const getData = async () => {
    try {
      const Response = await axios.get(`${API}/tasks?_expand=category`);
      setAllTasks(Response.data); //before adding the arr to the state loop through every element and creat new property with a month
      Response.data.forEach(element => {
        const taskDate = new Date(element.dueDate)
        console.log(taskDate)
      });
      const response = await axios.get(`${API}/categories`)
      setAllCategory(response.data)
      // console.log(Response.data);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getData();
  }, []);


  //conditions should be after hooks

  if (allCategory === null ||allTasks === null ) {
    return <h3>loading...</h3>;
  }



  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage allTasks={allTasks} setAllTasks={setAllTasks} allCategory={allCategory} setAllCategory={setAllCategory} api={API} getData={getData}/>}></Route>
        <Route path='/About' element={<About/>}></Route>
      </Routes>
     
    </>
  )
}

export default App
