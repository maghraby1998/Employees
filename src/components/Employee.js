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
                <input onChange={handleChange} className='search-input' type='text' placeholder='Search' />
            </div>
            <button onClick={handleAddBtn} className="add-btn">
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                <span>Add new</span>
            </button>
        </div>
        {/* <div className='container mx-auto border border-2 border-red grid gap-32 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
            {
               filteredEmployees.map( employee => {
                return (
                    <Card key={employee.id} deleteEmployee={props.deleteEmployee} employee={employee} />
                )
            })
            }         
        </div> */}
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
    </div>
  )
}


export default Employee;