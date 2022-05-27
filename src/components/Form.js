import { useState, useEffect } from "react";
import "../css/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTriangleExclamation,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
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
  getInputsData,
  getUsers,
  addUser,
  updateUser,
} from "../queries/queries";
import { useQuery, useMutation } from "@apollo/client";
import {
  closeFormAndResetUserInfo,
  setUserInfo,
} from "../actions/userInfoAction";
import validationObject from "../functions/updateValidationObject";

const Form = (props) => {
  const userInfo = useSelector((state) => state.userInfo);
  let formDisplay = useSelector((state) => state.formDisplay);

  const [employee, setEmployee] = useState({
    id: userInfo ? userInfo.id : null,
    imagePreview: "",
    user_image: userInfo?.face ? "" : null,
    name: userInfo ? userInfo.name : "",
    phone: userInfo ? userInfo.phone : "",
    startDate: userInfo ? userInfo.starts_at : "",
    email: userInfo ? userInfo.email : "",
    office: userInfo ? userInfo.office?.id : "",
    department: userInfo ? userInfo.department?.id : "",
    attendance: userInfo ? userInfo.attendance_profile?.id : "",
    role: userInfo ? userInfo.role?.id : "",
    position: userInfo ? userInfo.position?.id : "",
    manager: userInfo ? userInfo.manager?.id : "",
    copiedManagers: userInfo ? userInfo.copied_managers : [],
    workFromHome: userInfo ? userInfo.can_work_home : 0,
    companyId: 1,
  });

  useEffect(() => {
    if (userInfo?.face?.path) {
      let { face } = userInfo;
      let url = "https://testing.mawared-hr.com";
      let indexOfUploads = face?.path.indexOf("/uploads");
      let restOfTextAfterUploads = face?.path.slice(
        indexOfUploads,
        face?.path.length
      );
      face = url + restOfTextAfterUploads;
      setEmployee((prev) => {
        return { ...prev, imagePreview: face };
      });
    }
  }, [userInfo]);

  let [
    addAUser,
    { data: add_user_data, error: add_user_error, loading: add_user_loading },
  ] = useMutation(addUser, { errorPolicy: "all" });

  let [
    updateAUser,
    {
      data: update_user_data,
      error: update_user_error,
      loading: update_user_loading,
    },
  ] = useMutation(updateUser, { errorPolicy: "all" });

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

  const {
    data: inputs_data,
    inputs_data_error,
    inputs_data_loading,
  } = useQuery(getInputsData);

  let managers = inputs_data?.managers?.filter((manager) => {
    return !employee.copiedManagers.find((copiedManager) => {
      return copiedManager.id === manager.id;
    });
  });

  let copied_managers = inputs_data?.managers?.filter((copied_manager) => {
    return (
      copied_manager.id != employee.manager &&
      !employee.copiedManagers?.find((copiedManager) => {
        return copied_manager.id === copiedManager.id;
      })
    );
  });

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    // value = value.trim();
    if (type === "checkbox") {
      setEmployee((prev) => {
        return { ...prev, workFromHome: prev.workFromHome === 0 ? 1 : 0 };
      });
    } else {
      setEmployee((prev) => {
        return { ...prev, [name]: value };
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
          return copiedManager.id != id;
        }),
      };
    });
  };

  // useEffect(() => {
  //   console.log(employee);
  // }, [employee]);

  const handleSelectChange = (name, value) => {
    if (name === "copiedManagers") {
      setEmployee((prev) => {
        return {
          ...prev,
          copiedManagers: [...employee.copiedManagers, value],
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
    // if (handleSubmitting(errors)) {
    if (userInfo) {
      let newCopiedManagers = employee.copiedManagers.map((copiedManager) => {
        return copiedManager.id;
      });
      // if (employee.user_image?.length === 0) {
      //   updateAUser({
      //     variables: validationObject(true, newCopiedManagers, employee),
      //     refetchQueries: [getUsers],
      //     onCompleted: (data) => {
      //       if (data?.update_user) {
      //         dispatch(closeFormAndResetUserInfo())
      //       }
      //     },
      //   });
      // } else {
      //   updateAUser({
      //     variables: validationObject(false, newCopiedManagers, employee),
      //     refetchQueries: [getUsers],
      //     onCompleted: (data) => {
      //       if (data?.update_user) {
      //         dispatch(closeFormAndResetUserInfo())
      //       }
      //     },
      //   });
      // }
      let updateVariables = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        starts_at: employee.startDate,
        can_work_home: employee.workFromHome,
        position_id: employee.position,
        user_image: employee.user_image,
        att_profile_id: employee.attendance,
        manager_id: employee.manager,
        department_id: employee.department,
        company_id: 1,
        office_id: employee.office,
        has_credentials: 1,
        copied_managers: newCopiedManagers,
        max_homeDays_per_week: 0,
        flexiable_home: 0,
        can_ex_days: 0,
      };

      if (employee.user_image?.length === 0) {
        delete updateVariables.user_image;
      }

      updateAUser({
        variables: updateVariables,
        refetchQueries: [getUsers],
        onCompleted: (data) => {
          if (data?.update_user) {
            dispatch(closeFormAndResetUserInfo());
          }
        },
      });
    } else {
      addAUser({
        variables: {
          name: employee.name,
          email: employee.email,
          user_image: employee.user_image,
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
        onCompleted: (data) => {
          if (data.store_user_with_user_salary_config) {
            dispatch(closeFormAndResetUserInfo());
          }
        },
      });
    }
    // }
  };

  const [serverSideErrors, setServerSideErrors] = useState();

  useEffect(() => {
    // checking if submit button was clicked and if any errors found, set it to the errors state
    if (formSubmission) {
      if (add_user_error) {
        setServerSideErrors(add_user_error.graphQLErrors[0]);
      }
      if (update_user_error) {
        setServerSideErrors(update_user_error.graphQLErrors[0]);
      }
    }
  }, [add_user_error, update_user_error]);

  // useEffect(() => {
  //   // checking if the data sent from the server is equal to something rather than null to close the form
  //   if (
  //     add_user_data?.store_user_with_user_salary_config ||
  //     update_user_data?.update_user
  //   ) {
  //     dispatch(closeFormAndResetUserInfo())
  //   }
  // }, [add_user_data, update_user_data]);

  const handleImg = (e) => {
    let file = e.target.files[0];
    setEmployee((prev) => {
      return { ...prev, user_image: file };
    });
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setEmployee((prev) => {
          return { ...prev, imagePreview: reader.result };
        });
      });
    } else {
      setEmployee((prev) => {
        return { ...prev, imagePreview: "" };
      });
    }
  };

  const handleCancelButton = () => {
    dispatch(closeFormAndResetUserInfo());
  };

  let imageDisplay;
  if (employee.imagePreview) {
    imageDisplay = (
      <img src={employee.imagePreview} style={{ height: "100%" }} />
    );
  } else {
    imageDisplay = (
      <span className="text-center text-[rgba(40, 104, 174, 0.43)] tracking-widest">
        Click to upload
      </span>
    );
  }

  if (inputs_data_loading) {
    return (
      <h1 className="text-4xl fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center h-full w-full bg-blue-400/50 font-semibold flex flex-col items-center justify-center z-50">
        <FontAwesomeIcon
          className="text-7xl text-blue-500 animate-spin mb-3"
          icon={faSpinner}
        />
        <span className="text-white shadow-lg capitalize">Loading...</span>
      </h1>
    );
  }

  if (inputs_data_error) {
    return (
      <h1 className="text-xl fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center h-full w-full bg-red-500/40 font-semibold flex flex-col items-center justify-center z-50">
        <FontAwesomeIcon
          className="text-7xl text-red-700 mb-3 animate-pulse"
          icon={faTriangleExclamation}
        />
        <span className="text-white shadow-lg bg-red-800 p-3 rounded-lg capitalize mb-3">
          Failed to load the form
        </span>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={() => dispatch(closeForm())}
        >
          Close
        </button>
      </h1>
    );
  }

  const handleDeleteImageButton = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setEmployee((prev) => {
      return { ...prev, imagePreview: "", user_image: null };
    });
  };

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
            <div className=" relative flex items-center w-full md:w-auto lg:min-w-[258px] md:mr-[13px]">
              {employee.user_image || employee.imagePreview ? (
                <FontAwesomeIcon
                  className="absolute z-50 top-1 right-2 text-lg text-red-500"
                  icon={faXmark}
                  onClick={handleDeleteImageButton}
                />
              ) : (
                ""
              )}
              <label htmlFor="imgInput">
                <div className="img-upload-container relative">
                  {imageDisplay}
                  {/* <span>Click to upload</span> */}
                </div>
              </label>
              <input
                onChange={handleImg}
                type="file"
                id="imgInput"
                name="image"
                value={
                  employee.user_image
                    ? "C:\\fakepath\\" + employee.user_image?.name
                    : ""
                }
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
                      serverSideErrors?.extensions?.validation
                        ? serverSideErrors.extensions.validation[
                            "input.user_input.name"
                          ]
                          ? "form-input form-input-error"
                          : "form-input"
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
                  {/* {inputErrorMessageHandler(formSubmission, errors, "name")} */}
                  <p className="error-container">
                    {serverSideErrors?.extensions?.validation
                      ? serverSideErrors.extensions.validation[
                          "input.user_input.name"
                        ]
                      : ""}
                  </p>
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
                      serverSideErrors?.extensions?.validation
                        ? serverSideErrors.extensions.validation[
                            "input.user_salary_config_input.salary_config.start_at"
                          ]
                          ? "form-input form-input-error"
                          : "form-input"
                        : "form-input"
                    }
                    onChange={handleChange}
                    id="date"
                    type="date"
                    name="startDate"
                    value={employee.startDate}
                  />
                  {/* {inputErrorMessageHandler(
                    formSubmission,
                    errors,
                    "startDate"
                  )} */}
                  <p className="error-container">
                    {serverSideErrors?.extensions?.validation
                      ? serverSideErrors.extensions.validation[
                          "input.user_salary_config_input.salary_config.start_at"
                        ]
                      : ""}
                  </p>
                </div>
              </div>
              {/* phone and email */}
              <div className="grid md:gap-[25.8px] grid-cols-1 md:grid-cols-2">
                {/* phone */}
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    className={
                      serverSideErrors?.extensions?.validation
                        ? serverSideErrors.extensions.validation[
                            "input.user_input.phone"
                          ]
                          ? "form-input form-input-error"
                          : "form-input"
                        : "form-input"
                    }
                    onChange={handleChange}
                    id="phone"
                    type="text"
                    name="phone"
                    maxLength={11}
                    value={employee.phone}
                  />
                  <p className="error-container">
                    {serverSideErrors?.extensions?.validation
                      ? serverSideErrors.extensions.validation[
                          "input.user_input.phone"
                        ]
                      : ""}
                  </p>
                </div>
                {/* email */}
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    className={
                      serverSideErrors?.extensions?.validation
                        ? serverSideErrors.extensions.validation[
                            "input.user_input.email"
                          ] ||
                          serverSideErrors.extensions.validation[
                            "input.user_input.force_email"
                          ]
                          ? "form-input form-input-error"
                          : "form-input"
                        : "form-input"
                    }
                    onChange={handleChange}
                    id="email"
                    type="text"
                    name="email"
                    value={employee.email}
                    maxLength={40}
                  />
                  {/* {inputErrorMessageHandler(formSubmission, errors, "email")} */}
                  <p className="error-container">
                    {serverSideErrors?.extensions?.validation
                      ? serverSideErrors.extensions.validation[
                          "input.user_input.email"
                        ] ||
                        serverSideErrors.extensions.validation[
                          "input.user_input.force_email"
                        ]
                      : ""}
                  </p>
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
              options={inputs_data?.company_offices?.data}
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
                  options={inputs_data?.company_departments?.data}
                  name="department"
                  currentValue={userInfo?.department}
                  handleSelectChange={handleSelectChange}
                />
                {/* {inputErrorMessageHandler(formSubmission, errors, "department")} */}
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
                  options={inputs_data?.company_attendance_profiles?.data}
                  name="attendance"
                  currentValue={userInfo?.attendance_profile}
                  handleSelectChange={handleSelectChange}
                />
                {/* {inputErrorMessageHandler(formSubmission, errors, "attendance")} */}
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
                  options={inputs_data?.roles}
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
                  options={inputs_data?.company_positions?.data}
                  name="position"
                  currentValue={userInfo?.position}
                  handleSelectChange={handleSelectChange}
                />
                {/* {inputErrorMessageHandler(formSubmission, errors, "position")} */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-[32px]">
            {/* direct manager */}
            <div>
              <div>
                <label htmlFor="manager">Direct Manager</label>
                <SelectBox
                  options={managers}
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
                  options={copied_managers}
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
            {add_user_loading || update_user_loading ? (
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
            ) : (
              "Save"
            )}
          </button>

          <button onClick={handleCancelButton} className="cancel-button">
            Cancel
          </button>
        </div>
        <h1 className="text-red-500 font-semibold capitalize text-center">
          {serverSideErrors?.message === "Internal server error"
            ? `${serverSideErrors.message}!`
            : ""}
        </h1>
      </form>
    </div>
  );
};

export default Form;
