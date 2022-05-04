import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Department from "./pages/Department";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App" style={{ textAlign: "center" }}>
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
