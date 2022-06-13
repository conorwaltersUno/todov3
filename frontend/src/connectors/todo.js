import instance from "../utils/axios";

export async function postTodo({ header, description }) {
  try {
    const res = await instance.post(`http://localhost:3010/todo/`, {
      header: header,
      description: description,
    });
    if (res.status !== 200) console.log(res);
    return await res.status;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodo(id) {
  try {
    const res = await instance.delete(`http://localhost:3010/todo/${id}`);
    if (res.status !== 200) console.log(res);
    return await res.status;
  } catch (error) {
    console.log(error);
  }
}
