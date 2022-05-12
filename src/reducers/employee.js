let hardCodedEmployees = [
    {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'absent', department:'random'},
    {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'holiday', department:'random'},
    {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'present', department:'random'},
    {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'present', department:'random'},
    {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'holiday', department:'random'},
    {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'absent', department:'random'},
    {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'holiday', department:'random'},
    {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'holiday', department:'random'},
    {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'holiday', department:'random'},
    {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'holiday', department:'random'},
    {name: 'ahmed', startDate:'2/3/2000', email:'ahmed@gmail.com', position:'random', attendance:'holiday', department:'random'}
]

const employees = (state = hardCodedEmployees, action) => {
    switch (action.type) {
        case "ADD_EMPLOYEE":
            return [...state, action.payload]
        case "DELETE_EMPLOYEE":
            return state.filter( employee => {
                return employee.id != action.payload
            })
        default:
            return state;
    }
};

export default employees;