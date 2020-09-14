import { OPEN_SNACK, CLOSE_SNACK} from '../action-constants/snackbar-actionTypes';

export const openSnack = (status, message, snackType) => ({
    type: OPEN_SNACK, // mandatory key
    status,
    message,
    snackType
});

export const closeSnack = status => ({
    type: CLOSE_SNACK, // mandatory key
    status
});
