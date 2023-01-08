import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Account } from "../Models/Account";
import { v4 as uuid } from 'uuid'; 


export default class AccountStore{
    accountRegistry = new Map<string, Account>();
    accounts: Account[] = [];
    selectedAccount: Account | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    
    constructor(){
        // MobX, set components to observer that uses resources from this class
        makeAutoObservable(this)
    }

    loadAccounts = async () => {
        this.setLoadingInitial(true);
        try {
            const accounts = await agent.Accounts.list();
            accounts.forEach(account => {
                this.setAccounts(account);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false);
        }
    }


    loadAccount = async (id:string) => {
        let account = this.getAccount(id);
        if(account){
            this.selectedAccount = account;
            return account;
        } 
        else{
            this.setLoadingInitial(true);
            try {
                account = await agent.Accounts.details(id);
                this.setAccounts(account);
                runInAction(() => { this.selectedAccount = account });
                this.selectedAccount = account;
                this.setLoadingInitial(false);
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false);
            }
        }
    }

    private setAccounts = (account: Account) => {
        // Not supposed to be an array and a map
        this.accounts.push(account);
        this.accountRegistry.set(account.id, account);
    }

    private getAccount = (id: string) => {
        return this.accountRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createAccount = async (account: Account) => {
        console.log("account: " + account)
        this.loading = true;
        account.id = uuid();
        try {
            await agent.Accounts.create(account);
            runInAction(() => {
                // this.accounts.push(account);
                this.accountRegistry.set(account.id, account);
                this.selectedAccount = account;
                this.editMode = false;
                this.loading = false;
            })
            console.log("Create succeeded")
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAccount = async (account: Account) => {
        this.loading = true;
        try {
            await agent.Accounts.update(account)
            runInAction(() => {
                // create a new array and pass in new account
                // this.accounts = [...this.accounts.filter(a => a.id !== account.id), account];
                this.accountRegistry.set(account.id, account);
                this.selectedAccount = account;
                this.editMode = false;
                this.loading = false;
            })
            console.log("Update succeeded")
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteAccount = async (id: string) => {
        this.loading = true;

        try {
            await agent.Accounts.delete(id);
            runInAction(() => {
                // this.accounts = [...this.accounts.filter(a => a.id !== id)];
                this.accountRegistry.delete(id);
                this.loading = false;
            })            
            console.log("Delete succeeded")
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }


}


// runInAction gets off with MobX-warning when starting the app
