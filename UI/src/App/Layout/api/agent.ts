import axios, { AxiosResponse } from "axios";
import { Account } from "../../Models/Account";

axios.defaults.baseURL = 'http://localhost:5000/api';

// gets all requests
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

// base requests
const requests = {
    // responseBody -> return type
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.get<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.get<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.get<T>(url).then(responseBody),
}

// Generics make it possible to convert responsebody to type Account[]
const Accounts = {
    list: () => requests.get<Account[]>('/account')
}


const agent = {
    Accounts
}

export default agent;
