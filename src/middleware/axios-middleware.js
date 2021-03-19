import axios from "axios";
import {
  ADDSUCCESS,
  DELETESUCCESS,
  snackError,
  snackSuccess,
  UNHANDELERROR,
  UPDATESUCCESS,
} from "../constants/app-constants";
import { OPEN_SNACK } from "../shared/snackbar/action-constants/snackbar-actionTypes";
import { store } from "../index";
import { BASEURI } from "../constants/api-constants";

export const client = axios.create({
  baseURL: BASEURI,
  // headers: {
  //   AccessToken: localStorage.getItem('access-data'),
  //       //"eyJJZCI6ImUzYzZmODNmLTI0ZjMtNDUzNy05MTE3LWY1ZmJkMGYxMmRmMCIsIlJvbGUiOiI2ODdkOGJlMi0wNDAzLTQ0NTctOWIxYi0xMGQ4YTljNGYxMjcifQ==",
  // },
});

export const mindsphere = axios.create({  
  withCredentials: true,
  crossDomain: true,
  headers:{
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
    'Access-Control-Allow-Credentials': 'true',
    "Content-Type": "application/x-www-form-urlencoded",
    'Content-Security-Policy': "default-src 'self'; script-src 'self' https://dokaiot-fleetmanager.eu1.mindsphere.io 'self'"
  }
});

client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
          error &&
          (error.response.status === 401 || error.response.status === 403)
      ) {
        window.location = "/Forbidden";
      } else {
        store.dispatch({
          type: OPEN_SNACK,
          status: true,
          message: UNHANDELERROR,
          snackType: snackError,
        });
      }
    }
);

/**
 * Make Get Request
 * ***/
export const get = (url) => {
  const accessToken = localStorage.getItem('access-data');
  return client.get(url, {
    headers:{
      AccessToken: accessToken
    }});
};

/**
 * Make Get Request to Other Origin
 * ***/
export const getFromOtherOrigin = (url) => {
  return axios.get(url);
};

/**
 * Make Add Request
 * ***/
export const post = async (url, payload) => {
  payload.CreatedAt = new Date();
  payload.UpdatedAt = new Date();
  const accessToken = localStorage.getItem('access-data');
  const response = await client.post(url, payload, {
    headers:{
      AccessToken: accessToken
    }});
  if (response && response.data.code) {
    store.dispatch({
      type: OPEN_SNACK,
      status: true,
      message: ADDSUCCESS,
      snackType: snackSuccess,
    });
  }
  return response;
};

/**
 * Make Post Request with payload
 * ***/
 export const postWithPayload = async (url, payload) => {
  const accessToken = localStorage.getItem('access-data');
  return await axios.post(url, payload, {
    baseURL: BASEURI,
    headers:{
      AccessToken: accessToken,
      'Content-Type': 'application/json'
    }});
};

/**
 * Make Update Request
 * ***/
export const put = async (url, payload) => {
  payload.UpdatedAt = new Date();
  const accessToken = localStorage.getItem('access-data');
  const response = await client.put(url, payload, {
    headers:{
      AccessToken: accessToken
    }});
  if (response && response.data.code) {
    store.dispatch({
      type: OPEN_SNACK,
      status: true,
      message: UPDATESUCCESS,
      snackType: snackSuccess,
    });
  }
  return response;
};

/**
 * Make Update Request from other origin
 * ***/
export const putToOtherOrigin = (url, payload) => {  
  const response = axios.put(url, payload, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json'
    }});
  return response;
};

/**
 * Make Delete Request
 * ***/
export const deleteSingle = async (url) => {
  const accessToken = localStorage.getItem('access-data');
  const response = await client.delete(url, {
    headers:{
      AccessToken: accessToken
    }});
  if (response && response.data.code) {
    store.dispatch({
      type: OPEN_SNACK,
      status: true,
      message: DELETESUCCESS,
      snackType: snackSuccess,
    });
  }
  return response;
};

/**
 * Make Multiple Records Deletion Request
 * ***/
export const deleteRange = async (url, payload) => {
  const accessToken = localStorage.getItem('access-data');
  const response = await client.post(url, payload, {
    headers:{
      AccessToken: accessToken
    }});
  if (response && response.data.code) {
    store.dispatch({
      type: OPEN_SNACK,
      status: true,
      message: DELETESUCCESS,
      snackType: snackSuccess,
    });
  }
  return response;
};
