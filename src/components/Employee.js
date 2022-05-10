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
    <div className="employee-page pr-5 mx-auto ml-[6.625rem]">
        {/* search contianer that includes the input and the add button */}
        <div className="w-full grid grid-col-1 md:grid-cols-12 justify-between bg-white mb-[49px]">
            {/* search icon and input */}
            <div className="w-full col-span-12 mb-3 md:mb-0 md:col-span-10 lg:col-span-11 flex items-center justify-center">
                <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
                <input onChange={handleChange} className='search-input' type='text' placeholder='Search' />
            </div>
            {/* add button */}
            <button onClick={handleAddBtn} className="add-btn col-span-12 md:col-span-2 lg:col-span-1">
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                <span>Add new</span>
            </button>
        </div>
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
               filteredEmployees.map( employee => {
                return (
                    <Card key={employee.id} deleteEmployee={props.deleteEmployee} employee={employee} />
                )
            })
            }         
        </div>
        {/* <Row>
            {
               filteredEmployees.map( employee => {
                return (
                    <Col key={employee.id} md='auto'>
                        <Card deleteEmployee={props.deleteEmployee} employee={employee} />
                    </Col>
                )
            })
            }               
        </Row> */}
        
        {formDisplay ? <Form handleFormDisplay={handleFormDisplay} handleEmployees={props.handleEmployees} /> : '' }
    </div>
  )
}


export default Employee;