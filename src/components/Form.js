import { useState, useEffect } from "react";
import "../css/Form.css";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { inputErrorMessageHandler, inputBorderHandler, handleErrors, handleSubmitting } from "../functions/validation";

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
    email: 'empty',
    department: true,
    position: true,
    attendance: true
  });

  const [formSubmission, setFormSubmission] = useState(false);

    useEffect(() => {
      document.body.style.overflowY = "hidden";
      return () => {
        document.body.style.overflowY = "scroll";
      };
    }, []);

  const handleChange = (e) => {
    let { name, value, type } = e.target;
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

  const handleSubmit = (e) => {

    e.preventDefault();
    setFormSubmission(true);
    if (handleSubmitting(errors)) {
      props.handleEmployees(employee);
      props.handleFormDisplay(false);
    }
  };

  const handleFormDisplay = (e) => {
    props.handleFormDisplay(false);
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

  // const inputBorderHandler = (inputName) => {
  //   return {
  //     border: errors[inputName] ? "none" : "",
  //     outline: errors[inputName] ? "1px solid red" : "",
  //   };
  // }

  let imageDisplay;
  if (employee.image) {
    imageDisplay = <img src={employee.image} style={{ height: "100%" }} />;
  } else {
    imageDisplay = <span className="text-center">Click to upload</span>;
  }

  return (
    <div onClick={handleFormDisplay} className="employee-form-page">
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
            <div className="flex items-center w-full md:w-auto lg:w-[258px] md:mr-[13px]">
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
            <div className="w-full">
              {/* name and date */}
              <div className="grid md:gap-[25.8px] grid-cols-1 md:grid-cols-2">
                {/* name */}
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                  className={inputBorderHandler(formSubmission, errors, "name") ? 'form-input form-input-error' : 'form-input'}
                  onChange={handleChange}
                  id="name"
                  type="text"
                  maxLength={35}
                  name="name"
                />
                {inputErrorMessageHandler(formSubmission, errors, "name")}
                </div>
                {/* date */}
                <div>
                  <label htmlFor="date">Date</label>
                  <input
                  className={inputBorderHandler(formSubmission, errors, "startDate") ? 'form-input form-input-error' : 'form-input'}
                  onChange={handleChange}
                  id="date"
                  type="date"
                  name="startDate"
                />
                {inputErrorMessageHandler(formSubmission ,errors, "startDate")}
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
                  className={inputBorderHandler(formSubmission, errors, "email") ? 'form-input form-input-error' : 'form-input'}
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
            <div className="select-container">
              <select
                className="non-required-selects"
                onChange={handleChange}
                id="office"
                name="office"
              >
                <option value="">Select</option>
                <option value="arabic localizer">Arabic Localizer</option>
                <option value="other">Others</option>
              </select>
              <FontAwesomeIcon className="select-icon" icon={faAngleDown} />
            </div>
          </div>
          {/* attendance and department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-[32px]">
            {/* department */}
            <div md="6">
              <div>
                <label htmlFor="department">Department</label>
                <div className="select-container">
                  <select
                  className={inputBorderHandler(formSubmission, errors, "department") ? 'form-input form-input-error' : 'form-input'}
                    onChange={handleChange}
                    id="depratment"
                    name="department"
                  >
                    <option value="">Select</option>
                    <option value="arabic localizer">Arabic Localizer</option>
                    <option value="astonish office">Astonish Office</option>
                    <option value="groundwork support">
                      Groundwork Support
                    </option>
                    <option value="other">Others</option>
                  </select>
                  <FontAwesomeIcon className="select-icon" icon={faAngleDown} />
                </div>
                {inputErrorMessageHandler(formSubmission, errors, "department")}
              </div>
            </div>
            {/* attendance */}
            <div md="6">
              <div>
                <label htmlFor="attendance">Attendance Profile</label>
                <div className="select-container">
                  <select
                  className={inputBorderHandler(formSubmission, errors, "attendance") ? 'form-input form-input-error' : 'form-input'}
                    onChange={handleChange}
                    id="attendance"
                    name="attendance"
                  >
                    <option value="">Select</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="weekend">Weekend</option>
                    <option value="holiday">Holiday</option>
                  </select>
                  <FontAwesomeIcon className="select-icon" icon={faAngleDown} />
                </div>
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
                <div className="select-container">
                  <select
                    className="non-required-selects"
                    onChange={handleChange}
                    id="role"
                    name="role"
                  >
                    <option value="">Select</option>
                    <option value="employee">Employee</option>
                    <option value="office manager">Office Manager</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="other">Others</option>
                  </select>
                  <FontAwesomeIcon className="select-icon" icon={faAngleDown} />
                </div>
              </div>
            </div>
            {/* position */}
            <div>
              <div>
                <label htmlFor="position">Position</label>
                <div className="select-container">
                  <select
                    className={inputBorderHandler(formSubmission, errors, "position") ? 'form-input form-input-error' : 'form-input'}
                    onChange={handleChange}
                    id="position"
                    name="position"
                  >
                    <option value="">Select</option>
                    <option value="executive">Executive</option>
                    <option value="manager">Manager</option>
                    <option value="operations and production">
                      Operations And Production
                    </option>
                    <option value="other">Others</option>
                  </select>
                  <FontAwesomeIcon className="select-icon" icon={faAngleDown} />
                </div>
                {inputErrorMessageHandler(formSubmission, errors, "position")}
              </div>
            </div>
          </div>
          <Row>
            <Col md="6">
              <div>
                <label htmlFor="manager">Direct Manager</label>
                <div className="select-container">
                  <select
                    className="non-required-selects"
                    onChange={handleChange}
                    id="manager"
                    name="manager"
                  >
                    <option value="">Select Option</option>
                    <option value="mohamed tarek">Mohamed Tarek</option>
                    <option value="eslam ahmed">Eslam Ahmed</option>
                    <option value="khaled youssef">Khaled Youssef</option>
                    <option value="other">Others</option>
                  </select>
                  <FontAwesomeIcon className="select-icon" icon={faAngleDown} />
                </div>
              </div>
            </Col>
          </Row>
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
            {
            employee.workFromHome 
              ? <FontAwesomeIcon
                  className={employee.workFromHome ? 'custom-check-input-icon custom-input-active' : 'custom-check-input-icon'}
                  icon={faCheck}
                />
              : <FontAwesomeIcon
                  className='empty-custom-check-input'
                  icon={faCheck}
                />
            }
            <p className={!employee.workFromHome ? 'check-p-off' : ''}>Allow Employee To Work From Home.</p>
          </label>
          {/* <div className='check-box-container'>
                    <div className='check-input-container'>
                        <input className='check-input' checked={employee.workFromHome} onChange={handleChange} id='workHome' type='checkbox' />
                        <div className='custom-check-input'>
                            <div className='check-input-icon'></div>
                        </div>
                    </div>
                    <label className='check-label' htmlFor='workHome'>Allow Employee To Work From Home</label>
                </div> */}
        </div>
        {/* Work from home */}
        <div className="form-line"></div>
        <div className="form-buttons">
          <button onClick={handleFormDisplay} className="cancel-button">
            Cancel
          </button>
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
};

export default Form;
