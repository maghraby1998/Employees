import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPause, faTrash, faEnvelope, faPhone, faExclamation, faUser } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap';
import CallEnd from '@material-ui/icons/CallEnd';
import DeleteForever from '@material-ui/icons/DeleteForever';


const Card = (props) => {

    let {id, image, name, role, phone, email, startDate, department, attendance, manager, office, position, workFromHome} = props.employee;
    let imgDisplay;
    let attedanceStatu;
    if(image){
      imgDisplay = <img src={image} className="user-img" alt='user-img' />
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
      <div className="card">
        <div className="img-container">
          {imgDisplay}
          <div className="user-icons-container">
            <FontAwesomeIcon className='card-user-icon' icon={faPen} />
            <FontAwesomeIcon className='card-user-icon icon-circle' icon={faPause} />
            <DeleteForever onClick={ () => props.deleteEmployee(id)} className='card-user-icon' style={{fontSize: '18px'}} />
            {/* <FontAwesomeIcon className='card-user-icon' icon={faTrash } /> */}
          </div>
        </div>
        <span className='card-line'></span>
        <div className='user-info'>
          <h3 className='card-username'>
            {name}
          </h3>
          <h4>HR Head</h4>
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
            <div className='card-icon-container dropdown-button'>
              <FontAwesomeIcon className='card-icon' icon={faExclamation} />              
            </div>
            <div className='dropdown-content'>
              <Row>
                <Col xs={4} className='dropdown-category'>
                  <p className='dropdown-header'>Office</p>
                  <p className='dropdown-result'>{office ? office : '---'}</p>
                </Col>
                <Col xs={4} className='dropdown-category'>
                  <p className='dropdown-header'>Role</p>
                  <p className='dropdown-result'>{role ? role : '---'}</p>
                </Col>
                <Col xs={4} className='dropdown-category'>
                  <p className='dropdown-header'>Copied Manager</p>
                  <p className='dropdown-result'>{manager ? manager : '---'}</p>
                </Col>
                <Col xs={4} className='dropdown-category'>
                  <p className='dropdown-header'>Joining Date</p>
                  <p className='dropdown-result'>{startDate ? startDate : '---'}</p>
                </Col>
                <Col xs={4} className='dropdown-category'>
                  <p className='dropdown-header'>Manager</p>
                  <p className='dropdown-result'>{manager ? manager : '---'}</p>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  
  export default Card;