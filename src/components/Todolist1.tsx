import React, { ChangeEvent } from "react";
import { FilterValuesType } from "../Apps/App";
import { AddItemForm } from "../AddItemForm";
import { EditableSpan } from "../EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootReducersType } from "../store/store";
import { TodolistType } from "../Apps/AppWithRedux";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../state/tasks-reducer";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "../state/todolists-reducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
};

export function Todolist1(props: PropsType) {
  const dispatch = useDispatch();

  const todolist = useSelector<RootReducersType, TodolistType>(
    (state) => state.todolists.find((tl) => tl.id === props.id) as TodolistType
  );

  const { id, filter, title } = todolist;

  const tasks = useSelector<RootReducersType, TaskType[]>(
    (state) => state.tasks[id]
  );

  let tasksFiltered: TaskType[] = [...tasks];

  switch (filter) {
    case "active": {
      tasksFiltered = tasks.filter((t) => !t.isDone);
      break;
    }

    case "completed": {
      tasksFiltered = tasks.filter((t) => t.isDone);
      break;
    }
  }

  const addTask = (title: string) => {
    dispatch(addTaskAC(title, id));
  };

  const removeTodolist = () => {
    dispatch(removeTodolistAC(id));
  };
  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC(id, title));
  };

  const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, "all"));
  const onActiveClickHandler = () =>
    dispatch(changeTodolistFilterAC(id, "active"));
  const onCompletedClickHandler = () => {
    dispatch(changeTodolistFilterAC(id, "completed"));
  };

  return (
    <div>
      <h3>
        {" "}
        <EditableSpan value={title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {tasksFiltered.map((t) => {
          const onClickHandler = () => dispatch(removeTaskAC(t.id, id));
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, id));
          };
          const onTitleChangeHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(t.id, newValue, id));
          };

          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox
                checked={t.isDone}
                color="primary"
                onChange={onChangeHandler}
              />

              <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
              <IconButton onClick={onClickHandler}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          variant={filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
