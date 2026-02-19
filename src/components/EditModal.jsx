import React from "react";
import { useState } from "react";
import axios from "axios";

export default function EditModal({
  allTasks,
  selectedTask,
  setSelectedTask,
  api,
  allCategory,
  getData
}) {
  const [title, setTitle] = useState(selectedTask.title);
  const [isUrgent, setIsUrgent] = useState(selectedTask.isUrgent);
  const [description, setDescription] = useState(selectedTask.description);
  const [dueDate, setDueDate] = useState(selectedTask.dueDate);
  const [categoryId, setCategoryId] = useState(selectedTask.categoryId);
//   console.log(selectedTask.)

  const landleEdit = async (e) => {
    e.preventDefault();
    const body = {
    //   id : `${Date.now()}`,
      title,
      isUrgent,
      description,
      dueDate,
      categoryId,
    };
    try {
      await axios.patch(`${api}/tasks/${selectedTask.id}`, body);
      console.log(body);
      setSelectedTask(null) // for closing the modal
      getData();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <form onSubmit={landleEdit}>
        <label>
          <input
            type="text"
            placeholder="task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </label>
        <label>
          <input
            type="checkbox"
            value={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
          ></input>
        </label>
        <select>
          {/* {console.log(allCategory[0].title)} */}
          {allCategory.map((eachCaterogy) => {
            return (
              <option key={eachCaterogy.id} value={eachCaterogy.title}>
                {eachCaterogy.title}
              </option>
            );
          })}
        </select>
        <label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button>save</button>
      </form>
    </div>
  );
}
