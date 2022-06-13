import { Card, Typography, CardContent, Button } from "@material-ui/core";
import React, { useState } from "react";
import TodoModal from "./todoModal";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "react-query";
import instance from "../../../utils/axios";

const TodoCard = ({ todo }) => {
  const [open, setOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(() => {
    return instance.delete(`/todo/${todo.id}`);
  });

  const deleteTodoOnClick = async (e) => {
    e.preventDefault();
    mutation.mutate(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries("todoData");
          queryClient.refetchQueries("todoData");
          alert("Successfully deleted todo");
        },
      },
      {
        isError: () => {
          alert(mutation.error);
        },
      }
    );
  };

  return (
    <div className={"card-container"}>
      <Card
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        <CardContent
          style={{ backgroundColor: showDelete ? "#FFF" : "#9fafca" }}
        >
          <div style={{ display: "flex", justifyContent: "end" }}>
            {showDelete && (
              <Button onClick={deleteTodoOnClick}>
                <CloseIcon></CloseIcon>
              </Button>
            )}
          </div>
          <div
            onClick={handleOpen}
            style={{
              display: "flex",
              justifyContent: "center",

              flexFlow: "column",
              marginTop: showDelete ? "-30px" : "0px",
            }}
          >
            <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
              {todo.header}
            </Typography>
            <Typography variant="body2">{todo.description}</Typography>
          </div>
        </CardContent>
      </Card>
      <TodoModal
        open={open}
        setOpen={setOpen}
        todo={todo}
        handleClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ></TodoModal>
    </div>
  );
};

export default TodoCard;
