import { Modal, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AddTask from "./addTask";
import Fade from "@mui/material/Fade";
import instance from "../../../utils/axios";
import baseUrl from "../../../utils/baseUrl";
import Loading from "../../../components/loading";

const TodoModal = ({ open, setOpen, handleOpen, todo: { id } }) => {
  const handleClose = () => setOpen(false);
  const [todo, settodo] = useState({});
  const [todoTask, setTodoTask] = useState([]);

  useEffect(async () => {
    const data = await instance.get(baseUrl + `/todo/${id}`);
    console.log(data.data);
    settodo(data.data);
    setTodoTask(data.data.todotask);
  }, []);

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
            {todo.id && todo.header ? (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {todo.id}. {todo.header}
              </Typography>
            ) : (
              <div>
                <Loading></Loading>
              </div>
            )}
            {todo.description ? (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {todo.description}
              </Typography>
            ) : (
              <div>
                <Loading></Loading>
              </div>
            )}

            <AddTask
              todoId={id}
              handleOpen={handleOpen}
              todoTask={todoTask}
              setTodoTask={setTodoTask}
            ></AddTask>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TodoModal;
