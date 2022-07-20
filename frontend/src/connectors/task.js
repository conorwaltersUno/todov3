import instance from "../utils/axios";

export async function postTask(description, todoId) {
  try {
    const res = await instance.post(`http://localhost:3010/task/${todoId}`, {
      completed: false,
      description: description,
    });
    if (res.status !== 200) console.log(res);
    const status = res.status;
    const id = res.data.newTask.id;
    return await { status, id };
  } catch (error) {
    console.log(error);
  }
}

export async function updateTask(status, taskId) {
  try {
    if (status === "inprogress") {
      const res = await instance.put(`http://localhost:3010/task/${taskId}`, {
        completed: false,
        inprogress: true,
      });
      if (res.status !== 200) {
        console.log(res);
      }
      const status = res.status;
      const updatedTask = res.data.updatedTask;
      return await { status, updatedTask };
    }

    if (status === "completed") {
      const res = await instance.put(`http://localhost:3010/task/${taskId}`, {
        completed: true,
        inprogress: false,
      });
      if (res.status !== 200) {
        console.log(res);
      }
      const status = res.status;
      const updatedTask = res.data.updatedTask;
      return await { status, updatedTask };
    }
    if (status === "not started") {
      const res = await instance.put(`http://localhost:3010/task/${taskId}`, {
        completed: false,
        inprogress: false,
      });
      if (res.status !== 200) {
        console.log(res);
      }
      const status = res.status;
      const updatedTask = res.data.updatedTask;
      return await { status, updatedTask };
    }
  } catch (error) {
    console.log(error);
  }
}
