import { useEffect, useState } from "react";
import instance from "../../utils/axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDataFunction();
  }, []);

  const getDataFunction = async () => {
    setIsLoading(true);
    const todoRes = (await instance.get("/todo")).data;
    setTodos(todoRes.todos);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="home-text">HomePage</div>
      {isLoading && <div>Loading tasks</div>}
    </div>
  );
};

export default Home;
