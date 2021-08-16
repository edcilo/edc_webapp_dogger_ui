import axios from 'axios';
import { API } from './../constants';


export default class Reservation {
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
        return this.http.get(`${this.resource}/reservation/`);
    }

    create({walker, dog, schedule, date}) {
        return this.http.post(`${this.resource}/reservation/`, {
            walker, dog, schedule, date
        })
    }

    update(activity, {type, schedule_at, note, client}) {
        const id = activity.id
        return this.http.put(`${this.resource}/reservation/${id}/`, {
            type, schedule_at, client, note
        })
    }

    delete(reservation) {
        const id = reservation.id
        return this.http.delete(`${this.resource}/reservation/${id}/`)
    }
}
