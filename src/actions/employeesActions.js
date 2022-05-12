export const addEmployee = (value) => {
    return {
        type: 'ADD_EMPLOYEE',
        payload: value
    }
};

export const deleteEmployee = (value) => {
    return {
        type: 'DELETE_EMPLOYEE',
        payload: value
    }
};