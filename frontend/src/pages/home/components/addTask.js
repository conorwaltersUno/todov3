import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "react-query";
import instance from "../../../utils/axios";

const AddTask = ({ todoId }) => {
  const initialState = {
    description: "",
  };
  const [formState, setFormState] = useState(initialState);
  const [isLoading, setisLoading] = useState(false);
  const resetFormState = () => setFormState({ ...initialState });
  const queryClient = useQueryClient();
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
    mutation.mutate(
      {
        description: formState.description,
        completed: false,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("todoData");
          queryClient.refetchQueries("todoData");
          setisLoading(true);
          alert("Successfully added todo");
        },
      },
      {
        isError: () => {
          setisLoading(false);
          alert(mutation.error);
        },
      }
    );
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
        {mutation.error && (
          <h5 onClick={() => mutation.reset()}>{mutation.error}</h5>
        )}

        <LoadingButton
          style={{ marginTop: "25px" }}
          variant="contained"
          fullWidth
          type="submit"
          loading={isLoading}
        >
          Save
        </LoadingButton>
      </div>
    </form>
  );
};

export default AddTask;
