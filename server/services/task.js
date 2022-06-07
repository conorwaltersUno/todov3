const prisma = require("../utils/primsa");

const saveTaskService = async (req) => {
  const { description, completed } = req.body;
  const newTask = await prisma.task.create({
    data: {
      description: description,
      completed: completed,
    },
  });
  return newTask;
};

const updateTaskService = async (req) => {
  const { description, completed } = req.body;
  const updatedId = parseInt(req.params.id);
  const updatedTask = await prisma.task.update({
    where: {
      id: updatedId,
    },
    data: {
      description: description,
      completed: completed,
    },
  });
  return updatedTask;
};

const deleteTaskService = async (id) => {
  try {
    await prisma.todotask.deleteMany({
      where: {
        taskid: parseInt(id),
      },
    });
    const deletedTask = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
    return deletedTask;
  } catch (e) {
    console.log(e);
  }
};

exports.saveTaskService = saveTaskService;
exports.updateTaskService = updateTaskService;
exports.deleteTaskService = deleteTaskService;
