export const inputErrorMessageHandler = (formSubmission, errors, inputName) => {
  let errorMessage;
  let result;

  if (inputName === "name") {
    errorMessage = "Name is required!";
  }
  if (inputName === "startDate") {
    errorMessage = "Date is required!";
  }
  if (inputName === "email") {
    if (errors.email === "empty") {
      errorMessage = "Email is required!";
    } else {
      errorMessage = "Email is Invalid!";
    }
  }
  if (inputName === "attendance") {
    errorMessage = "Attendance is required!";
  }
  if (inputName === "department") {
    errorMessage = "Department is required!";
  }
  if (inputName === "position") {
    errorMessage = "Position is required!";
  }

  if (errors[inputName]) {
    result = (
      <div className="error-container">
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (formSubmission) {
    return result;
  }
};

export const inputBorderHandler = (formSubmission, errors, inputName) => {
  let error;
  if (formSubmission) {
    if (errors[inputName]) {
      error = true;
    } else {
      error = false;
    }
  }

  return error;
};

export const handleErrors = (name, value, errors) => {
  let validMailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (name === "email") {
    if (value.length === 0) {
      errors[name] = "empty";
    } else {
      if (!value.match(validMailFormat)) {
        errors[name] = "invalid";
      } else {
        errors[name] = false;
      }
    }
  } else {
    if (value.length === 0) {
      errors[name] = true;
    } else {
      errors[name] = false;
    }
  }

  return errors;
};

export const handleSubmitting = (errors) => {
  let submit;

  if (
    errors.name ||
    errors.startDate ||
    errors.email ||
    errors.attendacne ||
    errors.department ||
    errors.position
  ) {
    submit = false;
  } else {
    submit = true;
  }

  return submit;
};
