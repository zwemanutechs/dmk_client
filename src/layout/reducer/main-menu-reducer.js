const itemActions = (
    state = {
        Open: false,
        menus: [],
        error: false
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
        case "GET_MENU":
            return {
                ...state,
                menus: action.payload
            };
        case "USER_ERROR":
            return {
                ...state,
                Open: false,
                menus: [],
                error: true
            };
        default:
            return state;
    }
};

export default itemActions;
