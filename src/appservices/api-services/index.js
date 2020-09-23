import {API} from "./types";

export function apiAction({
                              url = "",
                              method = "GET",
                              data = null,
                              accessToken = null,
                              onSuccess = () => {
                              },
                              onFailure = () => {
                              },
                              headersOverride = null
                          }) {
    return {
        type: API,
        payload: {
            url,
            method,
            data,
            accessToken,
            onSuccess,
            onFailure,
            headersOverride
        }
    };
}
