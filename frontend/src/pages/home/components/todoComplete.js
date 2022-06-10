import React from "react";
import TodoCard from "./todoCard";

const TodoComplete = ({ todo }) => {
  if (todo.status === "Complete") {
    return <TodoCard todo={todo} />;
  } else {
    return null;
  }
};

export default TodoComplete;
