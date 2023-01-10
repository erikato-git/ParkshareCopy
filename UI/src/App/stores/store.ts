import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import UserStore from "./UserStore";


interface Store {
    accountStore: AccountStore,
    UserStore: UserStore
}

// new stores is created from this object and can be accessed by createContext
export const store: Store = {
    accountStore: new AccountStore(),
    UserStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}

