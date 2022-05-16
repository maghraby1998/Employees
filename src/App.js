import "./css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import Employee from "./components/Employee";
import { useSelector } from "react-redux";
import SelectBox from "./components/SelectBox";

const App = () => {
  const formDisplay = useSelector((state) => state.formDisplay);

  return (
    <div className={formDisplay ? "h-screen overflow-hidden" : ""}>
      <Router>
        <SideNav />
        <TopNav />
        <Routes>
          <Route path="/employees" element={<Employee />} />
        </Routes>
      </Router>
      {/* <SelectBox /> */}
    </div>
  );
};

export default App;
