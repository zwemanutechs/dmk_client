const lineChartItemActions = (
    state = {
        loading: true,
        data: [],
        legendKeys: []
    },
    action
) => {
    switch (action.type) {
        case 'GET':
            return {
                ...state,
                data: action.data,
                legendKeys: action.legendKey,
                loading: false
            };
        default:
            return state;
    }
};
export default lineChartItemActions;
