import axios from "axios";
import { openSnack } from '../shared/snackbar/actions/snackbar-actions';
import {
    ADDSUCCESS,
    DELETESUCCESS,
    snackError,
    snackSuccess,
    UNHANDELERROR,
    UPDATESUCCESS
} from "../constants/app-constants";
import {OPEN_SNACK} from "../shared/snackbar/action-constants/snackbar-actionTypes";
import {store} from "../index";
import {BASEURI} from "../constants/api-constants";

//const  baseUrl = "https://localhost:44394/backend/";

export const client = axios.create({
    baseURL: BASEURI,
    headers: {
        'AccessToken': 'eyJJZCI6ImUzYzZmODNmLTI0ZjMtNDUzNy05MTE3LWY1ZmJkMGYxMmRmMCIsIlJvbGUiOiI2ODdkOGJlMi0wNDAzLTQ0NTctOWIxYi0xMGQ4YTljNGYxMjcifQ=='
    }
});

client.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
    if(error && (error.response.status === 401 || error.response.status === 403)){
        window.location = '/Forbidden';
    }else{
       store.dispatch({
           type: OPEN_SNACK,
           status:true,
           message: UNHANDELERROR,
           snackType:snackError
       });
    }
});

/**
 * Make Get Request
 * ***/
export const get = (url) => {
    return client.get(url);
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
    const response = await client.post(url, payload);
    if(response && response.data.code){
      if(response && response.data.code){
          store.dispatch({
              type: OPEN_SNACK,
              status:true,
              message: ADDSUCCESS,
              snackType:snackSuccess
          });
      }
  }
  return response;
};

/**
 * Make Update Request
 * ***/
export const put = async (url, payload) => {
    payload.UpdatedAt = new Date();
    const response = await client.put(url, payload);
    if(response && response.data.code){
        if(response && response.data.code){
            store.dispatch({
                type: OPEN_SNACK,
                status:true,
                message: UPDATESUCCESS,
                snackType:snackSuccess
            });
        }
    }
    return response;
};

/**
 * Make Delete Request
 * ***/
export const deleteSingle = async (url) => {
  const response = await client.delete(url);
    if(response && response.data.code){
        if(response && response.data.code){
            store.dispatch({
                type: OPEN_SNACK,
                status:true,
                message: DELETESUCCESS,
                snackType:snackSuccess
            });
        }
    }
    return response;
};

/**
 * Make Multiple Records Deletion Request
 * ***/
export const deleteRange = async (url, payload) => {
  const response = await client.post(url, payload);
    if(response && response.data.code){
        if(response && response.data.code){
            store.dispatch({
                type: OPEN_SNACK,
                status:true,
                message: DELETESUCCESS,
                snackType:snackSuccess
            });
        }
    }
    return response;
};
