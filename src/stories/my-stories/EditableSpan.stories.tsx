import { Meta, StoryObj } from "@storybook/react";
import { AddItemForm, AddItemFormPropsType } from "../../AddItemForm";

import { action } from "@storybook/addon-actions";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import { IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { TaskType } from "../../Todolist";
import { EditableSpan, EditableSpanPropsType } from "../../EditableSpan";

const meta: Meta<typeof EditableSpan> = {
  title: "TODOLISTS/EditableSpan",
  component: EditableSpan,

  tags: ["autodocs"],

  argTypes: {
    onChange: {
      action: "clicked",
      description: "Value EditableSpan onChange",
    },
    value: {
      description: "Start value",
    },
  },

  args: {
    value: "React!!!!YOYOYO",
  },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStories: Story = {};

