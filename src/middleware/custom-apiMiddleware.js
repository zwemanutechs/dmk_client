import {accessDenied, apiError} from "../appservices/api-services/api";
import axios from "axios";
const  baseUrl = "https://localhost:44394/backend/";

const client = axios.create({
    baseURL: baseUrl,

});

const apiMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== 'API') {
        return next(action);
    }
    // This is an api request
    // Find the request URL and compose request options from meta
    const {url} = action.meta;

    if(action.meta.method === 'FETCH'){
        // Make the request
        client.get(url)
            // Accessing Call Back
            .then((response) => {
                // Success Callback
                if(response && response.status === 200){
                    if (typeof action.meta.onSuccess === 'function') {
                        store.dispatch(action.meta.onSuccess(response.data));
                    }
                    return response.data; // For the next promise in the chain
                }
                // Unauthorized Callback
                else if(response && response.status === 403){
                    store.dispatch(accessDenied(window.location.pathname));
                }
                // UnHandle Exception Callback
                else{
                    if (typeof action.meta.onFailure === 'function') {
                        store.dispatch(action.meta.onFailure(response.data));
                    }
                }
        })
            .catch((err) => {
            if(err){
                if (typeof action.meta.onFailure === 'function') {
                    store.dispatch(action.meta.onFailure(err));
                }
            }
        });
    }
    else if(action.meta.method === 'CREATE'){
        // Make the PUT request
        client.post(url, action.payload)
            // Accessing Call Back
            .then((response) => {
                // Success Callback
                if(response && response.status === 200){
                    if (typeof action.meta.onSuccess === 'function') {
                        store.dispatch(action.meta.onSuccess(response.data));
                    }
                    return response.data; // For the next promise in the chain
                }
                // Unauthorized Callback
                else if(response && response.status === 403){
                    store.dispatch(accessDenied(window.location.pathname));
                }
                // UnHandle Exception Callback
                else{
                    if (typeof action.meta.onFailure === 'function') {
                        store.dispatch(action.meta.onFailure(response.data));
                    }
                }
            })
            .catch((err) => {
            if(err){
                if (typeof action.meta.onFailure === 'function') {
                    store.dispatch(action.meta.onFailure(err));
                }
            }
        });
    }
    else if(action.meta.method === 'UPDATE'){
        // Make the PUT request
        client.put(url, action.payload)
            // Accessing Call Back
            .then((response) => {
                // Success Callback
                if(response && response.status === 200){
                    if (typeof action.meta.onSuccess === 'function') {
                        store.dispatch(action.meta.onSuccess(response.data));
                    }
                    return response.data; // For the next promise in the chain
                }
                // Unauthorized Callback
                else if(response && response.status === 403){
                    store.dispatch(accessDenied(window.location.pathname));
                }
                // UnHandle Exception Callback
                else{
                    if (typeof action.meta.onFailure === 'function') {
                        store.dispatch(action.meta.onFailure(response.data));
                    }
                }
            })
            .catch((err) => {
            if(err){
                if (typeof action.meta.onFailure === 'function') {
                    store.dispatch(action.meta.onFailure(err));
                }
            }
        });
    }else{
        // Make the PUT request
        client.delete(url, action.payload)
            // Accessing Call Back
            .then((response) => {
                // Success Callback
                if(response && response.status === 200){
                    if (typeof action.meta.onSuccess === 'function') {
                        store.dispatch(action.meta.onSuccess(response.data));
                    }
                    return response.data; // For the next promise in the chain
                }
                // Unauthorized Callback
                else if(response && response.status === 403){
                    store.dispatch(accessDenied(window.location.pathname));
                }
                // UnHandle Exception Callback
                else{
                    if (typeof action.meta.onFailure === 'function') {
                        store.dispatch(action.meta.onFailure(response.data));
                    }
                }
            })
            .catch((err) => {
            if(err){
                if (typeof action.meta.onFailure === 'function') {
                    store.dispatch(action.meta.onFailure(err));
                }
            }
        });
    }
    // // Make the request
    // fetch(baseUrl+url, fetchOptions)
    //     // convert the response to json
    //     .then(resp => resp.json())
    //     .then(json => {
    //         if (typeof action.meta.onSuccess === 'function') {
    //             store.dispatch(action.meta.onSuccess(json));
    //         }
    //         return json; // For the next promise in the chain
    //     }).catch(error => {
    //     store.dispatch(apiError(error));
    //     if (typeof action.meta.onFailure === 'function') {
    //         store.dispatch(action.meta.onFailure(error));
    //     }
    //     if (error.response && error.response.status === 403) {
    //         store.dispatch(accessDenied(window.location.pathname));
    //     }
    // });
};
export default apiMiddleware;
