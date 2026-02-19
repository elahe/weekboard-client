import { useEffect ,useState} from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import EditModal from "../components/EditModal";
import TaskItem from "../components/TaskItem";



export default function Homepage({ allTasks, setAllTasks,allCategory,setAllCategory,api,getData }) {
    // {console.log(allCategory)}

    //test 
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState("all");

  
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


  // Helper function to get all days of current week (Monday to Sunday)
  const getWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // Helper function to filter tasks by specific day
  const getTasksByDay = (day) => {
    return getFilter().filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === day.toDateString();
    });
  };

  // filter

    const getFilter = () => {
        if(filter === "urgent") {
            return allTasks.filter(task=> task.isUrgent === true)
        }
        if(filter === "notUrgent") {
            return allTasks.filter(task=> task.isUrgent === false)
        }
        if(filter === "all") {
            return allTasks
        }
    };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div>
        <div>
            <span>
                <button onClick={() => {setFilter("all")}}>all</button>
            </span>
            <span>
                <button onClick={() => {setFilter("urgent")}}>urgent</button>
            </span>
            <span>
                <button onClick={() => {setFilter("notUrgent")}}>not urgent</button>
            </span>
        </div>

       {selectedTask && <EditModal selectedTask={selectedTask} setSelectedTask={setSelectedTask} allTasks ={allTasks} api={api} allCategory={allCategory} getData={getData}/>}
        <TaskForm allTasks={allTasks} setAllTasks ={setAllTasks} allCategory={allCategory}setAllCategory={setAllCategory} api={api} getData={getData}/>
      
      {/* Loop through each day of current week and display tasks */}
      {getWeekDays().map((day, index) => (
        <div key={index}>
          <h3>{weekDays[index]}</h3>
          {getTasksByDay(day).map(eachTask => (
            <TaskItem key={eachTask.id} eachTask={eachTask} allTasks={allTasks} allCategory={allCategory} handelDelete={handelDelete} setSelectedTask={setSelectedTask} api={api} getData={getData}/>
          ))}
        </div>
      ))}
    </div>
  );
}
