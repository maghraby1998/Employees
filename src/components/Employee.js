import { useState, useEffect } from 'react';
import Card from "./Card";
import '../css/Employee.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap';
import Form from "./Form";


const Employee = (props) => {

    const [filter, setFilter] = useState('');
    const [formDisplay, setFormDisplay] = useState(false);

    function filterEmployees(employees){
        if(filter){
            return employees.filter( employee => {
                return employee.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0
            })
        } else {
            return employees;
        }
    }


    let filteredEmployees = filterEmployees(props.employees);


    const handleFormDisplay = (statu) => {
        setFormDisplay(statu)
    } 

    const handleAddBtn = (e) => {
        e.stopPropagation();
        handleFormDisplay(true)
    }

    const handleChange = (e) => {
        let {value} = e.target;
        setFilter(value)
    }

  return (
    <div className="employee-page">
        <div className="search-container">
            <div className="search-input-container">
                <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
                <input onChange={handleChange} className='search-input' type='text' placeholder='Search' className="search-input" />
            </div>
            <button onClick={handleAddBtn} className="add-btn">
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                <span>Add new</span>
            </button>
        </div>
        <Row>
            {
               filteredEmployees.map( employee => {
                return (
                    <Col key={employee.id} md='auto'>
                        <Card deleteEmployee={props.deleteEmployee} employee={employee} />
                    </Col>
                )
            })
            }               
        </Row>
        
        {formDisplay ? <Form handleFormDisplay={handleFormDisplay} handleEmployees={props.handleEmployees} /> : '' }
        {/* <h1>Hello World</h1> */}
    </div>
  )
}


export default Employee;