import { JSX } from "react";
import editIcon from "../assets/images/edit.svg";
import shareIcon from "../assets/images/share.svg";
import EditTask from "./EditTask";
import ShareTask from "./ShareTask";

type Props = { setAlert: (alert: JSX.Element) => void; index: number };

export default function TaskButtons(props: Props) {
  function showEditMenu() {
    props.setAlert(<EditTask setAlert={props.setAlert} index={props.index} />);
  }

  function showShareMenu() {
    props.setAlert(<ShareTask setAlert={props.setAlert} />);
  }

  return (
    <div className="button_container">
      <button
        id="editButton"
        onClick={showEditMenu}
      >
        <img src={editIcon} alt="" />
      </button>

      <button className="action_button">i</button>

      <button
        id="shareButton"
        onClick={showShareMenu}
      >
        <img src={shareIcon} alt="" />
      </button>
    </div>
  );
}