import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import { useEffect } from 'react';
import axios from 'axios';
import CategoryPage from './pages/CategoryPage';


function App() {
  const API = import.meta.env.VITE_API_URL;
  const [allTasks,setAllTasks] = useState(null)
  const [allCategory, setAllCategory] = useState(null)


    const getData = async () => {
    try {
      const Response = await axios.get(`${API}/tasks?_expand=category`);
      // Extract day of the week from dueDate and add as new property
      Response.data.forEach(element => {
        const taskDate = new Date(element.dueDate);
        element.dayOfWeek = taskDate.toLocaleDateString('en-US', { weekday: 'long' });
      });
      // console.log(Response.data)
      setAllTasks(Response.data);
      const response = await axios.get(`${API}/categories`)
      setAllCategory(response.data)
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
        <Route path='/category' element={<CategoryPage allTasks={allTasks} allCategory={allCategory}/>}></Route>
      </Routes>
     
    </>
  )
}

export default App
