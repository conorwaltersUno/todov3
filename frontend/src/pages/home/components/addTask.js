import React, { useState } from "react";
import { makeStyles, Paper, styled, TextField } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import instance from "../../../utils/axios";
import baseUrl from "../../../utils/baseUrl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

const AddTask = ({ todoId, todoTask }) => {
  const initialState = {
    description: "",
  };
  const [formState, setFormState] = useState(initialState);
  const [isLoading, setisLoading] = useState(false);
  const resetFormState = () => setFormState({ ...initialState });
  const [expand, setExpand] = React.useState(false);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#E3D8F1",

    ...theme.typography.body2,
    padding: theme.spacing(1),
  }));

  const useStyles = makeStyles((theme) => ({
    MuiAccordionroot: {
      "&.MuiAccordion-root:before": {
        height: "0px",
      },
    },
  }));
  const classes = useStyles();

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
    const newTask = await instance.post(baseUrl + `/task/${todoId}`, {
      description: formState.description,
      completed: false,
    });
    todoTask.push(newTask.data);
    console.log(todoTask);
    setisLoading(false);
    resetFormState();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="add-modal-container">
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            width: "100%",
            alignItems: "center",
          }}
        ></div>

        <Accordion
          expanded={expand}
          elevation={1}
          disableGutters={false}
          style={{
            width: "100%",
            marginTop: "25px",
            border: "none",
            backgroundColor: "#E3D8F1",
          }}
          classes={{
            root: classes.MuiAccordionroot,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            IconButtonProps={{
              onClick: toggleAcordion,
            }}
          >
            <h5>Add a new task</h5>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: "flex", flexFlow: "column", width: "100%" }}>
              <TextField
                id="description"
                label="Description"
                type="text"
                inputProps={{
                  minLength: 100,
                  maxLength: 300,
                }}
                sx={{ mt: 1 }}
                required
                fullWidth
                onChange={onChange}
                value={formState.description}
              ></TextField>
              <LoadingButton
                style={{ marginTop: "11px" }}
                variant="outlined"
                size="large"
                type="submit"
                loading={isLoading}
              >
                Save
              </LoadingButton>
            </div>
          </AccordionDetails>
        </Accordion>

        {todoTask.length > 0 ? (
          todoTask.map((task, index) => {
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
          })
        ) : (
          <div>No tasks's for this todo </div>
        )}
      </div>
    </form>
  );
};

export default AddTask;
