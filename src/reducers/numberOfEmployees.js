const numberOfEmployees = (state = null, action) => {
  switch (action.type) {
    case "SET_NUMBER_OF_EMPLOYEES":
      return action.payload;
    default:
      return state;
  }
};

export default numberOfEmployees;