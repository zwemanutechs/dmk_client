const degreasingItemActions = (
    state = {
        data: [],
        page: 0,
        count: 3,
        rowsPerPage: 30,
    },
    action
) => {
    switch (action.type) {
        case "PAINTBOOTH_GET":
            return {
                ...state,
                data: action.data.data,
                count: action.data.count
            };

        default:
            return state;
    }
};

export default degreasingItemActions;
