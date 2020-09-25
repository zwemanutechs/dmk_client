import {accessDenied, apiEnd, apiError} from "../appservices/api-services/api";

const apiMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== 'API') {
        return next(action);
    }
    // This is an api request

    // Find the request URL and compose request options from meta
    const {url} = action.meta;
    const fetchOptions = Object.assign({}, action.meta);

    // Make the request
    fetch(url, fetchOptions)
        // convert the response to json
        .then(resp => resp.json())
        .then(json => {
            if (typeof action.meta.onSuccess === 'function') {
                store.dispatch(action.meta.onSuccess(json));
            }
            return json; // For the next promise in the chain
        }).catch(error => {
            console.log(error);
        store.dispatch(apiError(error));
        if (typeof action.meta.onFailure === 'function') {
            store.dispatch(action.meta.onFailure(error));
        }
        if (error.response && error.response.status === 403) {
            store.dispatch(accessDenied(window.location.pathname));
        }
    });
};
export default apiMiddleware;
