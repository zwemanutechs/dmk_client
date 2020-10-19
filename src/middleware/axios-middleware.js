import axios from "axios";
const  baseUrl = "https://localhost:44394/backend/";

export const client = axios.create({
    baseURL: baseUrl,
    headers: {
        'AccessToken': 'eyJJZCI6ImUzYzZmODNmLTI0ZjMtNDUzNy05MTE3LWY1ZmJkMGYxMmRmMCIsIlJvbGUiOiI2ODdkOGJlMi0wNDAzLTQ0NTctOWIxYi0xMGQ4YTljNGYxMjcifQ=='
    }
});
