import { useEffect ,useState} from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import EditModal from "../components/EditModal";
import TaskCard from "../components/TaskItem";



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
        console.log(error)
    }
  }

  //edit button
//   const handleEdit = (id) => {

//   }

 


  return (
    <div>
       {selectedTask && <EditModal selectedTask={selectedTask} setSelectedTask={setSelectedTask} allTasks ={allTasks} api={api} allCategory={allCategory} getData={getData}/>}
        <TaskForm allTasks={allTasks} setAllTasks ={setAllTasks} allCategory={allCategory}setAllCategory={setAllCategory} api={api} getData={getData}/>
      {allTasks.map((eachTask,i) => {
          return(
            <TaskCard key={eachTask.id} eachTask={eachTask} allTasks={allTasks} allCategory={allCategory} handelDelete={handelDelete} setSelectedTask={setSelectedTask}/>
            
          )
        },
      )}
    </div>
  );
}
