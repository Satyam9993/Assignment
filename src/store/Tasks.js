import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: []
};

export const usertaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    setAddNewTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload.task];
    },
    setRemovetask: (state, action) => {
      const id = action.payload.taskId;
      state.tasks = state.tasks.filter(c => c._id !== id);
    },
    setUpdate: (state, action) => {
      const task_update = action.payload.task;
      console.log(task_update)
      const updatedtasks = state.tasks.map((task) => {
        if (task._id === task_update._id) return task_update;
        return task;
      });
      state.tasks = updatedtasks;
    }
  },
});

export const { setTasks, setAddNewTask, setRemovetask, setUpdate } = usertaskSlice.actions;
export default usertaskSlice.reducer;