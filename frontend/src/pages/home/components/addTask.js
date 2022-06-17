import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";
import instance from "../../../utils/axios";
import baseUrl from "../../../utils/baseUrl";

const AddTask = ({ todoId, todoTask, setTodoTask }) => {
  const initialState = {
    description: "",
  };
  const [formState, setFormState] = useState(initialState);
  const [isLoading, setisLoading] = useState(false);
  const resetFormState = () => setFormState({ ...initialState });
  const onChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    const newFormState = {
      ...formState,
      [id]: value,
    };

    setFormState(newFormState);
  };

  const mutation = useMutation((newTask) => {
    return instance.post(`/task/${todoId}`, newTask);
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const newTask = await instance.post(baseUrl + `/task/${todoId}`, {
      description: formState.description,
      completed: false,
    });
    todoTask.push(newTask.data);
    console.log(todoTask);
    setisLoading(false);
    resetFormState();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="add-modal-container">
        <h3>Add a new task</h3>
        <TextField
          id="description"
          label="Description"
          type="text"
          inputProps={{
            minLength: 5,
            maxLength: 160,
          }}
          sx={{ mt: 1 }}
          fullWidth
          required
          onChange={onChange}
          value={formState.description}
        />

        <LoadingButton
          style={{ marginTop: "25px" }}
          variant="contained"
          fullWidth
          type="submit"
          loading={isLoading}
        >
          Save
        </LoadingButton>
        {todoTask.length > 0 ? (
          todoTask.map((task, index) => {
            return (
              <div key={index}>
                <div className="task-single-container">
                  {task.task.id}.{task.task.description}
                  {task.task.completed ? (
                    <div>Completed</div>
                  ) : (
                    <div>Not completed</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>No tasks's for this todo </div>
        )}
      </div>
    </form>
  );
};

export default AddTask;
