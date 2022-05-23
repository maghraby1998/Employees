import { useState, useEffect } from "react";
import "../css/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  inputErrorMessageHandler,
  inputBorderHandler,
  handleErrors,
  handleSubmitting,
} from "../functions/validation";
import { closeForm } from "../actions/formDisplayActions";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee } from "../actions/employeesActions";
import SelectBox from "./SelectBox";
import {
  getDepartments,
  getPositions,
  getOffices,
  getAttendanceProfiles,
  getRoles,
  getManagers,
  getUsers,
  addUser,
  updateUser,
} from "../queries/queries";
import { useQuery, useMutation } from "@apollo/client";
import { closeFormAndResetUserInfo } from "../actions/userInfoAction";

const Form = (props) => {
  const userInfo = useSelector((state) => state.userInfo);
  console.log(userInfo)
  const [employee, setEmployee] = useState({
    id: userInfo ? userInfo.id : "",
    image: "",
    name: userInfo ? userInfo.name : "",
    phone: userInfo ? userInfo.phone : "",
    startDate: userInfo ? userInfo.starts_at : "",
    email: userInfo ? userInfo.email : "",
    office: "",
    department: "",
    attendance: "",
    role: "",
    position: "",
    manager: "",
    copiedManagers: [],
    workFromHome: 0,
    companyId: 1,
  });

  const [
    addAUser,
    { data: add_user_data, error: add_user_error, loading: add_user_loading },
  ] = useMutation(addUser);

  const [
    updateAUser,
    {
      data: update_user_data,
      error: update_user_error,
      loading: update_user_loading,
    },
  ] = useMutation(updateUser);

  const [errors, setErrors] = useState({
    name: employee.name ? false : true,
    startDate: employee.startDate ? false : true,
    email: employee.startDate ? false : "empty",
    department: employee.department ? false : true,
    position: employee.position ? false : true,
    attendance: employee.attendance ? false : true,
  });

  const dispatch = useDispatch();
  const [formSubmission, setFormSubmission] = useState(false);

  const { data: departments_data, error, loading } = useQuery(getDepartments);

  const {
    data: positions_data,
    error: positions_error,
    loading: position_loading,
  } = useQuery(getPositions);

  const {
    data: offices_data,
    error: offices_error,
    loading: offices_loading,
  } = useQuery(getOffices);

  const {
    data: attendance_data,
    error: attendance_error,
    loading: attendance_loading,
  } = useQuery(getAttendanceProfiles);

  const {
    data: roles_data,
    error: roles_error,
    loading: roles_loading,
  } = useQuery(getRoles);

  let {
    data: managers_data,
    error: managers_error,
    loading: managers_loading,
  } = useQuery(getManagers);

  managers_data = managers_data?.managers?.filter((manager) => {
    return !employee.copiedManagers.includes(manager.id);
  });

  let {
    data: copied_managers_data,
    error: copied_managers_error,
    loading: copied_managers_loading,
  } = useQuery(getManagers);

  copied_managers_data = copied_managers_data?.managers?.filter(
    (copied_manager) => {
      return (
        copied_manager.id != employee.manager &&
        !employee.copiedManagers.includes(copied_manager.id)
      );
    }
  );

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    value = value.trim();
    if (type === "checkbox") {
      setEmployee((prev) => {
        return { ...prev, workFromHome: prev.workFromHome === 0 ? 1 : 0 };
      });
    } else {
      setEmployee((prev) => {
        return { ...prev, [name]: value, id: Math.random() };
      });
    }

    let updatedErrors = handleErrors(name, value, errors);

    setErrors(updatedErrors);
  };

  const deleteCopiedManager = (id) => {
    setEmployee((prev) => {
      return {
        ...prev,
        copiedManagers: employee.copiedManagers.filter((copiedManager) => {
          return copiedManager != id;
        }),
      };
    });
  };

  useEffect(() => {
    console.log(employee);
  }, [employee]);

  const handleSelectChange = (name, value) => {
    if (name === "copiedManagers") {
      setEmployee((prev) => {
        return {
          ...prev,
          copiedManagers: [...employee.copiedManagers, value.id],
        };
      });
    } else {
      setEmployee((prev) => {
        return { ...prev, [name]: value.id };
      });
      if (value) {
        setErrors((prev) => {
          return { ...prev, [name]: false };
        });
      }
    }
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmission(true);
    if (handleSubmitting(errors)) {
      if (userInfo) {
        console.log('you should update and not submit');
      } else {
        addAUser({
          variables: {
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            starts_at: employee.startDate,
            can_work_home: employee.workFromHome,
            role_id: employee.role,
            position_id: employee.position,
            att_profile_id: employee.attendance,
            manager_id: employee.manager,
            department_id: employee.department,
            company_id: 1,
            office_id: employee.office,
            has_credentials: 1,
            copied_managers: employee.copiedManagers,
            max_homeDays_per_week: 0,
            flexiable_home: 0,
            can_ex_days: 0,
            start_at: employee.startDate,
            salary_management_type: 2,
          },
          refetchQueries: [getUsers],
        });
      }
      if (add_user_loading) {
        setSending(true);
      } else {
        dispatch(closeFormAndResetUserInfo());
      }
    }
  };

  const handleImg = (e) => {
    let file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setEmployee((prev) => {
          return { ...prev, image: reader.result };
        });
      });
    } else {
      setEmployee((prev) => {
        return { ...prev, image: "" };
      });
    }
  };

  const handleCancelButton = () => {
    dispatch(closeFormAndResetUserInfo());
  };

  let imageDisplay;
  if (employee.image) {
    imageDisplay = <img src={employee.image} style={{ height: "100%" }} />;
  } else {
    imageDisplay = (
      <span className="text-center text-[rgba(40, 104, 174, 0.43)] tracking-widest">
        Click to upload
      </span>
    );
  }

  return (
    <div
      onClick={() => dispatch(closeFormAndResetUserInfo())}
      className="employee-form-page"
    >
      <form
        className="employee-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="form-header">NEW EMPLOYEE</h2>
        {/* personal info */}
        <div className="form-category">
          <h3 className="category-header">Personal Info</h3>
          <div className="category-header-line"></div>
          <div className="min-h-[112px] flex flex-col md:flex-row items-center justitfy-center">
            {/* image */}
            <div className="flex items-center w-full md:w-auto lg:min-w-[258px] md:mr-[13px]">
              <label htmlFor="imgInput">
                <div className="img-upload-container">
                  {imageDisplay}
                  {/* <span>Click to upload</span> */}
                </div>
              </label>
              <input
                onChange={handleImg}
                type="file"
                id="imgInput"
                name="image"
              />
            </div>
            {/* personal info other than image */}
            <div className="w-full min-h-[115px] flex flex-col items-between justify-between">
              {/* name and date */}
              <div className="grid md:gap-[25.8px] grid-cols-1 md:grid-cols-2">
                {/* name */}
                <div className="flex flex-col items-start justify-start">
                  <label
                    className="leading-[10px] mb-[5px] mt-[10px] md:mt-0"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className={
                      inputBorderHandler(formSubmission, errors, "name")
                        ? "form-input form-input-error"
                        : "form-input"
                    }
                    onChange={handleChange}
                    id="name"
                    type="text"
                    maxLength={35}
                    name="name"
                    value={employee.name}
                    autoFocus={true}
                  />
                  {inputErrorMessageHandler(formSubmission, errors, "name")}
                </div>
                {/* date */}
                <div className="flex flex-col items-start justify-start">
                  <label
                    className="leading-[10px] mb-[5px] mt-[6px] md:mt-0"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    className={
                      inputBorderHandler(formSubmission, errors, "startDate")
                        ? "form-input form-input-error"
                        : "form-input"
                    }
                    onChange={handleChange}
                    id="date"
                    type="date"
                    name="startDate"
                    value={employee.startDate}
                  />
                  {inputErrorMessageHandler(
                    formSubmission,
                    errors,
                    "startDate"
                  )}
                </div>
              </div>
              {/* phone and email */}
              <div className="grid md:gap-[25.8px] grid-cols-1 md:grid-cols-2">
                {/* phone */}
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    className="form-input"
                    onChange={handleChange}
                    id="phone"
                    type="text"
                    name="phone"
                    maxLength={11}
                    value={employee.phone}
                  />
                </div>
                {/* email */}
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    className={
                      inputBorderHandler(formSubmission, errors, "email")
                        ? "form-input form-input-error"
                        : "form-input"
                    }
                    onChange={handleChange}
                    id="email"
                    type="text"
                    name="email"
                    value={employee.email}
                    maxLength={40}
                  />
                  {inputErrorMessageHandler(formSubmission, errors, "email")}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* personal info */}

        {/* office info */}
        <div className="form-category">
          <h3 className="category-header">Office Info</h3>
          <div className="category-header-line"></div>
          {/* office */}
          <div>
            <label htmlFor="office">Office</label>
            <SelectBox
              options={offices_data?.company_offices?.data}
              name="office"
              currentValue={userInfo?.office}
              handleSelectChange={handleSelectChange}
            />
          </div>
          {/* attendance and department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-[32px]">
            {/* department */}
            <div md="6">
              <div>
                <label htmlFor="department">Department</label>
                <SelectBox
                  inputBorderError={inputBorderHandler(
                    formSubmission,
                    errors,
                    "department"
                  )}
                  options={departments_data?.company_departments?.data}
                  name="department"
                  currentValue={userInfo?.deparmtent}
                  handleSelectChange={handleSelectChange}
                />
                {inputErrorMessageHandler(formSubmission, errors, "department")}
              </div>
            </div>
            {/* attendance */}
            <div md="6">
              <div>
                <label htmlFor="attendance">Attendance Profile</label>
                <SelectBox
                  inputBorderError={inputBorderHandler(
                    formSubmission,
                    errors,
                    "attendance"
                  )}
                  options={attendance_data?.company_attendance_profiles?.data}
                  name="attendance"
                  handleSelectChange={handleSelectChange}
                />
                {inputErrorMessageHandler(formSubmission, errors, "attendance")}
              </div>
            </div>
          </div>
          {/* role and position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-[32px]">
            {/* role */}
            <div>
              <div>
                <label htmlFor="role">Role</label>
                <SelectBox
                  options={roles_data?.roles}
                  name="role"
                  currentValue={userInfo?.role}
                  handleSelectChange={handleSelectChange}
                />
              </div>
            </div>
            {/* position */}
            <div>
              <div>
                <label htmlFor="position">Position</label>
                <SelectBox
                  inputBorderError={inputBorderHandler(
                    formSubmission,
                    errors,
                    "position"
                  )}
                  options={positions_data?.company_positions?.data}
                  name="position"
                  currentValue={userInfo?.position}
                  handleSelectChange={handleSelectChange}
                />
                {inputErrorMessageHandler(formSubmission, errors, "position")}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-[32px]">
            {/* direct manager */}
            <div>
              <div>
                <label htmlFor="manager">Direct Manager</label>
                <SelectBox
                  options={managers_data}
                  name="manager"
                  currentValue={userInfo?.manager}
                  handleSelectChange={handleSelectChange}
                />
              </div>
            </div>
            {/* copied managers */}
            <div>
              <div>
                <label htmlFor="manager">Copied Managers</label>
                <SelectBox
                  options={copied_managers_data}
                  name="copiedManagers"
                  currentValue={userInfo?.copied_managers}
                  handleSelectChange={handleSelectChange}
                  values={employee.copiedManagers}
                  deleteCopiedManager={deleteCopiedManager}
                />
              </div>
            </div>
          </div>
        </div>
        {/* office info */}

        {/* Work from home */}
        <div className="form-category">
          <h3 className="category-header">Work From Home</h3>
          <div className="category-header-line"></div>
          <label htmlFor="workHome" className="checkbox-container">
            <input
              className="check-input"
              checked={employee.workFromHome}
              onChange={handleChange}
              id="workHome"
              type="checkbox"
            />
            {employee.workFromHome ? (
              <FontAwesomeIcon
                className={
                  employee.workFromHome
                    ? "custom-check-input-icon custom-input-active"
                    : "custom-check-input-icon"
                }
                icon={faCheck}
              />
            ) : (
              <FontAwesomeIcon
                className="empty-custom-check-input"
                icon={faCheck}
              />
            )}
            <p className={!employee.workFromHome ? "check-p-off" : ""}>
              Allow Employee To Work From Home.
            </p>
          </label>
        </div>
        {/* Work from home */}
        <div className="form-line"></div>
        <div className="form-buttons">
          <button className="submit-button">
            {sending ? "Sending..." : "Save"}
          </button>

          <button onClick={handleCancelButton} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
