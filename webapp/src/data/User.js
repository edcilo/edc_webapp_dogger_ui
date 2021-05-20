import axios from 'axios';
import { API } from './../constants';

export default class User {
    http;
    baseUrl = API.URL;
    resource = '/api/v1';
    timeout = API.TIMEOUT;

    constructor() {
        this.http = axios.create({
            baseURL: this.baseUrl,
            timeout: this.timeout,
        });
    }

    login(username, password) {
        return this.http.post(`${this.resource}/token/`, {
            username,
            password
        })
    }

    decode(token) {
        const base64Data = token.split('.')[1];
        const base64 = base64Data.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}
