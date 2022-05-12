import sidenav from "./sidenav";
import formDisplay from "./formDisplay";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    sidenav,
    formDisplay
})

export default allReducers;