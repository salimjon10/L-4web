import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  MOVE_TASK,
  TOGGLE_PINNED,
  GET_TASKS,
} from "./types";
import { Task } from "../types/Task";
import { IRootState } from "../types/IRootState";

export const addTask = (title: string, body: string) => ({
  type: ADD_TASK,
  payload: { title, body },
});

export const editTask = (index: number, newTitle: string, newBody: string) => ({
  type: EDIT_TASK,
  payload: { index, newTitle, newBody },
});

export const deleteTask = (index: number) => ({
  type: DELETE_TASK,
  payload: { index },
});

export const moveTask = (oldIndex: number, newIndex: number) => ({
  type: MOVE_TASK,
  payload: { oldIndex, newIndex },
});

export const togglePinned = (index: number) => ({
  type: TOGGLE_PINNED,
  payload: { index },
});

export const getTasks = (tasks: Task[]) => ({
  type: GET_TASKS,
  payload: tasks,
});

export const getTaskPinnedLength = (state: IRootState) => {
  return state.tasks.filter((task: Task) => task.pinned).length;
};