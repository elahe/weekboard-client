
import axios from "axios";
import React, { useState } from "react";
import {
  Paper,
  Stack,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Chip,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export default function TaskItem({
  eachTask,
  handelDelete,
  setSelectedTask,
  api,
  getData
}) {
  const [done, setDone] = useState(eachTask.isDone);

  const handleDone = async () => {
    const newIsDone = !done;
    setDone(newIsDone);

    try {
      await axios.patch(`${api}/tasks/${eachTask.id}`, {
        isDone: newIsDone,
      });
      getData()
    } catch (error) {
      console.log(error);
    }
  };

  // Left status dot color logic
  const indicatorColor = done
    ? "#3BA776" // green when done
    : eachTask.isUrgent
    ? "#EF4444" // red if urgent
    : "#F05A28"; // orange default

  return (
    <Paper
      elevation={0}
      onClick={handleDone}
      sx={{
        p: 1.8,
        borderRadius: 4,
        backgroundColor: "#EFECE7",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "0.2s ease",
        "&:hover": {
          transform: "translateY(-1px)",
        },
      }}
    >
      {/* LEFT SIDE */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        {/* Colored indicator circle */}
        <Box
          sx={{
            width: 14,
            height: 14,
            borderRadius: 999,
            bgcolor: indicatorColor,
            boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
          }}
        />

        <Box>
          <Typography
            sx={{
              fontWeight: 800,
              textDecoration: done ? "line-through" : "none",
              opacity: done ? 0.55 : 1,
              lineHeight: 1.2,
            }}
          >
            {eachTask.title}
          </Typography>

          {/* Category + Urgency */}
          <Stack direction="row" spacing={1} sx={{ mt: 0.3 }} alignItems="center">
            <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: 700 }}>
              {eachTask.category?.title || "No category"}
            </Typography>

            <Chip
              size="small"
              label={eachTask.isUrgent ? "Urgent" : "Not urgent"}
              sx={{
                height: 22,
                fontWeight: 800,
                borderRadius: 999,
                backgroundColor: eachTask.isUrgent
                  ? "rgba(239,68,68,0.14)"
                  : "rgba(16,185,129,0.14)",
                color: eachTask.isUrgent ? "#EF4444" : "#10B981",
              }}
            />
          </Stack>
        </Box>
      </Stack>

      {/* RIGHT SIDE ICONS */}
      <Stack
        direction="row"
        spacing={0.5}
        onClick={(e) => e.stopPropagation()}
      >
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => setSelectedTask(eachTask)}>
            <EditRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton size="small" onClick={() => handelDelete(eachTask.id)}>
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
}



// export default function TaskItem({eachTask,allTasks,allCategory,handelDelete,setSelectedTask,api,getData}) {

//   const [done, setDone] = useState(eachTask.isDone);



//   const handleDone = async() =>{
//     const newIsDone = !done
//     setDone(newIsDone)
//     const body ={
//       isDone :newIsDone
//     }
//     try {
//       await axios.patch(`${api}/tasks/${eachTask.id}`, body)
//     } catch (error) {
//       console.log(error)
//     }

//   }
//   return (
//     <div >
//         <ul style={{border:"1px solid white"}}>
//                 <li >{eachTask.title}</li>
//                 <li>{eachTask.description}</li>
//                 <li>{eachTask.isUrgent}</li>
//                 <input type='checkbox' checked={done} onChange={handleDone}></input>
//                 <li>{eachTask.isDone}</li>
//                 {/* <li>{eachTask.dueDate}</li> */}
//                 <li>{eachTask.category?.title}</li>
                
                
//                 <button onClick={() => {handelDelete(eachTask.id)}} >delete</button>
//                 <button onClick={() => {setSelectedTask(eachTask)}}>edit</button>
                

//             </ul>
//     </div>
//   )
// }