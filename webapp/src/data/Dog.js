import axios from 'axios';
import { API } from './../constants';


export default class Dog {
    http;
    baseUrl = API.URL_DOGGER;
    resource = '/api/v1';
    timeout = API.TIMEOUT;

    constructor(token) {
        this.http = axios.create({
            baseURL: this.baseUrl,
            timeout: this.timeout,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    getAll() {
        return this.http.get(`${this.resource}/dogs/`);
    }
}
