export const insertUserId = (value) => {
    return{
        type: "CHANGE_USER_ID",
        payload: value
    }
};