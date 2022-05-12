import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPause, faTrash, faEnvelope, faPhone, faExclamation, faUser, faSortUp } from '@fortawesome/free-solid-svg-icons'
import CallEnd from '@material-ui/icons/CallEnd';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { deleteEmployee } from '../actions/employeesActions';
 import { useDispatch } from 'react-redux';


const Card = (props) => {

    const dispatch = useDispatch();

    let {id, image, name, role, phone, email, startDate, department, attendance, manager, office, position, workFromHome} = props.employee;
    let imgDisplay;
    let attedanceStatu;
    if(image){
      imgDisplay = <div className='w-full flex items-center justify-center'>
                    <img src={image} className="user-img" alt='user-img' />
                  </div>
    } else {
      imgDisplay =  <div className='card-icon-img-container'>
                      <FontAwesomeIcon className='card-icon-img' icon={faUser} />
                    </div>
    }
    if(attendance === 'present'){
      attedanceStatu = <span className='card-state present'>Present</span>
    } else if (attendance === 'absent'){
      attedanceStatu = <span className='card-state absent'>Absent</span>
    } else if (attendance === 'weekend'){
      attedanceStatu = <span className='card-state weekend'>Weekend</span>
    } else if (attendance === 'holiday'){
      attedanceStatu = <span className='card-state holiday'>Holiday</span>
    } else {
      attedanceStatu = <span className='card-state none'></span>
    }
    return (
      <div className="flex itesm-center justify-center bg-white relative py-[12px] px-[19px] card">
        {/* Card Image */}
        <div className='w-[25%] md:w-[30%] flex flex-col items-between justify-center'>
          {imgDisplay}
          <div className="user-icons-container">
            <FontAwesomeIcon className='card-user-icon' icon={faPen} />
            <FontAwesomeIcon className='card-user-icon icon-circle' icon={faPause} />
            <DeleteForever onClick={ () => dispatch(deleteEmployee(id))} className='card-user-icon' style={{height:'15px', width:'15px', color:'#8997a4'}}/>
          </div>
        </div>

        {/* Card Line */}
        <span className='w-[20%] grid place-items-center'>
          <div className='h-full w-[1px] bg-[#8997a4]/20'></div>
        </span>

        {/* Card Info */}
        <div className='user-info'>
          <h3 className='card-username'>
            {name}
            <span className='card-full-username'>
              {name}
            </span>
          </h3>
          <h4 className='text-[13px] text-[#313030] font-semibold m-0'>HR Head</h4>
          <p>Business Development</p>
          {attedanceStatu}
          {/* <span className='card-state'>Present</span> */}
        </div>

        <div className='card-icons-container'>
          <div className='card-icon-container'>
            <FontAwesomeIcon className='card-icon' icon={faEnvelope} />
          </div>
          <div className='card-icon-container'>
            <CallEnd style={{fontSize: '10px'}} />
          </div>
          <div className='dropdown'>
            <div className='card-icon-container'>
              <FontAwesomeIcon className='card-icon' icon={faExclamation} />              
            </div>
            <div className='dropdown-content'>
              <div className='dropdown-notch'></div>
              <div className='grid grid-cols-3'>
                <div className='dropdown-category'>
                  <p className='dropdown-header'>Office</p>
                  <p className='dropdown-result'>{office ? office : '---'}</p>
                </div>
                <div className='dropdown-category'>
                  <p className='dropdown-header'>Role</p>
                  <p className='dropdown-result'>{role ? role : '---'}</p>
                </div>
                <div className='dropdown-category'>
                  <p className='dropdown-header'>Copied Manager</p>
                  <p className='dropdown-result'>{manager ? manager : '---'}</p>
                </div>
                <div className='dropdown-category'>
                  <p className='dropdown-header'>Joining Date</p>
                  <p className='dropdown-result'>{startDate ? startDate : '---'}</p>
                </div>
                <div className='dropdown-category'>
                  <p className='dropdown-header'>Manager</p>
                  <p className='dropdown-result'>{manager ? manager : '---'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  
  export default Card;