import {API} from "../appservices/api-services/types";
import {accessDenied, apiError, apiStart, apiEnd} from "../appservices/api-services/api";

const baseUrl = "";
    //"/backend";
    //"https://localhost:44394/backend";
const apiMiddleware = ({dispatch}) => next => action => {
    next(action);

    if (action.type !== 'API') return;

    const {
        url,
        method,
        data,
        // accessToken,
        onSuccess,
        onFailure,
        label,
        // headers
    } = action.payload;


    // if (label) {
        dispatch(apiStart(label));
    // }

    fetch(baseUrl + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    }).then(response => response.json())
        .then(({data}) => {
            dispatch(onSuccess(data));
        })
        .catch(error => {
            dispatch(apiError(error));
            dispatch(onFailure(error));

            if (error.response && error.response.status === 403) {
                dispatch(accessDenied(window.location.pathname));
            }
        })
        .finally(() => {
            // if (label) {
                dispatch(apiEnd(label));
            // }
        });
};

export default apiMiddleware;
