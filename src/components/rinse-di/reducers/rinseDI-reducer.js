const rinseDIItemActions = (
    state = {
        rinseDI: [],
        rinseDIDataSet: {
            phMeter: 0,
            waterGuage: 0,
            createdAt: new Date().toLocaleString(),
            createdBy: 'admin'
        },
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
                openDialog: true,
                rinseDIDataSet:  action.dataSet
            };
        case "RDI_CLOSE_DIAG":
            return {
                ...state,
                openDialog: false,
                rinseDIDataSet: action.rdiModel
            };
        case "RDI_FORM_CHANGE":
            return {
                ...state,
                rinseDIDataSet: action.changesValue,
            };
        case "RDI_SAVE":
            return {
                ...state,
                openDialog: false,
                rinseDIDataSet: {...state.rinseDIDataSet,  rinseDIDataSet: action.rdiModel},
                rinseDI: [...state.rinseDI, action.name]
            };
        default:
            return state;
    }
};

export default rinseDIItemActions;
