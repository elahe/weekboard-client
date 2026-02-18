import { useEffect ,useState} from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import EditModal from "../components/EditModal";
import TaskItem from "../components/TaskItem";



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

  // Helper function to check if date is in current week
  const isCurrentWeek = (dateString) => {
    const taskDate = new Date(dateString);
    const today = new Date();
    
    // Get Monday of current week
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    
    // Get Sunday of current week
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    
    return taskDate >= monday && taskDate <= sunday;
  };

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
    return allTasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === day.toDateString();
    });
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div>
       {selectedTask && <EditModal selectedTask={selectedTask} setSelectedTask={setSelectedTask} allTasks ={allTasks} api={api} allCategory={allCategory} getData={getData}/>}
        <TaskForm allTasks={allTasks} setAllTasks ={setAllTasks} allCategory={allCategory}setAllCategory={setAllCategory} api={api} getData={getData}/>
      
      {/* Loop through each day of current week and display tasks */}
      {getWeekDays().map((day, index) => (
        <div key={index}>
          <h3>{weekDays[index]}</h3>
          {getTasksByDay(day).map(eachTask => (
            <TaskItem key={eachTask.id} eachTask={eachTask} allTasks={allTasks} allCategory={allCategory} handelDelete={handelDelete} setSelectedTask={setSelectedTask}/>
          ))}
        </div>
      ))}
    </div>
  );
}
