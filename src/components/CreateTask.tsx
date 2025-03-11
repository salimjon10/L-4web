import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../actions/taskActions";

export default function CreateTask() {
  const dispatch = useDispatch();

  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputBodyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputTitleRef.current?.focus();
  }, []);

  function handleAddTask() {
    const title = inputTitleRef.current!.value.trim();
    const body = inputBodyRef.current!.value.trim();

    if (title !== "" && body !== "") {
      dispatch(addTask(title, body));
      inputTitleRef.current!.value = "";
      inputBodyRef.current!.value = "";
    }
  }

  return (
    <div className="header">
      <div className="text_container">
        <input
          ref={inputTitleRef}
          id="title_tasks_input"
          className="input title"
          type="text"
          placeholder="Title..."
        />
        <input
          ref={inputBodyRef}
          id="body_tasks_input"
          className="input about"
          type="text"
          placeholder="About..."
        />
      </div>
      <button className="add_button" onClick={handleAddTask}>
        +
      </button>
    </div>
  );
}
