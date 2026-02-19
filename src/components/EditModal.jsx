// import React from "react";
// import { useState } from "react";
// import axios from "axios";

// export default function EditModal({
//   allTasks,
//   selectedTask,
//   setSelectedTask,
//   api,
//   allCategory,
//   getData
// }) {
//   const [title, setTitle] = useState(selectedTask.title);
//   const [isUrgent, setIsUrgent] = useState(selectedTask.isUrgent);
//   const [description, setDescription] = useState(selectedTask.description);
//   const [dueDate, setDueDate] = useState(selectedTask.dueDate);
//   const [categoryId, setCategoryId] = useState(selectedTask.categoryId);
// //   console.log(selectedTask.)

//   const landleEdit = async (e) => {
//     e.preventDefault();
//     const body = {
//     //   id : `${Date.now()}`,
//       title,
//       isUrgent,
//       description,
//       dueDate,
//       categoryId,
//     };
//     try {
//       await axios.patch(`${api}/tasks/${selectedTask.id}`, body);
//       console.log(body);
//       setSelectedTask(null) // for closing the modal
//       getData();
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={landleEdit}>
//         <label>
//           <input
//             type="text"
//             placeholder="task"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           ></input>
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             value={isUrgent}
//             onChange={(e) => setIsUrgent(e.target.checked)}
//           ></input>
//         </label>
//         <select>
//           {/* {console.log(allCategory[0].title)} */}
//           {allCategory.map((eachCaterogy) => {
//             return (
//               <option key={eachCaterogy.id} value={eachCaterogy.title}>
//                 {eachCaterogy.title}
//               </option>
//             );
//           })}
//         </select>
//         <label>
//           <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           ></input>
//         </label>
//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//         />
//         <button>save</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

export default function EditModal({
  allTasks,
  selectedTask,
  setSelectedTask,
  api,
  allCategory,
  getData,
}) {
  const [title, setTitle] = useState(selectedTask.title);
  const [isUrgent, setIsUrgent] = useState(selectedTask.isUrgent);
  const [description, setDescription] = useState(selectedTask.description);
  const [dueDate, setDueDate] = useState(selectedTask.dueDate);
  const [categoryId, setCategoryId] = useState(selectedTask.categoryId);

  const landleEdit = async (e) => {
    e.preventDefault();
    const body = {
      title,
      isUrgent,
      description,
      dueDate,
      categoryId,
    };

    try {
      await axios.patch(`${api}/tasks/${selectedTask.id}`, body);
      setSelectedTask(null);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={Boolean(selectedTask)}
      onClose={() => setSelectedTask(null)}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Edit task
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Update details and save changes.
          </Typography>
        </Box>

        <IconButton onClick={() => setSelectedTask(null)}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={landleEdit}>
        <DialogContent sx={{ px: 3, pb: 2 }}>
          <Stack spacing={2}>
            <TextField
              label="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="category-edit-label">Category</InputLabel>
                <Select
                  labelId="category-edit-label"
                  label="Category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
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
              />
            </Stack>

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              minRows={3}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                />
              }
              label="Urgent"
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => setSelectedTask(null)}
            variant="text"
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveRoundedIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 800,
              borderRadius: 999,
              px: 2.5,
              py: 1.1,
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
