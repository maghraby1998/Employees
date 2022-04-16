import {useEffect} from 'react';
import '../css/TopNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faBell, faUser, faBars } from '@fortawesome/free-solid-svg-icons'

const TopNav = (props) => {

  useEffect( () => {
    window.document.addEventListener('click', () => {
      props.handleSideNav(false);
    })
  }, [])

  const handleBars = (e) => {
    props.handleSideNav(!props.sideNav);
    e.stopPropagation();
  }

  return (
    <div className={props.sideNav ? 'topnav topnav-active' : 'topnav'}>
        <FontAwesomeIcon onClick={handleBars} className='bars' icon={faBars} />
        <p className='date'>Thursday, 03 Oct 02:08:07 PM</p>
        <button>Sign in</button>
        <span className='split'></span>
        <div className='noti-container'>
            <FontAwesomeIcon className='noti-icon' icon={faBell} />
            <p>1</p>
        </div>
        <span className='split'></span>
        <div className='user-container'>
            <div className='user-img-container'>
                <FontAwesomeIcon className='user-icon' icon={faUser} />
            </div>
            <p className='username'>ahmed khaled</p>
            <FontAwesomeIcon className='user-drop-icon' icon={faAngleDown} />
        </div>
    </div>
  )
}

export default TopNav;