const deleteWindow = (state = false, action) => {
    switch (action.type) {
        case "OPEN_DELETE_WINDOW":
            return true
        case "CLOSE_DELETE_WINDOW":
            return false
        default:
            return state;
    }
}

export default deleteWindow;