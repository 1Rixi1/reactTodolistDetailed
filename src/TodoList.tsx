import React, { ChangeEvent, FC } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {CheckBox} from "@mui/icons-material";

type TodoListPropsType = {
  todoListId: string;
  title: string;
  filter: FilterValuesType;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeFilter: (nextFilterValue: FilterValuesType, todoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    newIsDoneValue: boolean,
    todoListId: string
  ) => void;
  onChangeTaskTitle: (title: string, id: string, todoListId: string) => void;
  onChangeTodoListTitle: (title: string, todoListId: string) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
const TodoList: FC<TodoListPropsType> = (props) => {
  const addTask = (title: string) => props.addTask(title, props.todoListId);

  const onChangeTodoListTitle = (title: string) => {
    props.onChangeTodoListTitle(title, props.todoListId);
  };

  const maxItemTitleLength = 15;

  const tasksList =
    props.tasks.length === 0 ? (
      <p>TodoList is empty</p>
    ) : (
      <ul className={"tasks-list"}>
        {props.tasks.map((task) => {
          const removeTask = () => props.removeTask(task.id, props.todoListId);
          const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(
              task.id,
              e.currentTarget.checked,
              props.todoListId
            );

          const onChangeTaskTitle = (title: string) => {
            props.onChangeTaskTitle(title, task.id, props.todoListId);
          };

          return (
            <li key={task.id} className={"tasks-list-item"}>
              <div>
                <Checkbox
                  checked={task.isDone}
                  onChange={changeTaskStatus}
                />
                <EditableSpan
                  title={task.title}
                  isDone={task.isDone}
                  onChangeTitle={onChangeTaskTitle}
                />
              </div>
              <IconButton onClick={removeTask} size={"small"}>
                <DeleteForeverRoundedIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>
    );

  return (
    <div className="todoList">
      <h3 className={"todolist-header"}>
        <EditableSpan
          title={props.title}
          onChangeTitle={onChangeTodoListTitle}
        />

        <IconButton
          onClick={() => props.removeTodoList(props.todoListId)}
          size={"small"}
        >
          <DeleteForeverRoundedIcon />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTask} maxItemTitleLength={maxItemTitleLength} />

      {tasksList}
      <div className={"buttons-block"}>
        <Button
          size={"small"}
          variant={"contained"}
          color={props.filter === "all" ? "secondary" : "primary"}
          onClick={() => props.changeFilter("all", props.todoListId)}
        >
          All
        </Button>
        <Button
          size={"small"}
          variant={"contained"}
          color={props.filter === "active" ? "secondary" : "primary"}
          onClick={() => props.changeFilter("active", props.todoListId)}
        >
          Active
        </Button>
        <Button
          size={"small"}
          variant={"contained"}
          color={props.filter === "completed" ? "secondary" : "primary"}
          onClick={() => props.changeFilter("completed", props.todoListId)}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

export default TodoList;
