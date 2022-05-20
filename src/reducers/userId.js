const userId = (state="", action) => {
    switch (action.type) {
        case "CHANGE_USER_ID":
            return action.payload
        default:
            return state;
    }
}

export default userId;