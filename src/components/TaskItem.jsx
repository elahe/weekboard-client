import React from 'react'

export default function TaskItem({eachTask,allTasks,allCategory,handelDelete,setSelectedTask}) {
  return (
    <div >
        <ul style={{border:"1px solid white"}}>
                <li >{eachTask.title}</li>
                <li>{eachTask.description}</li>
                <li>{eachTask.isUrgent}</li>
                <li>{eachTask.isDone}</li>
                <li>{eachTask.dueDate}</li>
                <li>{eachTask.category?.title}</li>
                
                
                <button onClick={() => {handelDelete(eachTask.id)}} >delete</button>
                <button onClick={() => {setSelectedTask(eachTask)}}>edit</button>
                

            </ul>
    </div>
  )
}
