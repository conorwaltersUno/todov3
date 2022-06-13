import React from "react";
import Boop from "../../../utils/boop";
import TodoCard from "./todoCard";

const TodoInProgress = ({ todo }) => {
  if (todo.status === "In Progress") {
    return (
      <Boop rotation={5} timing={200}>
        <TodoCard todo={todo} />
      </Boop>
    );
  } else {
    return null;
  }
};

export default TodoInProgress;
