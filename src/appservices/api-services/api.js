import { API_START, API_END, ACCESS_DENIED, API_ERROR } from "./types";
import { OPEN_SPINNER,CLOSE_SPINNER } from "../../shared/spinner/action-constants/spinner-actionTypes";

export const apiStart = () => ({
  type: OPEN_SPINNER
});

export const apiEnd = () => ({
  type: CLOSE_SPINNER,
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: {
    url
  }
});

export const apiError = error => ({
  type: API_ERROR,
  error
});
