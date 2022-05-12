import {NavLink} from 'react-router-dom';
import '../css/SideNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDisplay, faHandsHolding, faMugSaucer } from '@fortawesome/free-solid-svg-icons';
import People from '@material-ui/icons/People';
import Dashboard from '@material-ui/icons/Dashboard';
import { useSelector } from 'react-redux';

const SideNav = (props) => {

  const sidenav = useSelector( state => state.sidenav);
  const employeesNumber = useSelector( state => state.employees).length;

  return (
    <div onClick={e => e.stopPropagation()}  className={sidenav ? 'sidenav sidenav-active' : 'sidenav'}>
        <ul className='sidenav-links'>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'sidenav-active' : 'sidenav-link')} to='/dashboard'>
              <Dashboard className='sidenav-icon' style={{fontSize: '35px'}} />
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
              {/* <FontAwesomeIcon className='sidenav-icon' icon={faUserGroup} /> */}
              <div className='relative'>
                <People className='sidenav-icon' style={{fontSize:'35px'}} />
                {/* number of employees */}
                <span className='h-[15px] w-[15px] bg-[#ff6a6a] absolute top-0 -right-1 text-white rounded-full flex items-center justify-center text-[10px]'>{employeesNumber}</span>
              </div>
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