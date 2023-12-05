import axios from 'axios';

// axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
// let baseUrl = process.env.NODE_ENV === "development" ? 'http://127.0.0.1:8000' : window.location.origin;
let baseUrl = 'http://127.0.0.1:8000';
export default axios.create({
    baseURL: baseUrl
});