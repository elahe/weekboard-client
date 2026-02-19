import { useEffect ,useState} from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import EditModal from "../components/EditModal";
import TaskItem from "../components/TaskItem";
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Chip,
  Collapse,
  IconButton,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
// import CheckCircleOutlineRoundedIcon from "@mui/icons-material/Eco";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";




export default function Homepage({ allTasks, setAllTasks,allCategory,setAllCategory,api,getData }) {
    // {console.log(allCategory)}

    //test 
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState("all");
    const [openForm, setOpenForm] = useState(false);

  
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

//   return (
//     <div>
//         <div>
//             <span>
//                 <button onClick={() => {setFilter("all")}}>all</button>
//             </span>
//             <span>
//                 <button onClick={() => {setFilter("urgent")}}>urgent</button>
//             </span>
//             <span>
//                 <button onClick={() => {setFilter("notUrgent")}}>not urgent</button>
//             </span>
//         </div>

//        {selectedTask && <EditModal selectedTask={selectedTask} setSelectedTask={setSelectedTask} allTasks ={allTasks} api={api} allCategory={allCategory} getData={getData}/>}
//         <TaskForm allTasks={allTasks} setAllTasks ={setAllTasks} allCategory={allCategory}setAllCategory={setAllCategory} api={api} getData={getData}/>
      
//       {/* Loop through each day of current week and display tasks */}
//       {getWeekDays().map((day, index) => (
//         <div key={index}>
//           <h3>{weekDays[index]}</h3>
//           {getTasksByDay(day).map(eachTask => (
//             <TaskItem key={eachTask.id} eachTask={eachTask} allTasks={allTasks} allCategory={allCategory} handelDelete={handelDelete} setSelectedTask={setSelectedTask} api={api} getData={getData}/>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
return (
  <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", py: 5 }}>
    <Container maxWidth="md">
      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 3 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            backgroundColor: "primary.main",
            display: "grid",
            placeItems: "center",
            color: "white",
            boxShadow: "0 8px 20px rgba(240, 90, 40, 0.25)",
          }}
        >
          <CalendarMonthRoundedIcon />
        </Box>

        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.6 }}>
            Weekly Planner
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.75, mt: 0.5 }}>
            Organize your week, one task at a time.
          </Typography>
        </Box>
      </Stack>

      {/* Filters */}
      <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, v) => v && setFilter(v)}
          sx={{
            gap: 1.5,
            "& .MuiToggleButton-root": {
              border: 0,
              borderRadius: 999,
              px: 2,
              py: 1,
              textTransform: "none",
              fontWeight: 700,
              backgroundColor: "#EFECE7",
              color: "#111827",
              boxShadow: "none",
            },
            "& .Mui-selected": {
              backgroundColor: "primary.main !important",
              color: "#fff !important",
              boxShadow: "0 10px 20px rgba(240,90,40,0.22)",
            },
          }}
        >
          <ToggleButton value="all">
            <Stack direction="row" spacing={1} alignItems="center">
              <GridViewRoundedIcon fontSize="small" />
              <span>All</span>
              {/* <Chip
                size="small"
                // label={allTasks.length}
                sx={{
                  ml: 0.5,
                  height: 22,
                  fontWeight: 800,
                  backgroundColor: "rgba(255,255,255,0.25)",
                  color: "inherit",
                }}
              /> */}
            </Stack>
          </ToggleButton>

          <ToggleButton value="urgent">
            <Stack direction="row" spacing={1} alignItems="center">
              <WhatshotRoundedIcon fontSize="small" />
              <span>Urgent</span>
              {/* <Chip
                // size="small"
                // label={allTasks.filter((t) => t.isUrgent).length}
                sx={{
                  ml: 0.5,
                  height: 22,
                  fontWeight: 800,
                  backgroundColor: "rgba(0,0,0,0.06)",
                }}
              /> */}
            </Stack>
          </ToggleButton>

          <ToggleButton value="notUrgent">
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleOutlineRoundedIcon fontSize="small" />
              <span>Not Urgent</span>
              {/* <Chip
                size="small"
                label={allTasks.filter((t) => !t.isUrgent).length}
                sx={{
                  ml: 0.5,
                  height: 22,
                  fontWeight: 800,
                  backgroundColor: "rgba(0,0,0,0.06)",
                }}
              /> */}
            </Stack>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* Modal */}
      {selectedTask && (
        <EditModal
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          allTasks={allTasks}
          api={api}
          allCategory={allCategory}
          getData={getData}
        />
      )}

      {/* Collapsed Add Task Card */}
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 4,
          border: "2px solid rgba(240, 90, 40, 0.35)",
          backgroundColor: "background.paper",
          boxShadow: "0 12px 30px rgba(17, 24, 39, 0.06)",
          overflow: "hidden",
        }}
      >
        <Box
          onClick={() => setOpenForm((s) => !s)}
          sx={{
            px: 2.5,
            py: 2,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 3,
                backgroundColor: "rgba(240, 90, 40, 0.12)",
                display: "grid",
                placeItems: "center",
                color: "primary.main",
              }}
            >
              <AddRoundedIcon />
            </Box>

            <Typography sx={{ fontWeight: 700, opacity: 0.7 }}>
              Add new task
            </Typography>
          </Stack>

          <IconButton size="small" sx={{ opacity: 0.7 }}>
            <AddRoundedIcon />
          </IconButton>
        </Box>

        <Collapse in={openForm} timeout={250} unmountOnExit>
          <Box sx={{ px: 2.5, pb: 2.5 }}>
            <TaskForm
              allTasks={allTasks}
              setAllTasks={setAllTasks}
              allCategory={allCategory}
              setAllCategory={setAllCategory}
              api={api}
              getData={getData}
            />
          </Box>
        </Collapse>
      </Paper>

      {/* Week sections */}
      <Stack spacing={3}>
        {getWeekDays().map((day, index) => {
          const tasks = getTasksByDay(day);

          return (
            <Box key={index}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1.5 }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                  {weekDays[index]}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.6, fontWeight: 700 }}>
                  {/* 0/{tasks.length} */}
                </Typography>
              </Stack>

              <Divider sx={{ mb: 2, opacity: 0.6 }} />

              <Stack spacing={1.5}>
                {tasks.map((eachTask) => (
                  <TaskItem
                    key={eachTask.id}
                    eachTask={eachTask}
                    allTasks={allTasks}
                    allCategory={allCategory}
                    handelDelete={handelDelete}
                    setSelectedTask={setSelectedTask}
                    api={api}
                    getData={getData}
                  />
                ))}
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Container>
  </Box>
);


}
