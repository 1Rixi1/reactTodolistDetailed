import React, { Reducer, useReducer, useState } from "react";
import "../App.css";
import { TaskType, Todolist } from "../components/Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "../AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import { Menu } from "@mui/icons-material";
import {
  ActionsType,
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "../state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "../state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootReducersType } from "../store/store";
import { Todolist1 } from "../components/Todolist1";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const todolists = useSelector<RootReducersType, TodolistType[]>(
    (state) => state.todolists
  );

  const dispatch = useDispatch();

  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId));
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(id, isDone, todolistId));
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatch(changeTaskTitleAC(id, newTitle, todolistId));
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(changeTodolistFilterAC(todolistId, value));
  }

  function removeTodolist(id: string) {
    const action = removeTodolistAC(id);

    dispatch(action);
  }

  function changeTodolistTitle(id: string, title: string) {
    dispatch(changeTodolistTitleAC(id, title));
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);

    dispatch(action);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            return (
              <Grid key={tl.id} item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist1 id={tl.id} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;