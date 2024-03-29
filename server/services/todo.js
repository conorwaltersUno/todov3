const prisma = require("../utils/primsa");

const getTodosService = async () => {
  const todos = await prisma.todo.findMany({
    include: {
      todotask: {
        select: {
          task: {
            select: {
              id: true,
              description: true,
              completed: true,
              inprogress: true,
            },
          },
        },
      },
    },
  });
  todos.map((todo) => {
    let todoLength = todo.todotask.length;
    let todoCompleted = 0;
    let anyTaskInProgress = false;
    let status = "";
    todo.todotask.map((tdt) => {
      if (tdt.task.completed) {
        todoCompleted++;
      }
      if (tdt.task.inprogress) {
        anyTaskInProgress = true;
      }
    });
    if (todoCompleted === todoLength && todoLength > 0 && !anyTaskInProgress) {
      status = "Complete";
    } else if (
      (todoCompleted != todoLength && todoCompleted > 0) ||
      anyTaskInProgress
    ) {
      status = "In Progress";
    } else {
      status = "Backlog";
    }
    todo.status = status;
  });
  return todos;
};

const getTodoByIdService = async (id) => {
  return await prisma.todo.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      todotask: {
        select: {
          task: {
            select: {
              id: true,
              description: true,
              completed: true,
              inprogress: true,
            },
          },
        },
      },
    },
  });
};

const saveTodoService = async (req) => {
  const { header, description } = req.body;
  const createdOn = new Date().toISOString();
  const newTodo = await prisma.todo.create({
    data: {
      header: header,
      description: description,
      createdon: createdOn,
    },
  });
  return newTodo;
};

const updateTodoService = async (req) => {
  const { header, description } = req.body;
  const updatedId = parseInt(req.params.id);
  const updatedAt = new Date().toISOString();
  const updatedTodo = await prisma.todo.update({
    where: {
      id: updatedId,
    },
    data: {
      header: header,
      description: description,
      updatedat: updatedAt,
    },
  });
  return updatedTodo;
};

const deleteTodoService = async (id) => {
  try {
    await prisma.todotask.deleteMany({
      where: {
        todoid: parseInt(id),
      },
    });
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: parseInt(id),
      },
    });
    return deletedTodo;
  } catch (e) {
    console.log(e);
  }
};

exports.getTodosService = getTodosService;
exports.getTodoByIdService = getTodoByIdService;
exports.saveTodoService = saveTodoService;
exports.updateTodoService = updateTodoService;
exports.deleteTodoService = deleteTodoService;
