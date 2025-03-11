import { useState, useRef, JSX } from "react";
import TaskButtons from "./TaskButtons";
import DeletAlert from "./DeletAlert";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../scripts/itemTypes";
import { useDispatch, useSelector } from "react-redux";
import { Task as TaskType } from "../types/Task";
import { IRootState } from "../types/IRootState";
import { getTaskPinnedLength, togglePinned } from "../actions/taskActions";

type Props = {
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  setAlert: (alert: JSX.Element) => void;
  task: TaskType;
};

export default function Task(props: Props) {
  const dispatch = useDispatch();
  const [buttonsVisible, setButtonsVisible] = useState<boolean>(false);
  const [pinned, setPinned] = useState<boolean>(props.task.pinned);
  const ref = useRef<HTMLDivElement>(null);

  const lastPinnedIndex = useSelector((state: IRootState) =>
    getTaskPinnedLength(state)
  );

  const [, drag] = useDrag(
    () => ({
      type: pinned ? ItemTypes.PINNED_TASK : ItemTypes.TASK,
      item: { index: props.index },
      canDrag: pinned ? false : true,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props.index, pinned]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      hover(item: { index: number; type: string; id: string }, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
          return;
        }

        if (hoverIndex < lastPinnedIndex) {
          return;
        }

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        props.moveCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    }),
    [props.index, props.moveCard]
  );

  drag(drop(ref));

  const openDelMenu = () => {
    props.setAlert(
      <DeletAlert setAlert={props.setAlert} index={props.index} />
    );
  };

  function switchPinned() {
    if (lastPinnedIndex >= 3 && !pinned) {
      alert("Достигнут лимит закрепленных задач!");
    } else {
      dispatch(togglePinned(props.index));
      setPinned(!pinned);
      location.reload();
    }
  }

  return (
    <div ref={ref}>
      <div className="task" style={pinned ? { borderColor: "red" } : {}}>
        <div
          className="text-container"
          onClick={() => setButtonsVisible(!buttonsVisible)}
        >
          <div className="title">{props.task.title}</div>
          <p className="about">{props.task.bodyTask}</p>
        </div>

        <button className="delete_button" onClick={switchPinned}>
          V
        </button>

        <button className="delete_button" onClick={openDelMenu}>
          X
        </button>
      </div>
      {buttonsVisible && (
        <TaskButtons setAlert={props.setAlert} index={props.index} />
      )}
    </div>
  );
}
