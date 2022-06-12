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
