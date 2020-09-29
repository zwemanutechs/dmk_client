const degreasingItemActions = (
    state = {
        data: [],
        page: 0,
        count: 3,
        rowsPerPage: 30,
        loading:true
    },
    action
) => {
    switch (action.type) {
        case "PAINTCABINET_GET":
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

export default degreasingItemActions;
