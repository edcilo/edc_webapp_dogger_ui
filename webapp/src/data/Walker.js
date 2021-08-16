import axios from 'axios';
import { API } from './../constants';


export default class Walker {
    http;
    baseUrl = API.URL;
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
        return this.http.get(`${this.resource}/users/`, {
            params: {
                role: 'walker'
            }
        });
    }

    getActivities(client_id, {type, start, end}) {
        return this.http.get(`${this.resource}/client/${client_id}/activities/`, {
            params: {
                type, start, end
            }
        });
    }
}
