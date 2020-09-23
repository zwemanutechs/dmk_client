import { OPEN_SPINNER, CLOSE_SPINNER} from '../action-constants/spinner-actionTypes';

export const openSpinner = status => ({
    type: OPEN_SPINNER,
    status,
});

export const closeSpinner = status => ({
    type: CLOSE_SPINNER,
    status
});
