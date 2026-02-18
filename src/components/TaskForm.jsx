import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function TaskForm({ allTasks, setAllTasks,allCategory,setAllCategory,api,getData }) {
    const [title,setTitle] = useState("")
    const [isUrgent,setIsUrgent] = useState(false)
    const [description,setDescription] =useState("")
    const [dueDate,setDueDate]= useState("")
    const [categoryId,setCategoryId] = useState("")
//    {console.log(allCategory)}

    const handleAdd = async(e) => {
        e.preventDefault()
        const body ={
            id : `${Date.now()}`,
            title,
            isUrgent,
            description,
            dueDate,
            categoryId
        }
        try {
            await axios.post(`${api}/tasks`,body)
            console.log(body)
            getData()
        } catch (error) {
            return "error"
        }
    }

    //for categories
    // useEffect

    
  return (
    
    <div>
        <form onSubmit={handleAdd}>
            <label><input type='text' placeholder='task' value={title} onChange={(e)=> setTitle(e.target.value)}></input></label>
            <label><input type="checkbox" value={isUrgent} onChange={(e)=> setIsUrgent(e.target.checked)}></input></label>
            {/* <select>
                {console.log(allCategory[0].title)}
                {allCategory.map((eachCaterogy)=>{
                    return(
                    <option key={eachCaterogy.id} value={eachCaterogy.title} onChange={(e)=>setCategoryId(e.target.value)}>{eachCaterogy.title}</option>
                )
                })}
            </select> */}
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {allCategory.map((eachCategory) => (
                <option key={eachCategory.id} value={eachCategory.id}>
                {eachCategory.title}
                </option>
            ))}
            </select>
            <label><input type='text' value={description} onChange={(e)=> setDescription(e.target.value)}></input></label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
/>
            <button>create</button>
        </form>
        
    </div>
  )
}
