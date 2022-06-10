import { useQuery } from "react-query";
import { Grid } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Loading from "../../components/loading";
import baseUrl from "../../utils/baseUrl";
import TodoBacklog from "./components/todoBacklog";
import TodoInProgress from "./components/todoInProgress";
import TodoComplete from "./components/todoComplete";

const Home = () => {
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
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            Backlog
            {data.todos.map((todo) => (
              <TodoBacklog todo={todo} />
            ))}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            In Progress
            {data.todos.map((todo) => (
              <TodoInProgress todo={todo} />
            ))}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            Completed
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
