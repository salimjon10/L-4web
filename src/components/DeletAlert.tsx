import { useDispatch } from "react-redux";
import { deleteTask } from "../actions/taskActions";
import { JSX } from "react";

type Props = { setAlert: (alert: JSX.Element) => void; index: number };

export default function DeletAlert(props: Props) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteTask(props.index));
    props.setAlert(<></>);
  }

  function closeAlert() {
    props.setAlert(<></>);
  }

  return (
    <div className="modal hidden">
      <div className="modal_content">
        Delete this task?
        <div className="modal_buttons">
          <button id="choice_button_yes" className="confirm_button" onClick={handleDelete}>
            Yes
          </button>
          <button id="choice_button_no" className="cancel_button" onClick={closeAlert}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
