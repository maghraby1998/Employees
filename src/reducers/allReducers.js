import sidenav from "./sidenav";
import formDisplay from "./formDisplay";
import employees from "./employee";
import { combineReducers } from "redux";
import deleteWindow from "./deleteConfirmationWindow";
import userId from "./userId";
import userInfo from "./userInfo";
import numberOfEmployees from "./numberOfEmployees";
import inputsData from "./inputsData";
import isFormLoading from "./isFormLoading";

const allReducers = combineReducers({
  sidenav,
  formDisplay,
  employees,
  deleteWindow,
  userId,
  userInfo,
  numberOfEmployees,
  inputsData,
  isFormLoading,
});

export default allReducers;
