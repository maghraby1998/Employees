import "../css/Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPause,
  faTrash,
  faEnvelope,
  faPhone,
  faExclamation,
  faUser,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import CallEnd from "@material-ui/icons/CallEnd";
import DeleteForever from "@material-ui/icons/DeleteForever";
import { deleteEmployee } from "../actions/employeesActions";
import { deleteUser } from "../queries/queries";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDeleteWindow } from "../actions/deleteWindowActions";
import { insertUserId } from "../actions/userIdAction";
import { setUserInfo } from "../actions/userInfoAction";
import { openForm } from "../actions/formDisplayActions";

const Card = (props) => {
  const dispatch = useDispatch();

  let {
    id,
    face_path,
    name,
    phone,
    office,
    role,
    email,
    starts_at,
    department,
    manager,
    position,
    copied_managers,
  } = props.user;

  let imgDisplay;

  if (face_path) {
    imgDisplay = (
      <div className="w-full flex items-center justify-center h-[64px] w-[64px] rounded-full overflow-hidden mb-[10px]">
        <img src={face_path} className="user-img" alt="user-img" />
      </div>
    );
  } else {
    imgDisplay = (
      <div className="card-icon-img-container">
        <FontAwesomeIcon className="card-icon-img" icon={faUser} />
      </div>
    );
  }
  // let attedanceStatu;

  // if(attendance === 'present'){
  //   attedanceStatu = <span className='card-state present'>Present</span>
  // } else if (attendance === 'absent'){
  //   attedanceStatu = <span className='card-state absent'>Absent</span>
  // } else if (attendance === 'weekend'){
  //   attedanceStatu = <span className='card-state weekend'>Weekend</span>
  // } else if (attendance === 'holiday'){
  //   attedanceStatu = <span className='card-state holiday'>Holiday</span>
  // } else {
  //   attedanceStatu = <span className='card-state none'></span>
  // }

  const handleDeleteButton = () => {
    dispatch(openDeleteWindow());
    dispatch(insertUserId(id));
  };

  const handleEditButton = (e) => {
    dispatch(setUserInfo(props.user));
    dispatch(openForm());
  }

  // console.log(props.user)

  return (
    <div className="flex itesm-center justify-center bg-white relative py-[12px] px-[19px] card">
      {/* Card Image */}
      <div className="w-[25%] md:w-[30%] flex flex-col items-between justify-center">
        {/* regular image icon for now */}
        <div className="card-icon-img-container">
          <FontAwesomeIcon className="card-icon-img" icon={faUser} />
        </div>
        <div className="user-icons-container">
          <FontAwesomeIcon
            onClick={handleEditButton}
            className="edit-icon"
            icon={faPen}
          />
          <FontAwesomeIcon className="pause-icon" icon={faPause} />
          <DeleteForever
            className="delete-icon"
            style={{ height: "16px", width: "16px" }}
            onClick={handleDeleteButton}
          />
        </div>
      </div>

      {/* Card Line */}
      <span className="w-[20%] grid place-items-center">
        <div className="h-full w-[1px] bg-[#8997a4]/20"></div>
      </span>

      {/* Card Info */}
      <div className="user-info">
        <h3 className="card-username">
          {name}
          {name.length > 18 ? (
            <span className="card-full-username">{name}</span>
          ) : (
            ""
          )}
        </h3>
        <h4 className="text-[13px] text-[#313030] font-semibold m-0">
          {department ? department.name : ""}
        </h4>
        <p>{position ? position.name : ""}</p>
        {/* {attedanceStatu} */}
        <span className="card-state absent">Absent</span>
      </div>

      <div className="card-icons-container">
        {/* email */}
        <div className="dropdown">
          <div className="card-icon-container">
            <FontAwesomeIcon className="card-icon" icon={faEnvelope} />
          </div>
          <div className="dropdown-content-email">
            <div className="dropdown-notch"></div>
            <h2>{email}</h2>
          </div>
        </div>
        {/* phone */}
        <div className="dropdown">
          <div className="card-icon-container">
            <CallEnd style={{ fontSize: ".65rem" }} />
          </div>
          <div className="dropdown-content-email">
            <div className="dropdown-notch"></div>
            <h2>{`0${phone}`}</h2>
          </div>
        </div>
        {/* tooltip */}
        <div className="dropdown">
          <div className="card-icon-container">
            <FontAwesomeIcon className="card-icon" icon={faExclamation} />
          </div>
          <div className="dropdown-content">
            <div className="dropdown-notch"></div>
            <div className="grid grid-cols-3">
              <div className="dropdown-category">
                <p className="dropdown-header">Office</p>
                <p className="dropdown-result">
                  {office ? office.name : "--------"}
                </p>
              </div>
              <div className="dropdown-category">
                <p className="dropdown-header">Role</p>
                <p className="dropdown-result">{role ? role : "--------"}</p>
              </div>
              <div className="dropdown-category">
                <p className="dropdown-header">Copied Manager</p>
                <p className="dropdown-result">
                  {copied_managers.length > 0
                    ? copied_managers.map((copiedManager, index) => <span key={index} className="block">{copiedManager.name}</span>)
                    : "--------"}
                </p>
              </div>
              <div className="dropdown-category">
                <p className="dropdown-header">Joining Date</p>
                <p className="dropdown-result">
                  {starts_at ? starts_at : "--------"}
                </p>
              </div>
              <div className="dropdown-category">
                <p className="dropdown-header">Manager</p>
                <p className="dropdown-result">
                  {manager ? manager.name : "--------"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
