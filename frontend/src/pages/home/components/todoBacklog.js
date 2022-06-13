import React from "react";
import TodoCard from "./todoCard";
import Boop from "../../../utils/boop";
const TodoBacklog = ({ todo }) => {
  if (todo.status === "Backlog") {
    return (
      <Boop rotation={5} timing={200}>
        <TodoCard todo={todo} />
      </Boop>
    );
  } else {
    return null;
  }
};

export default TodoBacklog;
