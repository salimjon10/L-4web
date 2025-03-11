import { createStore } from "redux";
import rootReducer from "../reducers";
import { getTaskList } from "./taskStorageController";

const persistedState = getTaskList() || [];

const store = createStore(rootReducer, { tasks: persistedState });

export default store;