import { closeForm } from "./formDisplayActions";

export const setUserInfo = (value) => {
    return {
        type: 'SET_USER_INFO',
        payload: value
    }
};

export const resetUserInfo = (value) => {
    return {
        type: 'RESET_USER_INFO',
        payload: value
    }
};

export const closeFormAndResetUserInfo = () => {
    return ( (dispatch, getState) => {
        dispatch(closeForm());
        dispatch(resetUserInfo(null));
    })
};