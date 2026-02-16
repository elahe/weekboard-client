import React, { useEffect } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";

export default function Homepage({ allTasks, setAllTasks }) {
  const path = import.meta.env.VITE_API_URL;

  const getDate = async () => {
    try {
      const Response = await axios.get(`${path}/tasks`);
      setAllTasks(Response.data);
      console.log(Response.data);
    } catch (error) {
      return "error";
    }
  };
  useEffect(() => {
    getDate();
  }, []);

  if (allTasks.length === 0) {
    return <h3>loading...</h3>;
  }

  const handelDelete = async (id)=>{
    try {
        await axios.delete(`${path}/tasks/${id}`)
        console.log(`${path}/tasks/${id}`)
    } catch (error) {
        return "error"
    }
  }

  return (
    <div>

        <TaskForm allTasks={allTasks} setAllTasks ={setAllTasks}/>
      {allTasks.map(({ id, title, description, isUrgent, isDone, dueDate, categoryId },i,) => {
          return(
            <ul key={id}>
                <li >{title}</li>
                <li>{description}</li>
                <li>{isUrgent}</li>
                <li>{isDone}</li>
                <li>{dueDate}</li>
                <button onClick={() => {handelDelete(id)}} >delete</button>
            </ul>
          )
        },
      )}
    </div>
  );
}
