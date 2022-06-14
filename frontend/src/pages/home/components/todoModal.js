import { Modal, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AddTask from "./addTask";
import Fade from "@mui/material/Fade";

const TodoModal = ({
  open,
  setOpen,
  todo: { id, description, header, todotask },
}) => {
  const [todoTaskState, setTodotask] = useState(todotask);
  const handleClose = () => setOpen(false);

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
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
            ></Typography>
            {id}. {header}
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
            <AddTask
              todoId={id}
              setOpen={setOpen}
              tasks={todoTaskState}
              setTodotask={setTodotask}
            ></AddTask>
            {todoTaskState.map((task, index) => {
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
            })}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TodoModal;
