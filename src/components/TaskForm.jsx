// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// export default function TaskForm({ allTasks, setAllTasks,allCategory,setAllCategory,api,getData }) {
//     const [title,setTitle] = useState("")
//     const [isUrgent,setIsUrgent] = useState(false)
//     const [description,setDescription] =useState("")
//     const [dueDate,setDueDate]= useState("")
//     const [categoryId,setCategoryId] = useState("")
// //    {console.log(allCategory)}

//     const handleAdd = async(e) => {
//         e.preventDefault()
//         const body ={
//             id : `${Date.now()}`,
//             title,
//             isUrgent,
//             isDone : false,
//             description,
//             dueDate,
//             categoryId
//         }
//         try {
//             await axios.post(`${api}/tasks`,body)
//             console.log(body)
//             getData()
//         } catch (error) {
//             return "error"
//         }
//     }

//     //for categories
//     // useEffect

    
//   return (
    
//     <div>
//         <form onSubmit={handleAdd}>
//             <label><input type='text' placeholder='task' value={title} onChange={(e)=> setTitle(e.target.value)}></input></label>
//             <label><input type="checkbox" value={isUrgent} onChange={(e)=> setIsUrgent(e.target.checked)}></input></label>
//             {/* <select>
//                 {console.log(allCategory[0].title)}
//                 {allCategory.map((eachCaterogy)=>{
//                     return(
//                     <option key={eachCaterogy.id} value={eachCaterogy.title} onChange={(e)=>setCategoryId(e.target.value)}>{eachCaterogy.title}</option>
//                 )
//                 })}
//             </select> */}
//             <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
//             {allCategory.map((eachCategory) => (
//                 <option key={eachCategory.id} value={eachCategory.id}>
//                 {eachCategory.title}
//                 </option>
//             ))}
//             </select>
//             <label><input type='text' value={description} onChange={(e)=> setDescription(e.target.value)}></input></label>
//             <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
// />
//             <button>create</button>
//         </form>
        
//     </div>
//   )
// }
import axios from "axios";
import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function TaskForm({
  allTasks,
  setAllTasks,
  allCategory,
  setAllCategory,
  api,
  getData,
}) {
  const [title, setTitle] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    const body = {
      id: `${Date.now()}`,
      title,
      isUrgent,
      isDone: false,
      description,
      dueDate,
      categoryId,
    };
    try {
      await axios.post(`${api}/tasks`, body);
      getData();
      // optional: clear fields after create (styling-only preference; remove if you want)
      setTitle("");
      setDescription("");
      setDueDate("");
      setIsUrgent(false);
      setCategoryId("");
    } catch (error) {
      console.log(error)
    }
  };

  return (
  <Box component="form" onSubmit={handleAdd}>
    <Stack spacing={2}>
      <TextField
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        size="medium"
        InputProps={{
          sx: { borderRadius: 3, backgroundColor: "#fff" },
        }}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            sx={{ borderRadius: 3, backgroundColor: "#fff" }}
          >
            {allCategory.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Due date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            sx: { borderRadius: 3, backgroundColor: "#fff" },
          }}
        />
      </Stack>

      <TextField
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        minRows={3}
        InputProps={{
          sx: { borderRadius: 3, backgroundColor: "#fff" },
        }}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
            />
          }
          label="Urgent"
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{
            px: 2.5,
            py: 1.2,
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 800,
            alignSelf: { xs: "stretch", sm: "auto" },
          }}
        >
          Create task
        </Button>
      </Stack>
    </Stack>
  </Box>
);

}

