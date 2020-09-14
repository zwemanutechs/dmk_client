const diagItemActions = (
    state = {
        digOpen: false,
        title: ''
    },
    action
) => {
    switch (action.type) {
        case "OPEN_DIAG":
            return {
                ...state,
                digOpen: true,
                title: action.title
            };
        case "CLOSE_DIAG":
            return {
                ...state,
                digOpen: false,
            };
        default:
            return state;
    }
};

export default diagItemActions;
