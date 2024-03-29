import { Modal, Paper, styled, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import AddTask from "./addTask";
import Fade from "@mui/material/Fade";
import instance from "../../../utils/axios";
import baseUrl from "../../../utils/baseUrl";
import Loading from "../../../components/loading";
import { useQueryClient } from "react-query";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import useWindowDimensions from "../../../hooks/useWindownDimensions";
const TodoModal = ({ open, setOpen, handleOpen, todo: { id } }) => {
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
    queryClient.refetchQueries("todoData");
  };
  const [todo, settodo] = useState({});
  const [todoTask, setTodoTask] = useState([]);
  const { height, width } = useWindowDimensions();

  useEffect(async () => {
    const data = await instance.get(`todo/${id}`);
    settodo(data.data);
    setTodoTask(data.data.todotask);
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#E3D8F1",
    minHeight: "100px",
    ...theme.typography.body2,
    padding: theme.spacing(1),
  }));

  const style = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    marginTop:
      width <= 600 ? "45%" : width > 600 && width < 1000 ? "30%" : "15%",
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
              <Typography id="modal-modal-title" variant="h4" component="h2">
                {todo.header}
              </Typography>
            ) : (
              <div>
                <Loading></Loading>
              </div>
            )}
            {todo.description ? (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Typography
                  variant="h6"
                  component="h2"
                  style={{
                    marginTop: "20px",
                    marginRight: "3px",
                    display: "flex",
                    flexflow: "row",
                    alignItems: "center",
                  }}
                >
                  <DescriptionOutlinedIcon></DescriptionOutlinedIcon>
                  Description
                </Typography>
                <Item>{todo.description}</Item>
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
