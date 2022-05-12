import sidenav from "./sidenav";
import formDisplay from "./formDisplay";
import employees from "./employee";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    sidenav,
    formDisplay,
    employees
})

export default allReducers;