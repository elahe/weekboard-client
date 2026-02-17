import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function TaskForm({ allTasks, setAllTasks,allCategory,setAllCategory,api }) {
    const [title,setTitle] = useState("")
    const [isUrgent,setIsUrgent] = useState(false)
    const[description,setDescription] =useState("")
    const [dueDate,setDueDate]= useState("")
    const [categoryId,setCategoryId] = useState("")
    // console.log(api)

    const handleAdd = async(e) => {
        e.preventDefault()
        const body ={
            id : `${Date.now()}`,
            title,
            isUrgent,
            description,
            dueDate,
            categoryId: categoryId || "c2"
        }
        try {
            await axios.post(`${api}/tasks`,body)
            console.log(body)
        } catch (error) {
            return "error"
        }


    }

    //for categories
    useEffect

    
  return (
    
    <div>
        <form onSubmit={handleAdd}>
            <label><input type='text' placeholder='task' value={title} onChange={(e)=> setTitle(e.target.value)}></input></label>
            <label><input type="checkbox" value={isUrgent} onChange={(e)=> setIsUrgent(e.target.value)}></input></label>
            <select>
                {/* {console.log()} */}
            </select>
            <label><input type='text' value={description} onChange={(e)=> setDescription(e.target.value)}></input></label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
/>
            <button>create</button>
        </form>
        
    </div>
  )
}
