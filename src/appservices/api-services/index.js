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
                              label = "",
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
            label,
            headersOverride
        }
    };
}
