import './css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import Employee from './components/Employee';

const App = () => {

  return (
    <Router>
      <SideNav />
      <TopNav />
      <Routes>
        <Route path='/employees' element={<Employee />} />
      </Routes>
    </Router>
  );
}

export default App;
