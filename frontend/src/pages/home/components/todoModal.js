import { Modal, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import AddTask from "./addTask";
import TaskDisplay from "./taskDisplay";
import Fade from "@mui/material/Fade";

const TodoModal = ({
  open,
  handleClose,
  todo: { id, header, description, todotask },
}) => {
  const style = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    marginTop: "140px",
    width: "70%",
    bgcolor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {id}.{header}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
            <AddTask todoId={id}></AddTask>
            <TaskDisplay tasks={todotask}></TaskDisplay>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TodoModal;
