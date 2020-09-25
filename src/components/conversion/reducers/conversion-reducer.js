const conversionItemActions = (
    state = {
        data: [],
        page: 0,
        count: 1,
        rowsPerPage: 10,
    },
    action
) => {
    switch (action.type) {
        case "CONVERSION_GET":
            return {
                ...state,
                data: action.data.data,
                count: action.data.count
            };

        default:
            return state;
    }
};

export default conversionItemActions;
