import React, { useEffect } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";


export default function Homepage({ allTasks, setAllTasks,allCategory,setAllCategory,api }) {

  
  // deleting function
  console.log

  const handelDelete = async (id)=>{
    try {
        await axios.delete(`${api}/tasks/${id}`)
        console.log(`${api}/tasks/${id}`)
    } catch (error) {
        return "error"
    }
  }

  // fetching categories

//   const getDataCategory = async () => {
//     try {
//         const response = await axios.get(`${path}/categories`)
//         setAllCategory(response.data)
//         console.log(response.data)
//     } catch (error) {
//         return "error"
//     }

//   }
//   useEffect(() => {
//     getDataCategory()
//   },[])


//   //conditions should be after hooks

//   if (allCategory === null) {
//     return <h3>loading...</h3>;
//   }

//   if (allTasks.length === 0) {
//     return <h3>loading...</h3>;
//   }


  return (
    <div>

        <TaskForm allTasks={allTasks} setAllTasks ={setAllTasks} allCategory={allCategory}setAllCategory={setAllCategory} api={api}/>
      {allTasks.map(({ id, title, description, isUrgent, isDone, dueDate,category },i,) => {
          return(
            <ul key={id}>
                <li >{title}</li>
                <li>{description}</li>
                <li>{isUrgent}</li>
                <li>{isDone}</li>
                <li>{dueDate}</li>
                <li>{category.title}</li>
                
                <button onClick={() => {handelDelete(id)}} >delete</button>
            </ul>
          )
        },
      )}
    </div>
  );
}
