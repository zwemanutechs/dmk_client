import { API_START, API_END, ACCESS_DENIED, API_ERROR } from "./types";

export const apiStart = () => ({
  type: API_START
});

export const apiEnd = () => ({
  type: API_END,
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
