import axios from "axios";
const  baseUrl = "https://localhost:44394/backend/";

export const client = axios.create({
    baseURL: baseUrl,
});
