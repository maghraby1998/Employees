const userInfo = (state = null, action) => {
    switch (action.type) {
        case "SET_USER_INFO":
            return action.payload;
        case "RESET_USER_INFO":
            return null;
        default:
            return state;
    }
};

export default userInfo;