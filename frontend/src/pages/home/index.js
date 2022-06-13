import { useState } from "react";
import { useQuery } from "react-query";
import { Grid, IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Loading from "../../components/loading";
import baseUrl from "../../utils/baseUrl";
import TodoBacklog from "./components/todoBacklog";
import TodoInProgress from "./components/todoInProgress";
import TodoComplete from "./components/todoComplete";
import AddTodoModal from "./components/addTodoModal";

const Home = () => {
  const [isOpen, setisOpen] = useState(false);
  const handleClose = () => setisOpen(false);
  const handleOpen = () => setisOpen(true);
  const { isLoading, error, data } = useQuery("todoData", () =>
    fetch(baseUrl + "/todo").then((res) => res.json())
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#AD8A64",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
  }));

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div
      style={{
        backgroundColor: "#BF8B85",
        minHeight: "100vh",
        position: "inherit",
      }}
    >
      <AddTodoModal open={isOpen} handleClose={handleClose} />
      <Grid container spacing={2} style={{ margin: "-2px" }}>
        <Grid item xs={12} sm={4} md={4}>
          <Item>
            <div className="backlog-title-container">
              <h3>Backlog</h3>
              <IconButton
                color="primary"
                onClick={handleOpen}
                aria-label="upload picture"
                component="span"
              >
                <div style={{ marginTop: "21px" }}>
                  <AddIcon />
                </div>
              </IconButton>
            </div>
            {data.todos.map((todo, index) => (
              <div style={{ display: "flex", flexFlow: "column" }}>
                <TodoBacklog key={index} todo={todo} />
              </div>
            ))}
          </Item>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Item>
            <h3 style={{ marginTop: "26px", marginBottom: "29px" }}>
              In Progress
            </h3>
            {data.todos.map((todo, index) => (
              <div style={{ display: "flex", flexFlow: "column" }}>
                <TodoInProgress key={index} todo={todo} />
              </div>
            ))}
          </Item>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Item style={{ marginRight: "12px" }}>
            <h3 style={{ marginTop: "26px", marginBottom: "29px" }}>
              Completed
            </h3>
            {data.todos.map((todo, index) => (
              <div style={{ display: "flex", flexFlow: "column" }}>
                <TodoComplete key={index} todo={todo} />
              </div>
            ))}
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
