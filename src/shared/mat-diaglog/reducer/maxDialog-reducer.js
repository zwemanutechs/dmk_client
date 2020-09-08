const diagItemActions = (
    state = {
        digOpen: false
    },
    action
) => {
    switch (action.type) {
        case "OPEN_DIAG":
            return {
                ...state,
                digOpen: true
            };
        case "CLOSE_DIAG":
            return {
                ...state,
                digOpen: false
            };
        default:
            return state;
    }
};

export default diagItemActions;
