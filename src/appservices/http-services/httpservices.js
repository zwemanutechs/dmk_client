
const baseUrl = "https://localhost:44394/backend";

export const get = (url, options) => {
    let requestUrl = baseUrl + url;
    return fetch(requestUrl, options);
};


