import React from "react";
import TodoCard from "./todoCard";

const TodoBacklog = ({ todo }) => {
  if (todo.status === "Backlog") {
    return <TodoCard todo={todo} />;
  } else {
    return null;
  }
};

export default TodoBacklog;
