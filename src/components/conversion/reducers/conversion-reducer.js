const conversionItemActions = (
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
        case "CONVERSION_GET":
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

export default conversionItemActions;
