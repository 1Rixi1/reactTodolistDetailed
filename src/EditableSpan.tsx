import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";

type EditableSpanPropsType = {
  title: string;
  isDone?: boolean;
  onChangeTitle: (title: string) => void;
};
export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
  const [editMode, setEditMode] = React.useState(false);

  const [title, setTitle] = React.useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.onChangeTitle(title);
  };

  const omChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  return editMode ? (
    <TextField
      size={"small"}
      variant={"standard"}
      onBlur={activateViewMode}
      value={title}
      onChange={omChangeInputHandler}
      autoFocus
    />
  ) : (
    <span
      onDoubleClick={activateEditMode}
      className={props.isDone ? "task-done" : "task"}
    >
      -- {props.title} --
    </span>
  );
};
