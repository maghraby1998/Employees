const isFormLoading = (state=false, action) => {
    switch (action.type) {
        case "SET_FORM_LOADING":
            return action.payload
        default:
            return state
    }
};

export default isFormLoading;