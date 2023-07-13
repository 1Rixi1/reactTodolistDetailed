import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { IconButton, TextField } from "@mui/material";

import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
  maxItemTitleLength: number;
};
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<boolean>(false);
  const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(false);
    }
    if (!isItemTitleLengthTooLong) {
      setTitle(e.currentTarget.value);
    }
  };

  const addItem = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      props.addItem(trimmedTitle);
    } else {
      setError(true);
    }
    setTitle("");
  };

  const isItemTitleLengthTooLong = title.length > props.maxItemTitleLength;
  const isAddItemBtnDisabled = !title || isItemTitleLengthTooLong;

  return (
    <div className={"add-form"}>
      <TextField
        size={"small"}
        variant={"outlined"}
        label={"add to text"}
        value={title}
        onChange={changeItemTitle}
        className={error ? "user-error" : undefined}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addItem();
          }
        }}
      />
      <IconButton disabled={isAddItemBtnDisabled} onClick={addItem}>
        <AddToPhotosRoundedIcon />
      </IconButton>

      <button disabled={!title} onClick={() => setTitle(title.slice(0, -1))}>
        <FontAwesomeIcon icon={faDeleteLeft} />
      </button>

      <IconButton onClick={() => setTitle("")} size={"small"}>
        <DeleteForeverRoundedIcon />
      </IconButton>

      {isItemTitleLengthTooLong && <div>Your ITEM - title is too long</div>}
      {error && (
        <div style={{ color: "red", fontWeight: "bold" }}>
          Please, enter correct title
        </div>
      )}
    </div>
  );
};
