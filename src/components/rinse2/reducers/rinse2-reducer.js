const rinse2ItemActions = (
    state = {
        data: [],
        page: 0,
        count: 2,
        rowsPerPage: 20,
        loading:true
    },
    action
) => {
    switch (action.type) {
        case "R2_GET":
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

export default rinse2ItemActions;
