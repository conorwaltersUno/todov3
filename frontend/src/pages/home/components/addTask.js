import React, { useState } from "react";

import { TextField } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";

import { postTask } from "../../../connectors/task";
import { successMessage } from "../../../utils/messages";

const AddTask = ({ todoId }) => {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const { status } = await postTask(formState.description, todoId);
    if (status === 200) {
      resetFormState();
      setisLoading(false);
      successMessage("Successfully added new task!");
    } else {
      setisLoading(false);
    }
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
      </div>
    </form>
  );
};

export default AddTask;
