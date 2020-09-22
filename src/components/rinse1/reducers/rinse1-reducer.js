const rinse1ItemActions = (
    state = {
        data: [],
        page: 0,
        count: 1,
        rowsPerPage: 10,
    },
    action
) => {
    switch (action.type) {
        case "R1_GET":
            return {
                ...state,
                data: action.data.data,
                count: action.data.count
            };

        default:
            return state;
    }
};

export default rinse1ItemActions;
