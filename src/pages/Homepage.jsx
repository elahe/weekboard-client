import { useEffect ,useState} from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import EditModal from "../components/EditModal";



export default function Homepage({ allTasks, setAllTasks,allCategory,setAllCategory,api,getData }) {
    // {console.log(allCategory)}

    //test 
    const [selectedTask, setSelectedTask] = useState(null);

  
  // deleting function

  const handelDelete = async (id)=>{
    try {
        await axios.delete(`${api}/tasks/${id}`)
        getData();
        // console.log(`${api}/tasks/${id}`)
    } catch (error) {
        return "error"
    }
  }

  //edit button
//   const handleEdit = (id) => {

//   }

 


  return (
    <div>
        {/* <EditModal allTasks={allTasks} setAllTasks ={setAllTasks} allCategory={allCategory} setAllCategory={setAllCategory} api={api}/> */}

       {selectedTask && <EditModal selectedTask={selectedTask} setSelectedTask={setSelectedTask} allTasks ={allTasks} api={api} allCategory={allCategory} getData={getData}/>}
        {/* <EditModal selectedTask={selectedTask} setSelectedTask={setSelectedTask} allTasks ={allTasks} api={api} allCategory={allCategory}/> */}
        <TaskForm allTasks={allTasks} setAllTasks ={setAllTasks} allCategory={allCategory}setAllCategory={setAllCategory} api={api}/>
      {allTasks.map((eachTask,i) => {
          return(
            <ul key={eachTask.id} style={{border:"1px solid white"}}>
                <li >{eachTask.title}</li>
                <li>{eachTask.description}</li>
                <li>{eachTask.isUrgent}</li>
                <li>{eachTask.isDone}</li>
                <li>{eachTask.dueDate}</li>
                <li>{eachTask.category.title}</li>
                
                
                <button onClick={() => {handelDelete(eachTask.id)}} >delete</button>
                <button onClick={() => {setSelectedTask(eachTask)}}>edit</button>
                

            </ul>
          )
        },
      )}
    </div>
  );
}
