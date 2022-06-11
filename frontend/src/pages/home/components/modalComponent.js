import { Button, Modal, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import TaskDisplay from "./taskDisplay";

const ModalComponent = ({
  open,
  handleClose,
  todo: { id, header, description, todotask },
}) => {
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
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {id}.{header}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <TaskDisplay tasks={todotask}></TaskDisplay>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
