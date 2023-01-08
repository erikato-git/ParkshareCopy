import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Account } from "../Models/Account";
import { router } from "../router/Routes";

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
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    // AxiosError -> AxiosResponse, har data og status, derfor over-rule's typescript error-markering
    const {data, status} = error.response as AxiosResponse;
    switch(status){
        case 400:
            toast.error('bad request');
            if (data.errors){
                const modalStateErrors = [];
                for (const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                // Throw an array of errors that is much easier to work with
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            toast.error('server error');
            break;
    }
    return Promise.reject(error);
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
