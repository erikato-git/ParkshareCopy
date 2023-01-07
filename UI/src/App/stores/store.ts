import { createContext, useContext } from "react";
import AccountStore from "./accountStore";


interface Store {
    accountStore: AccountStore
}

// new stores is created from this object and can be accessed by createContext
export const store: Store = {
    accountStore: new AccountStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}

