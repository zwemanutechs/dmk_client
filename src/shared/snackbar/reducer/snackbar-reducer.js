import {snackSuccess} from "../../../constants/app-constants";

const snackItemActions = (
    state = {
        snackOpen: false,
        message: '',
        snackType: snackSuccess
    },
    action
) => {
    switch (action.type) {
        case "OPEN_SNACK":
            return {
                ...state,
                snackOpen: true,
                message: action.message,
                snackType: action.snackType
            };
        case "CLOSE_SNACK":
            return {
                ...state,
                snackOpen: false,
            };
        default:
            return state;
    }
};

export default snackItemActions;
