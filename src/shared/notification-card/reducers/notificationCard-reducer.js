const notificationCardItemActions = (
    state = {
        loading: true,
        data: {},
        formName:""
    },
    action
) => {
    switch (action.type) {
        case 'NOTIFICATION_GET':
            let data = {...state.data};
            data[action.formName]= action.data;
            return {
                ...state,
                data: data,
                loading: false
            };
        default:
            return state;
    }
};
export default notificationCardItemActions;
