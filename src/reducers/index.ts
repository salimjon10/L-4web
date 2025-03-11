import { combineReducers, AnyAction } from "redux";
import {
  addTask,
  editTask,
  delTask,
  moveTask,
  getTaskList,
  toggleTask,
} from "../scripts/taskStorageController";
import { Task } from "../types/Task";

const initialState: Task[] = [];

const tasksReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "GET_TASKS": {
      const taskList = getTaskList();
      const sortedTasks = taskList.sort((a: Task, b: Task) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
      });
      return sortedTasks;
    }
    case "TOGGLE_PINNED": {
      toggleTask(action.payload.index);
      return state;
    }
    case "ADD_TASK": {
      const newTask = {
        title: action.payload.title,
        bodyTask: action.payload.body,
        pinned: false,
      };
      const updatedState = [...state, newTask];
      addTask(newTask);
      return updatedState;
    }
    case "EDIT_TASK": {
      const updatedState = state.map((task, idx) => {
        if (idx === action.payload.index) {
          return {
            title: action.payload.newTitle,
            bodyTask: action.payload.newBody,
            pinned: task.pinned,
          };
        }
        return task;
      });
      editTask(
        action.payload.index,
        action.payload.newTitle,
        action.payload.newBody
      );
      return updatedState;
    }
    case "DELETE_TASK": {
      const newState = state.filter((_, idx) => idx !== action.payload.index);
      delTask(action.payload.index);
      return newState;
    }
    case "MOVE_TASK": {
      const { oldIndex, newIndex } = action.payload;
      const movedTask = state[oldIndex];
      const newState = [...state];
      newState.splice(oldIndex, 1);
      newState.splice(newIndex, 0, movedTask);
      moveTask(oldIndex, newIndex);
      return newState;
    }
    case "GET_PINNED_LENGTH": {
      return state.filter((task) => task.pinned).length;
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;