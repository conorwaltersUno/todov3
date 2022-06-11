import { Modal, TextField } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { postTodo } from "../../../connectors/todo";

const AddTodoModal = ({ open, handleClose }) => {
  const initialState = {
    header: "",
    description: "",
  };
  const [formState, setFormState] = useState(initialState);
  const [isLoading, setisLoading] = useState(false);
  const queryClient = useQueryClient();
  const style = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const resetFormState = () => setFormState({ ...initialState });

  const onDialogClose = () => {
    handleClose();
    resetFormState();
  };

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
    const status = await postTodo(formState);
    if (status == 200) {
      queryClient.refetchQueries("todoData");
      setisLoading(false);
      handleClose();
      resetFormState();
    } else {
      setisLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={onSubmit}>
            <TextField
              id="header"
              label="Title"
              type="text"
              inputProps={{
                minLength: 5,
                maxLength: 160,
              }}
              sx={{ mt: 1 }}
              fullWidth
              required
              onChange={onChange}
              value={formState.header}
            />
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
              variant="contained"
              fullWidth
              type="submit"
              loading={isLoading}
            >
              Save
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTodoModal;
