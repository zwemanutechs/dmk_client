const rinseDIItemActions = (
    state = {
        rinseDI: [],
        openDialog: false
    },
    action
) => {
    switch (action.type) {
        case "RDI_GET":
            return {
                ...state,
                rinseDI: [...state.rinseDI, action.name]
            };
        case "RDI_OPEN_DIAG":
            return {
                ...state,
                openDialog: true
            };
        default:
            return state;
    }
};

export default rinseDIItemActions;
