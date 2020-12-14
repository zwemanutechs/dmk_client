import {
  OPEN_DIAG,
  CLOSE_DIAG,
} from "../action-constants/maxDialog-actionTypes";
// import { OPEN_DIAG, CLOSE_DIAG, ON_SUBMIT } from "../action-constants/maxDialog-actionTypes";

export const openDialog = (digValue, title) => ({
  type: OPEN_DIAG, // mandatory key
  digValue,
  title,
});

export const closeDialog = (digValue) => ({
  type: CLOSE_DIAG, // mandatory key
  digValue,
});
