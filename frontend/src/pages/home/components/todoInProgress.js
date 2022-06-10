import React from "react";
import TodoCard from "./todoCard";

const TodoInProgress = ({ todo }) => {
  if (todo.status === "In Progress") {
    return <TodoCard todo={todo} />;
  } else {
    return null;
  }
};

export default TodoInProgress;
