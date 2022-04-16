import { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/SideNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDisplay, faHandsHolding, faMugSaucer, faObjectGroup, faUserGroup } from '@fortawesome/free-solid-svg-icons'


const SideNav = (props) => {

  return (
    <div onClick={e => e.stopPropagation()}  className={props.sideNav ? 'sidenav sidenav-active' : 'sidenav'}>
        <ul className='sidenav-links'>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'sidenav-active' : 'sidenav-link')} to='/dashboard'>
              <FontAwesomeIcon className='sidenav-icon' icon={faObjectGroup} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'sidenav-active' : 'sidenav-link')} to='/workplace'>
              <FontAwesomeIcon className='sidenav-icon' icon={faDisplay} />
              <span>Workplace</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'sidenav-active' : 'sidenav-link')} to='/holidays'>
              <FontAwesomeIcon className='sidenav-icon' icon={faMugSaucer} />
              <span>Holidays</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'sidenav-active' : 'sidenav-link')} to='/employees'>
              <FontAwesomeIcon className='sidenav-icon' icon={faUserGroup} />
              <span>Employees</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'sidenav-active' : 'sidenav-link')} to='/requests'>
              <FontAwesomeIcon className='sidenav-icon' icon={faHandsHolding} />
              <span>Inbound Requests</span>
            </NavLink>
          </li>
        </ul>
    </div>
  )
}


export default SideNav;