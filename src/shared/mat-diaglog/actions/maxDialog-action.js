import { OPEN_DIAG, CLOSE_DIAG } from "../action-constants/maxDialog-actionTypes";

export const openDialog = digValue => ({
    type: OPEN_DIAG, // mandatory key
    digValue
});

export const closeDialog = digValue => ({
    type: CLOSE_DIAG, // mandatory key
    digValue
});
