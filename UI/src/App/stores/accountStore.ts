import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Account } from "../Models/Account";


export default class AccountStore{
    accounts: Account[] = [];
    selectAccount: Account | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;
    
    constructor(){
        makeAutoObservable(this)
    }

    loadAccounts = async () => {
        this.loadingInitial = true;
        try {
            const accounts = await agent.Accounts.list();
            // runInAction gets off with MobX-warning when starting the app
            runInAction(() => {
                accounts.forEach(account => {
                    // modify each account-object
                    this.accounts.push(account);
                })
                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

}