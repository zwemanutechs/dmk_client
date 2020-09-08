const itemActions = (
    state = {
        Open: false
    },
    action
) => {
    switch (action.type) {
        case "OPEN_MENU":
            return {
                ...state,
                Open: true
            };
        case "CLOSE_MENU":
            return {
                ...state,
                Open: false
            };
        default:
            return state;
    }
};

export default itemActions;
