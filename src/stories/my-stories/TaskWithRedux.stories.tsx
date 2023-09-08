import { Meta, StoryObj } from "@storybook/react";
import { AddItemForm, AddItemFormPropsType } from "../../AddItemForm";

import { action } from "@storybook/addon-actions";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import { IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { TaskType } from "../../Todolist";
import AppWithRedux from "../../AppWithRedux";
import { Provider, useSelector } from "react-redux";
import { AppRootStateType, store } from "../../state/store";
import {
  initialGlobalState,
  ReduxStoreProviderDecorator,
} from "./ReduxStoreProviderDecorator";
import { combineReducers, createStore } from "redux";
import { tasksReducer } from "../../state/tasks-reducer";
import { todolistsReducer } from "../../state/todolists-reducer";
import { v1 } from "uuid";
import { TaskWithRedux } from "../../TaskWithRedux";

const meta: Meta<typeof TaskWithRedux> = {
  title: "TODOLISTS/TaskWithRedux",
  component: TaskWithRedux,

  tags: ["autodocs"],

  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

const TaskWithReduxPresent = () => {
  let task = useSelector<AppRootStateType, TaskType>(
    (state) => state.tasks["todolistId1"][0]
  );

  if (!task) {
    task = { id: "asas", title: "Default", isDone: false };
  }

  return <TaskWithRedux task={task} todolistId={"todolistId1"} />;
};

export const TaskWithReduxStory: Story = {
  render: () => <TaskWithReduxPresent />,
};
