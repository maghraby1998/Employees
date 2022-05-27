const inputsData = (state=null, action) => {
    switch (action.type) {
        case "SET_INPUTS_DATA":
            return action.payload;
        default: 
            return state;
    }
};

export default inputsData;