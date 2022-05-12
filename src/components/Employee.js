import { useState, useEffect } from 'react';
import Card from "./Card";
import '../css/Employee.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import Form from "./Form";
import { useSelector, useDispatch } from 'react-redux';
import { openForm, closeForm } from "../actions/formDisplayActions";

const Employee = (props) => {

    const [filter, setFilter] = useState('');
    
    const dispatch = useDispatch();

    const formDisplay = useSelector( state => state.formDisplay);

    const employees = useSelector( state => state.employees);
    
    function filterEmployees(employees){
        if(filter){
            return employees.filter( employee => {
                return employee.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0
            })
        } else {
            return employees;
        }
    }

    let filteredEmployees = filterEmployees(employees);

    const handleAddBtn = (e) => {
        e.stopPropagation();
        dispatch(openForm());
    }

    const handleChange = (e) => {
        let {value} = e.target;
        setFilter(value)
    }

  return (
    <div className="employee-page">
        {/* search contianer & add button */}
        <div className='flex w-full mb-[49px]'>
            {/* search container */}
            <div className='w-full flex items-center justify-start h-[30px] bg-white p-1'>
                <FontAwesomeIcon className="ml-[26px] search-icon" icon={faMagnifyingGlass} />
                <input onChange={handleChange} className='w-full h-full outline-none text-[13px]' type='text' placeholder='Search' />
            </div>
            {/* add button */}
            <button onClick={handleAddBtn} className="h-[30px] bg-[#2764ac] rounded text-[13px] border-0 outline-0 text-white flex items-center justify-center w-[101px] add-btn ml-[12px]">
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                <span>Add new</span>
            </button>
        </div>
        <div className='grid gap-[45px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
               filteredEmployees.map( (employee, index) => {
                return (
                    <Card key={`${employee.id}-${index}`} employee={employee} />
                )
            })
            }         
        </div>
        
        {formDisplay ? <Form /> : '' }
    </div>
  )
}


export default Employee;