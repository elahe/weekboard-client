import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function TaskItem({eachTask,allTasks,allCategory,handelDelete,setSelectedTask,api,getData}) {

  const [done, setDone] = useState(eachTask.isDone);


  // const doneInput = async() =>{
  //   const body ={
  //     isDone :done
  //   }
  //   try {
  //     await axios.patch(`${api}/tasks/${eachTask.id}`, body)
  //     getData()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const handleDone = async() =>{
    const newIsDone = !done
    setDone(newIsDone)
    const body ={
      isDone :newIsDone
    }
    try {
      await axios.patch(`${api}/tasks/${eachTask.id}`, body)
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div >
        <ul style={{border:"1px solid white"}}>
                <li >{eachTask.title}</li>
                <li>{eachTask.description}</li>
                <li>{eachTask.isUrgent}</li>
                <input type='checkbox' checked={done} onChange={handleDone}></input>
                <li>{eachTask.isDone}</li>
                {/* <li>{eachTask.dueDate}</li> */}
                <li>{eachTask.category?.title}</li>
                
                
                <button onClick={() => {handelDelete(eachTask.id)}} >delete</button>
                <button onClick={() => {setSelectedTask(eachTask)}}>edit</button>
                

            </ul>
    </div>
  )
}
