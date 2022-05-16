import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { addEmployee } from "../actions/employeesActions";
import SelectBox from "./SelectBox";

const Form = (props) => {
  const [employee, setEmployee] = useState({
    id: "",
    image: "",
    name: "",
    phone: "",
    startDate: "",
    email: "",
    office: "",
    department: "",
    attendance: "",
    role: "",
    position: "",
    manager: "",
    workFromHome: false,
  });

  const [errors, setErrors] = useState({
    name: true,
    startDate: true,
    email: "empty",
    department: true,
    position: true,
    attendance: true,
  });

  const dispatch = useDispatch();
  const [formSubmission, setFormSubmission] = useState(false);

  const positions = [
    "executive",
    "manager",
    "operations and production",
    "others",
  ];
  const attendance = ["present", "absent", "weekend", "holiday"];
  const office = ["arabic localizer", "others"];
  const department = [
    "arabic localizer",
    "astonish office",
    "groudnwork support",
    "others",
  ];
  const role = ["employee", "office manager", "receptionist", "others"];
  const directManager = [
    "mohamed tarek",
    "eslam ahmed",
    "khaled youssef",
    "others",
  ];

  const handleChange = (e) => {
    // console.log(employee);
    let { name, value, type } = e.target;
    value = value.trim();
    if (type === "checkbox") {
      setEmployee((prev) => {
        return { ...prev, workFromHome: !prev.workFromHome };
      });
    } else {
      setEmployee((prev) => {
        return { ...prev, [name]: value, id: Math.random() };
      });
    }

    let updatedErrors = handleErrors(name, value, errors);

    setErrors(updatedErrors);
  };

  const handleSelectChange = (name, value) => {
    setEmployee((prev) => {
      return { ...prev, [name]: value };
    });
    if (value) {
      setErrors((prev) => {
        return { ...prev, [name]: false };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmission(true);
    if (handleSubmitting(errors)) {
      dispatch(addEmployee(employee));
      dispatch(closeForm());
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
    dispatch(closeForm());
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
    <div onClick={() => dispatch(closeForm())} className="employee-form-page">
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
              options={office}
              name="office"
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
                  options={department}
                  name="department"
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
                  options={attendance}
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
                  options={role}
                  name="role"
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
                  options={positions}
                  name="position"
                  handleSelectChange={handleSelectChange}
                />
                {inputErrorMessageHandler(formSubmission, errors, "position")}
              </div>
            </div>
          </div>
          {/* direct manager */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-[32px]">
            <div>
              <div>
                <label htmlFor="manager">Direct Manager</label>
                <SelectBox
                  options={directManager}
                  name="manager"
                  handleSelectChange={handleSelectChange}
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
          <button className="submit-button">Save</button>

          <button onClick={handleCancelButton} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
