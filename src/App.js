import {useState, useEffect} from 'react';
import './css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import Employee from './components/Employee';

const App = () => {

  const [employees, setEmployees] = useState([]);

  
  // {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'random', department:'random'},
  // {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'random', department:'random'},
  // {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'random', department:'random'},
  // {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'random', department:'random'},
  // {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'random', department:'random'},
  // {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'random', department:'random'},
  // {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'random', department:'random'}
  
  // useEffect( () => {
  //   let localEmployees = JSON.parse(window.localStorage.getItem('employees'));
  //   if(localEmployees){
  //     setEmployees(localEmployees);
  //   }
  // }, [])

  useEffect( () => {
    // if(employees.length > 0){
    //   window.localStorage.setItem('employees', JSON.stringify(employees))
    // }
    console.log(employees);
  }, [employees])

  const handleEmployees = (newEmployee) => {
    setEmployees( prev => {
      return [...prev, newEmployee]
    })
  }

  const deleteEmployee = (id) => {
    setEmployees( prev => {
      return prev.filter( employee => {
        return employee.id != id
      })
    })
  }

  return (
    <Router>
      <SideNav />
      <TopNav />
      <Routes>
        <Route path='/employees' element={<Employee deleteEmployee={deleteEmployee} employees={employees} handleEmployees={handleEmployees} />} />
      </Routes>
    </Router>
  );
}

export default App;
