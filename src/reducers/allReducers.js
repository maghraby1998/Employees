import sidenav from "./sidenav";
import formDisplay from "./formDisplay";
import employees from "./employee";
import { combineReducers } from "redux";
import deleteWindow from "./deleteConfirmationWindow";
import userId from "./userId";

const allReducers = combineReducers({
    sidenav,
    formDisplay,
    employees,
    deleteWindow,
    userId
})

export default allReducers;