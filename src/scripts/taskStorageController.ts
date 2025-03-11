import { Task } from "../types/Task";
import { ItemTypes } from "./itemTypes";

const taskListStorageName = "tasks";

export function resetList() {
  const arr: Task[] = [];
  localStorage.setItem(taskListStorageName, JSON.stringify(arr));
}

export function addTask(task: Task) {
  const taskList = getTaskList();
  taskList.push(task);
  localStorage.setItem(taskListStorageName, JSON.stringify(taskList));
}

export function editTask(index: number, newTitle: string, newBody: string) {
  const taskList = getTaskList();
  taskList[index].title = newTitle;
  taskList[index].bodyTask = newBody;
  localStorage.setItem(taskListStorageName, JSON.stringify(taskList));
}

export function delTask(index: number) {
  const taskList = getTaskList();
  taskList.splice(index, 1);
  localStorage.setItem(taskListStorageName, JSON.stringify(taskList));
}

export function getTaskList() {
  const taskList = JSON.parse(
    localStorage.getItem(taskListStorageName) ?? "[]"
  );
  if (taskList == null) {
    localStorage.setItem(taskListStorageName, JSON.stringify([]));
    return taskList;
  }
  const sortedTasks = taskList.sort((a: Task, b: Task) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
  return sortedTasks;
}

export function toggleTask(index: number) {
  const taskList = getTaskList();
  if (getPinnedTaskCount() >= 3 && !taskList[index].pinned) {
    return;
  }
  taskList[index].pinned = !taskList[index].pinned;
  localStorage.setItem(taskListStorageName, JSON.stringify(taskList));
}

export function getPinnedTaskCount() {
  let pinnedCount = 0;
  const taskList = getTaskList();
  taskList.map((task: Task) => {
    if (task.pinned) {
      pinnedCount++;
    }
  });
  return pinnedCount;
}

export function moveTask(dragIndex: number, hoverIndex: number) {
  const taskList = getTaskList();
  const draggedTask = taskList[dragIndex];

  if (draggedTask.type == ItemTypes.PINNED_TASK) {
    return;
  }

  taskList.splice(dragIndex, 1);
  taskList.splice(hoverIndex, 0, draggedTask);
  localStorage.setItem(taskListStorageName, JSON.stringify(taskList));
}
