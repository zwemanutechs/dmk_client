const passivationItemActions = (
    state = {
        data: [],
        page: 0,
        count: 3,
        rowsPerPage: 30,
    },
    action
) => {
    switch (action.type) {
        case "PASSIVATION_GET":
            return {
                ...state,
                data: action.data.data,
                count: action.data.count
            };

        default:
            return state;
    }
};

export default passivationItemActions;
