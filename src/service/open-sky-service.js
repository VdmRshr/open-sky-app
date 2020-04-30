import moment from "moment";

export default class OpenSkyService {
    _apiBase = 'https://opensky-network.org/api';

    getEndDate = () => {
        return moment().unix();
    };

    getBeginDate = (timestamp) => {
        return this.getEndDate() - 60 * timestamp * 24;
    };

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Not Fetch ${url}` + `, recived ${res.status}`)
        }
        const body = await res.json();
        return body;
    };

    getArrival = async (airport, timestamp) => {
        const arrival = await this.getResource(`/flights/arrival?airport=${airport}&begin=${this.getBeginDate(timestamp)}&end=${this.getEndDate()}`);
        return arrival;
    };
    getDepartures = async (airport, timestamp) => {
        const departure = await this.getResource(`/flights/departure?airport=${airport}&begin=${this.getBeginDate(timestamp)}&end=${this.getEndDate()}`);
        return departure;
    };


}