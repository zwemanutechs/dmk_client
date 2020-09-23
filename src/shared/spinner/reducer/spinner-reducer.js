const spinnerItemActions = (
    state = {
        spinnerOpen: false,
    },
    action
) => {
    switch (action.type) {
        case "OPEN_SPINNER":
            return {
                ...state,
                spinnerOpen: true,
            };
        case "CLOSE_SPINNER":
            return {
                ...state,
                spinnerOpen: false,
            };
        default:
            return state;
    }
};

export default spinnerItemActions;
