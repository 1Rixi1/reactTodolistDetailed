import { Meta, StoryObj } from "@storybook/react";
import { AddItemForm, AddItemFormPropsType } from "../../AddItemForm";

import { action } from "@storybook/addon-actions";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import { IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { TaskType } from "../../Todolist";
import AppWithRedux from "../../AppWithRedux";
import { Provider } from "react-redux";
import { AppRootStateType, store } from "../../state/store";
import { ReduxStoreProviderDecorator } from "./ReduxStoreProviderDecorator";
import { combineReducers, createStore } from "redux";
import { tasksReducer } from "../../state/tasks-reducer";
import { todolistsReducer } from "../../state/todolists-reducer";
import { v1 } from "uuid";

const meta: Meta<typeof AppWithRedux> = {
  title: "TODOLISTS/AppWithRedux",
  component: AppWithRedux,

  tags: ["autodocs"],

  decorators: [ReduxStoreProviderDecorator],
};



export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStories: Story = {
  render: () => <AppWithRedux />,
};
