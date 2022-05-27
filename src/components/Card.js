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
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import CallEnd from "@material-ui/icons/CallEnd";
import DeleteForever from "@material-ui/icons/DeleteForever";
import { deleteEmployee } from "../actions/employeesActions";
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { openDeleteWindow } from "../actions/deleteWindowActions";
import { insertUserId } from "../actions/userIdAction";
import { setUserInfo } from "../actions/userInfoAction";
import { openForm } from "../actions/formDisplayActions";
import { getInputsDataAndUserInfo } from "../queries/queries";
import { setInputsData } from "../actions/inputsDataActions";
import {setFormLoading} from "../actions/isFormLoadingActions";

const Card = (props) => {
  let {
    id,
    face,
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

  const [
    executeInputsAndUserData,
    {
      data: inputs_and_user_data,
      error: inputs_and_user_data_error,
      loading: inputs_and_user_data_loading,
    },
  ] = useLazyQuery(getInputsDataAndUserInfo);
  const dispatch = useDispatch();

  // const [getAUser, { data, loading, error }] = useLazyQuery(getUser, {
  //   fetchPolicy: "network-only",
  //   nextFetchPolicy:"network-only",
  //   onCompleted: (data) => {
  //     console.log("====================================");
  //     console.log(data);
  //     console.log("====================================");
  //     dispatch(setUserInfo(data.user));
  //     dispatch(openForm());
  //     console.log("Fired");
  //     return;
  //   },
  // });

  let imgDisplay;

  if (face) {
    let url = "https://testing.mawared-hr.com";
    let indexOfUploads = face.path.indexOf("/uploads");
    let restOfTextAfterUploads = face.path.slice(
      indexOfUploads,
      face.path.length
    );
    face = url + restOfTextAfterUploads;
    imgDisplay = (
      <div className="w-full flex items-center justify-center h-[55px] w-[55px] rounded-full overflow-hidden mb-[10px]">
        <img src={face} className="user-img" alt="user-img" />
      </div>
    );
  } else {
    imgDisplay = (
      <div className="card-icon-img-container min-h-[55px]">
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
    // console.log("s=>", e.target);
    // e.stopPropagation();
    executeInputsAndUserData({
      variables: {
        getUserInfo: true,
        id: id,
      },
      onCompleted: (data) => {
        dispatch(openForm());
        dispatch(setUserInfo(data.user));
        dispatch(
          setInputsData({
            company_attendance_profiles: data.company_attendance_profiles,
            company_departments: data.company_departments,
            company_offices: data.company_offices,
            company_positions: data.company_positions,
            managers: data.managers,
            roles: data.roles,
          })
        );
      },
    });
    // getAUser({
    //   variables: {
    //     id: id,
    //   },
    // });
  };

  if (inputs_and_user_data_loading) {
    return (
      <h1 className="text-4xl fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center h-full w-full bg-blue-400/50 font-semibold flex flex-col items-center justify-center z-50 h-screen w-full bg-red-400">
        <FontAwesomeIcon
          className="text-7xl text-blue-500 animate-spin mb-3"
          icon={faSpinner}
        />
        <span className="text-white shadow-lg capitalize">Loading...</span>
      </h1>
    );
  }

  return (
    <div className="flex itesm-center justify-center bg-white relative py-[12px] px-[19px] card">
      {/* Card Image */}
      <div className="w-[25%] md:w-[30%] flex flex-col items-between justify-center">
        {/* regular image icon for now */}
        <div className="card-icon-img-container">
          {/* <FontAwesomeIcon className="card-icon-img" icon={faUser} /> */}
          {imgDisplay}
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
                    ? copied_managers.map((copiedManager, index) => (
                        <span key={index} className="block">
                          {copiedManager.name}
                        </span>
                      ))
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
