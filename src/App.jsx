import "./App.css";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Department from "./pages/Department";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <h3 className="d-flex justify-content-center m-3">CompaniepNet</h3>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
