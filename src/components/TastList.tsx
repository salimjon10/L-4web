import { Task as TaskType } from "../types/Task";
import Task from "./Task";
import ZeroTasks from "./ZeroTasks";
import { useSelector, useDispatch } from "react-redux";
import { moveTask } from "../actions/taskActions";
import { JSX } from "react";
import { IRootState } from "../types/IRootState";

type Props = { setAlert: (alert: JSX.Element) => void };

function TaskList({ setAlert }: Props) {
  const tasks = useSelector((state: IRootState) => state.tasks);
  const dispatch = useDispatch();

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveTask(dragIndex, hoverIndex));
  };

  if (tasks.length === 0) {
    return <ZeroTasks />;
  } else {
    const taskListResult = tasks.map((task: TaskType, index: number) => (
      <Task
        key={`${task.title}-${index}-${task.bodyTask}`}
        index={index}
        moveCard={moveCard}
        setAlert={setAlert}
        task={task}
      />
    ));
    return <div className="task_section">{taskListResult}</div>;
  }
}

export default TaskList;