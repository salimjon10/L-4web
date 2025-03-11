import { JSX, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../actions/taskActions";
import { IRootState } from "../types/IRootState";

type Props = { setAlert: (alert: JSX.Element) => void; index: number };

export default function EditTask(props: Props) {
  const dispatch = useDispatch();
  const task = useSelector((state: IRootState) => state.tasks[props.index]);

  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputBodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputTitleRef.current?.focus();
  }, []);

  function closeAlert() {
    props.setAlert(<></>);
  }

  function handleEditTask() {
    const title = inputTitleRef.current!.value.trim();
    const body = inputBodyRef.current!.value.trim();

    if (title !== "" && body !== "") {
      dispatch(editTask(props.index, title, body));
      props.setAlert(<></>);
    }
  }

  return (
    <div className="modal hidden">
      <div className="edit_modal_content">
        <div className="text_container">
          <input
            ref={inputTitleRef}
            id="edit_input_title_task"
            className="input mini_input mb-12"
            type="text"
            placeholder="Title..."
            defaultValue={task?.title || ""}
          />
          <textarea
            ref={inputBodyRef}
            id="edit_input_body_task"
            className="textarea max_input"
            placeholder="About..."
            defaultValue={task?.bodyTask || ""}
          ></textarea>
        </div>

        <div className="edit_modal_buttons">
          <button id="edit_button_cancel" className="cancel_button" onClick={closeAlert}>
            Cancel
          </button>
          <button id="edit_button_save" className="save_button" onClick={handleEditTask}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
