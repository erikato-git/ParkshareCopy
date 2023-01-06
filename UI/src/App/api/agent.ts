import axios, { AxiosResponse } from "axios";
import { Account } from "../Models/Account";

// fake delay, for loading animation
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay);
    })
}

// TODO: test om man ikke også kan bruge fetch til samme foremål
axios.defaults.baseURL = 'http://localhost:5000/api';

// fake delay
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        return await Promise.reject(error);
    }
})


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
    list: () => requests.get<Account[]>('/account'),
    details: (id: string) => requests.get<Account>(`/account/${id}`),
    create: (account: Account) => requests.post<void>('account/', account),
    update: (account: Account) => requests.put<void>(`/account/${account.id}`, account),
    delete: (id: string) => axios.delete<void>(`/account/${id}`)
}


const agent = {
    Accounts
}

export default agent;
