const prisma = require("../utils/primsa");

const saveTaskService = async (req) => {
  const { description, completed, inprogress } = req.body;
  const todoid = req.params.id;
  const newTask = await prisma.task.create({
    data: {
      description: description,
      completed: completed,
      inprogress: inprogress,
    },
  });
  await prisma.todotask.create({
    data: {
      todoid: parseInt(todoid),
      taskid: parseInt(newTask.id),
    },
  });
  return newTask;
};

const updateTaskService = async (req) => {
  const { completed, inprogress } = req.body;
  const updatedId = parseInt(req.params.id);
  const updatedTaskk = await prisma.task.update({
    where: {
      id: updatedId,
    },
    data: {
      completed: completed,
      inprogress: inprogress,
    },
  });
  return updatedTaskk;
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
