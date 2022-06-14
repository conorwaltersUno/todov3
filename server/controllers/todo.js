const {
  getTodosService,
  getTodoByIdService,
  saveTodoService,
  updateTodoService,
  deleteTodoService,
} = require("../services/todo");
const okStatus = 200;
const serverErrorStatus = 500;

const getAllTodos = async (req, res) => {
  const todos = await getTodosService();
  if (todos && todos.length > 0) {
    return res.status(okStatus).json({
      todos,
    });
  }
  res.sendStatus(204);
};

const getTodoByID = async (req, res) => {
  const todo = await getTodoByIdService(req.params.id);
  if (!todo || todo.length === 0) return res.sendStatus(204);
  res.status(okStatus).json(todo);
};

const postTodo = async (req, res) => {
  const newTodo = await saveTodoService(req);
  if (!newTodo || newTodo.length === 0)
    return res.sendStatus(serverErrorStatus);
  res.status(okStatus).json({
    newTodo,
  });
};

const updateTodo = async (req, res) => {
  const updatedTodo = await updateTodoService(req);
  if (!updatedTodo || updatedTodo.length === 0) return res.sendStatus(400);
  res.status(okStatus).json({
    updatedTodo,
  });
};

const deleteTodo = async (req, res) => {
  const deletedTodo = await deleteTodoService(req.params.id);
  if (!deletedTodo || deletedTodo.length === 0) return res.sendStatus(500);

  res.status(okStatus).json({
    message: `Successfully deleted todo with id: ${req.params.id}`,
  });
};

module.exports = {
  getAllTodos,
  getTodoByID,
  postTodo,
  updateTodo,
  deleteTodo,
};
