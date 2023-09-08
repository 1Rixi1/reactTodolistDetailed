import { Meta, StoryObj } from "@storybook/react";
import { AddItemForm, AddItemFormPropsType } from "../../AddItemForm";

import { action } from "@storybook/addon-actions";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import { IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { Task } from "../../Task";
import { TaskType } from "../../Todolist";

const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,

  tags: ["autodocs"],

  args: {
    changeTaskStatus: action("changeTaskStatus"),
    changeTaskTitle: action("changeTaskTitle"),
    removeTask: action("removeTask"),
    task: { id: "12qawe", title: "JS", isDone: true },
    todolistId: "123456",
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStories: Story = {};

export const TaskIsNotDoneStories: Story = {
  args: {
    task: { id: "15tutu", title: "JS", isDone: false },
  },
};

export const TaskPresentation = () => {
  const [task, setTask] = useState({
    id: "12qawe",
    title: "CSS",
    isDone: false,
  });

  return (
    <Task
      task={task}
      changeTaskStatus={() => {
        setTask({ ...task, isDone: !task.isDone });
      }}
      removeTask={action("removeTask")}
      changeTaskTitle={(_, title) => {
        setTask({ ...task, title: title });
      }}
      todolistId={"12qweqwe"}
    />
  );
};


