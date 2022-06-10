import { Card, Typography, CardContent, Modal, Box } from "@material-ui/core";
import React from "react";
import ModalComponent from "./modalComponent";

const TodoCard = ({ todo }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={"card-container"}>
      <Card onClick={handleOpen}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {todo.header}
          </Typography>
          <Typography variant="body2">{todo.description}</Typography>
        </CardContent>
      </Card>
      <ModalComponent
        open={open}
        todo={todo}
        handleClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ></ModalComponent>
    </div>
  );
};

export default TodoCard;