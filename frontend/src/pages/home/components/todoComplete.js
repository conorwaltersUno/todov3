import TodoCard from "./todoCard";
import Boop from "../../../utils/boop";

const TodoComplete = ({ todo }) => {
  if (todo.status === "Complete") {
    return (
      <Boop rotation={5} timing={200}>
        <TodoCard todo={todo} />
      </Boop>
    );
  } else {
    return null;
  }
};

export default TodoComplete;
