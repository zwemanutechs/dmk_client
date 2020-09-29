const rinse1ItemActions = (
    state = {
        data: [],
        page: 0,
        count: 1,
        rowsPerPage: 10,
        loading:true
    },
    action
) => {
    switch (action.type) {
        case "R1_GET":
            return {
                ...state,
                data: action.data.data,
                count: action.data.count,
                loading: false
            };
        default:
            return state;
    }
};

export default rinse1ItemActions;
