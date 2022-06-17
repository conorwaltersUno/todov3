const {
  saveTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/task");
const okStatus = 200;
const serverErrorStatus = 500;

const postTask = async (req, res) => {
  const task = await saveTaskService(req);
  if (!task || task.length === 0) return res.sendStatus(serverErrorStatus);
  res.status(okStatus).json({
    task,
  });
};

const updateTask = async (req, res) => {
  const updatedTask = await updateTaskService(req);
  if (!updatedTask || updatedTask.length === 0) return res.sendStatus(400);
  res.status(okStatus).json({
    updatedTask,
  });
};

const deleteTask = async (req, res) => {
  const deletedBoat = await deleteTaskService(req.params.id);
  if (!deletedBoat || deletedBoat.length === 0) return res.sendStatus(500);

  res.status(okStatus).json({
    message: `Successfully deleted task with id: ${req.params.id}`,
  });
};

module.exports = {
  postTask,
  updateTask,
  deleteTask,
};
