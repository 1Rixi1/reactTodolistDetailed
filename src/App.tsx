import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [keyId: string]: TaskType[];
};

function App(): JSX.Element {
  //BLL:

  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todoList, setTodoList] = useState<TodoListType[]>([
    { id: todoListId_1, title: "What to learn", filter: "all" },
    { id: todoListId_2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId_1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS/TS", isDone: false },
    ],
    [todoListId_2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Water", isDone: true },
      { id: v1(), title: "Juice", isDone: false },
    ],
  });

  const changeTodoListFilter = (
    nextFilterValue: FilterValuesType,
    todoListId: string
  ) => {
    setTodoList(
      todoList.map((tl) =>
        tl.id === todoListId ? { ...tl, filter: nextFilterValue } : tl
      )
    );
  };

  const removeTask = (taskId: string, todoListId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId),
    });
  };

  const removeTodoList = (todoListId: string) => {
    setTodoList(todoList.filter((tl) => tl.id !== todoListId));
  };

  const addTask = (title: string, todoListId: string) => {
    const newTask = {
      id: v1(),
      title,
      isDone: false,
    };

    setTasks({ ...tasks, [todoListId]: [...tasks[todoListId], newTask] });
  };

  const addTodoList = (title: string) => {
    const totoListId = v1();
    const newTodoList = {
      id: totoListId,
      title,
      filter: "all" as FilterValuesType,
    };
    setTodoList([...todoList, newTodoList]);

    setTasks({ ...tasks, [totoListId]: [] });
  };

  const changeTaskStatus = (
    taskId: string,
    newIsDoneValue: boolean,
    todoListId: string
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === taskId ? { ...t, isDone: newIsDoneValue } : t
      ),
    });
  };

  const onChangeTaskTitle = (
    title: string,
    taskId: string,
    todoListId: string
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === taskId ? { ...t, title } : t
      ),
    });
  };

  const onChangeTodoListTitle = (title: string, todoListId: string) => {
    setTodoList(
      todoList.map((tl) => (tl.id === todoListId ? { ...tl, title } : tl))
    );
  };

  const maxItemTitleLength = 10;

  //UI

  const getFilteredTasks = (
    allTasks: Array<TaskType>,
    currentFilterValue: FilterValuesType
  ): Array<TaskType> => {
    switch (currentFilterValue) {
      case "completed":
        return allTasks.filter((t) => t.isDone);
      case "active":
        return allTasks.filter((t) => !t.isDone);
      default:
        return allTasks;
    }
  };

  const todoListComponents: Array<JSX.Element> = todoList.map((tl) => {
    const filteredTasks: Array<TaskType> = getFilteredTasks(
      tasks[tl.id],
      tl.filter
    );

    return (
      <TodoList
        key={tl.id}
        todoListId={tl.id}
        title={tl.title}
        filter={tl.filter}
        tasks={filteredTasks}
        addTask={addTask}
        removeTask={removeTask}
        removeTodoList={removeTodoList}
        changeFilter={changeTodoListFilter}
        changeTaskStatus={changeTaskStatus}
        onChangeTaskTitle={onChangeTaskTitle}
        onChangeTodoListTitle={onChangeTodoListTitle}
      />
    );
  });

  return (
    <>
      <AddItemForm
        addItem={addTodoList}
        maxItemTitleLength={maxItemTitleLength}
      />
      <div className="App">{todoListComponents}</div>
    </>
  );
}

export default App;
