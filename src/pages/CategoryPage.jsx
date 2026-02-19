import React from 'react'

export default function CategoryPage({allTasks,allCategory}) {
    console.log(allCategory,allTasks)
  return (
    <div>
        {allCategory.map((eachCategory)=>{
            return(<div>
                <h2>{eachCategory.title}</h2>
                <ul>
                       {allTasks.filter(task => task.categoryId === eachCategory.id)
                       .map((eachTask)=>{
                         return(
                            <li>
                                <h3>{eachTask.title}</h3>
                                <p>{eachTask.description}</p>

                            </li>
                         )
                       })
                       }
                </ul>
            </div>)
        })}
    </div>
  )
}
