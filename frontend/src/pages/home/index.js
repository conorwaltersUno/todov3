import { useState } from "react";
import { useQuery } from "react-query";
import { Collapse, Grid, IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Loading from "../../components/loading";
import baseUrl from "../../utils/baseUrl";
import TodoBacklog from "./components/todoBacklog";
import TodoInProgress from "./components/todoInProgress";
import TodoComplete from "./components/todoComplete";
import AddTodoModal from "./components/addTodoModal";
import { flexbox } from "@mui/system";

const Home = () => {
  const [isOpen, setisOpen] = useState(false);
  const handleClose = () => setisOpen(false);
  const handleOpen = () => setisOpen(true);
  const { isLoading, error, data } = useQuery("todoData", () =>
    fetch(baseUrl + "/todo").then((res) => res.json())
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    height: "100%",
    color: theme.palette.text.secondary,
  }));

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <AddTodoModal open={isOpen} handleClose={handleClose} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={4}>
          <Item>
            <div className="backlog-title-container">
              <div>Backlog</div>
              <IconButton
                color="primary"
                onClick={handleOpen}
                aria-label="upload picture"
                component="span"
              >
                <div style={{ marginTop: "8px" }}>
                  <AddIcon />
                </div>
              </IconButton>
            </div>
            {data.todos.map((todo) => (
              <TodoBacklog todo={todo} />
            ))}
          </Item>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Item>
            <div style={{ marginTop: "26px", marginBottom: "29px" }}>
              In Progress
            </div>
            {data.todos.map((todo) => (
              <TodoInProgress todo={todo} />
            ))}
          </Item>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Item>
            <div style={{ marginTop: "26px", marginBottom: "29px" }}>
              Completed
            </div>
            {data.todos.map((todo) => (
              <TodoComplete todo={todo} />
            ))}
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
