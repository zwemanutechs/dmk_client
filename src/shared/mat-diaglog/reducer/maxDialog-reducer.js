const diagItemActions = (
    state = {
        digOpen: false,
        submitted: false,
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
                submitted: false,
            };
        case "ON_SUBMIT":
            return {
                ...state,
                submitted: true,
            };
        default:
            return state;
    }
};

export default diagItemActions;
