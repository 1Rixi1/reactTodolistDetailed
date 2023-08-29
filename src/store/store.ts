import { combineReducers, legacy_createStore } from "redux";
import { todolistsReducer } from "../state/todolists-reducer";
import { tasksReducer } from "../state/tasks-reducer";

const rootReducers = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

export type RootReducersType = ReturnType<typeof rootReducers>;

export const store = legacy_createStore(rootReducers);
