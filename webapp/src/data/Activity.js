import axios from 'axios';
import { API } from './../constants';


export default class Activity {
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

    getAll({type, start, end}) {
        return this.http.get(`${this.resource}/activities/`, {
            params: {
                type, start, end
            }
        });
    }

    create({type, schedule_at, note, client}) {
        return this.http.post(`${this.resource}/activity/`, {
            type, schedule_at, client, note
        })
    }

    update(activity, {type, schedule_at, note, client}) {
        const id = activity.id
        return this.http.put(`${this.resource}/activity/${id}/`, {
            type, schedule_at, client, note
        })
    }

    delete(activity) {
        const id = activity.id
        return this.http.delete(`${this.resource}/activity/${id}/`)
    }
}
