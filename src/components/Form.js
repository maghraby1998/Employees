import { useState, useEffect } from "react";
import "../css/Form.css";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";

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
    name: "",
    startDate: "",
    email: "",
    invalidEmail: false,
    department: "",
    position: "",
    attendance: "",
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    // console.log(value.length)
    if (type === "checkbox") {
      setEmployee((prev) => {
        return { ...prev, workFromHome: !prev.workFromHome };
      });
    } else {
      setEmployee((prev) => {
        return { ...prev, [name]: value, id: Math.random() };
      });
    }

    switch (name) {
      case "name":
        if (value.length > 0) {
          setErrors((prev) => {
            return { ...prev, name: "" };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, name: "emptyName" };
          });
        }
        break;
      case "startDate":
        if (value.length > 0) {
          setErrors((prev) => {
            return { ...prev, startDate: "" };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, startDate: "emptyDate" };
          });
        }
        break;
      case "email":
        if (value.length > 0) {
          if (value.indexOf("@") < 0) {
            setErrors((prev) => {
              return { ...prev, invalidEmail: true };
            });
          } else {
            setErrors((prev) => {
              return { ...prev, invalidEmail: false };
            });
          }
          setErrors((prev) => {
            return { ...prev, email: "" };
          });
          // if (value.indexOf('Q') < 0){
          //     setErrors( prev => {
          //         return {...prev, invalidEmail: true}
          //     })
          // } else {
          //     setErrors( prev => {
          //         return {...prev, email: ''}
          //     })
          // }
        } else {
          setErrors((prev) => {
            return { ...prev, email: "emptyEmail" };
          });
          setErrors((prev) => {
            return { ...prev, invalidEmail: false };
          });
        }
        break;
      case "position":
        if (value.length > 0) {
          setErrors((prev) => {
            return { ...prev, position: "" };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, position: "emptyPosition" };
          });
        }
        break;
      case "attendance":
        if (value.length > 0) {
          setErrors((prev) => {
            return { ...prev, attendance: "" };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, attendance: "emptyAttendance" };
          });
        }
        break;
      case "department":
        if (value.length > 0) {
          setErrors((prev) => {
            return { ...prev, department: "" };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, department: "emptyDepartment" };
          });
        }
        break;
    }
  };

  const isEmptyName = () => {
    if (employee.name.length === 0) {
      setErrors((prev) => {
        return { ...prev, name: "emptyName" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, name: "" };
      });
    }
  };
  const isEmptyDate = () => {
    if (employee.startDate.length === 0) {
      setErrors((prev) => {
        return { ...prev, startDate: "emptyDate" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, startDate: "" };
      });
    }
  };
  const isEmptyEmail = () => {
    if (employee.email.length === 0) {
      setErrors((prev) => {
        return { ...prev, email: "emptyEmail" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, email: "" };
      });
    }
  };
  const isValidEmail = () => {
    if (employee.email.length > 0 && employee.email.indexOf("@") < 0) {
      setErrors((prev) => {
        return { ...prev, invalidEmail: true };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, invalidEmail: false };
      });
    }
  };
  const isEmptyAttendance = () => {
    if (employee.attendance.length === 0) {
      setErrors((prev) => {
        return { ...prev, attendance: "emptyAttendance" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, attendance: "" };
      });
    }
  };
  const isEmptyDepartment = () => {
    if (employee.department.length === 0) {
      setErrors((prev) => {
        return { ...prev, department: "emptyDepartment" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, department: "" };
      });
    }
  };
  const isEmptyPosition = () => {
    if (employee.position.length === 0) {
      setErrors((prev) => {
        return { ...prev, position: "emptyPosition" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, position: "" };
      });
    }
  };

  const checkValidation = () => {
    isEmptyName();
    isEmptyDate();
    isEmptyEmail();
    isValidEmail();
    isEmptyDepartment();
    isEmptyAttendance();
    isEmptyPosition();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkValidation();
    let { name, startDate, email, attendance, position, department } = employee;
    if (
      name.length > 0 &&
      startDate.length > 0 &&
      email.length > 0 &&
      email.indexOf("@") >= 0 &&
      attendance.length > 0 &&
      position.length > 0 &&
      department.length > 0
    ) {
      props.handleEmployees(employee);
      props.handleFormDisplay(false);
    }
  };

  const handleFormDisplay = (e) => {
    // e.preventDefault();
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

  let imageDisplay;
  if (employee.image) {
    imageDisplay = <img src={employee.image} style={{ height: "100%" }} />;
  } else {
    imageDisplay = <span>Click to upload</span>;
  }

  return (
    <div onClick={handleFormDisplay} className="employee-form-page">
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="employee-form"
      >
        <h2 className="form-header">NEW EMPLOYEE</h2>
        {/* personal info */}
        <div className="form-category">
          <h3 className="category-header">Personal Info</h3>
          <div className="category-header-line"></div>
          <div className="min-h-[112px] grid gap-2 grid-cols-1 md:grid-cols-10">
            {/* image */}
            <div className="flex items-center md:col-span-2">
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
            <div className="md:col-span-8 grid grid-cols-1">
              {/* name and date */}
              <div className="grid md:gap-3 grid-cols-1 md:grid-cols-2">
                {/* name */}
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                  style={{
                    border: errors.name.length > 0 ? "none" : "",
                    outline: errors.name.length > 0 ? "1px solid red" : "",
                  }}
                  onChange={handleChange}
                  id="name"
                  type="text"
                  maxLength={35}
                  name="name"
                />
                {errors.name === "emptyName" ? (
                  <div className="error-container">
                    <p>Name is required!</p>
                  </div>
                ) : (
                  ""
                )}
                </div>
                {/* date */}
                <div>
                  <label htmlFor="date">Date</label>
                  <input
                  style={{
                    border: errors.startDate.length > 0 ? "none" : "",
                    outline: errors.startDate.length > 0 ? "1px solid red" : "",
                  }}
                  onChange={handleChange}
                  id="date"
                  type="date"
                  name="startDate"
                />
                {errors.startDate === "emptyDate" ? (
                  <div className="error-container">
                    <p>Date is required!</p>
                  </div>
                ) : (
                  ""
                )}
                </div>
              </div>
              {/* phone and email */}
              <div className="grid md:gap-3 grid-cols-1 md:grid-cols-2">
                {/* phone */}
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
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
                  style={{
                    border:
                      errors.email.length > 0 || errors.invalidEmail
                        ? "none"
                        : "",
                    outline:
                      errors.email.length > 0 || errors.invalidEmail
                        ? "1px solid red"
                        : "",
                  }}
                  onChange={handleChange}
                  id="email"
                  type="text"
                  name="email"
                  maxLength={40}
                />
                {errors.email === "emptyEmail" ? (
                  <div className="error-container">
                    <p>Email is required!</p>
                  </div>
                ) : (
                  ""
                )}
                {errors.invalidEmail ? (
                  <div className="error-container">
                    <p>Invalid Email!</p>
                  </div>
                ) : (
                  ""
                )}
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
                style={{
                  color: employee.office ? "black" : "grey",
                  paddingLeft: "24px",
                }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-3">
            {/* department */}
            <div md="6">
              <div>
                <label htmlFor="department">Department</label>
                <div className="select-container">
                  <select
                    style={{
                      border: errors.department.length > 0 ? "none" : "",
                      color: employee.department ? "black" : "grey",
                      paddingLeft: "24px",
                      outline:
                        errors.department.length > 0 ? "1px solid red" : "",
                    }}
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
                {errors.department === "emptyDepartment" ? (
                  <div className="select-error-container error-container">
                    <p>Department is required!</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* attendance */}
            <div md="6">
              <div>
                <label htmlFor="attendance">Attendance Profile</label>
                <div className="select-container">
                  <select
                    style={{
                      border: errors.attendance.length > 0 ? "none" : "",
                      color: employee.attendance ? "black" : "grey",
                      paddingLeft: "24px",
                      outline:
                        errors.attendance.length > 0 ? "1px solid red" : "",
                    }}
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
                {errors.attendance === "emptyAttendance" ? (
                  <div className="select-error-container error-container">
                    <p>Attendance is required!</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* role and position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-3">
            {/* role */}
            <div>
              <div>
                <label htmlFor="role">Role</label>
                <div className="select-container">
                  <select
                    style={{
                      color: employee.role ? "black" : "grey",
                      paddingLeft: "24px",
                    }}
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
                    style={{
                      border: errors.position.length > 0 ? "1px solid red" : "",
                      outline: errors.position.length > 0 ? "none" : "",
                      color: employee.position ? "black" : "grey",
                      paddingLeft: "24px",
                    }}
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
                {errors.position === "emptyPosition" ? (
                  <div className="select-error-container error-container">
                    <p>Position is required!</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <Row>
            <Col md="6">
              <div>
                <label htmlFor="manager">Direct Manager</label>
                <div className="select-container">
                  <select
                    style={{
                      color: employee.manager ? "black" : "grey",
                      paddingLeft: "24px",
                    }}
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
            <div
              className={
                employee.workFromHome
                  ? "custom-check-input custom-check-input-active"
                  : "custom-check-input"
              }
            >
              {employee.workFromHome ? (
                <FontAwesomeIcon
                  className="custom-check-input-icon"
                  icon={faCheck}
                />
              ) : (
                ""
              )}
            </div>
            Allow Employee To Work From Home.
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
        {/* <hr></hr> */}
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
