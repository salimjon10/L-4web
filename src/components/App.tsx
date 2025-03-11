import CreateTask from "./CreateTask";
import TaskList from "./TastList";
import store from "../scripts/store";
import { JSX, useState } from "react";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [alert, setAlert] = useState<JSX.Element>();

  return (
    <div className="container">
      <Provider store={store}>
        {alert}
        <CreateTask />
        <DndProvider backend={HTML5Backend}>
          <TaskList setAlert={setAlert} />
        </DndProvider>
      </Provider>
    </div>
  );
}

export default App;
