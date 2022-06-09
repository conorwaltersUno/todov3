import "./index.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import { Navigation } from "./constants";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path={Navigation.HOME}
          caseSensitive={false}
          element={<Home />}
        />
      </Routes>
    </div>
  );
}

export default App;
