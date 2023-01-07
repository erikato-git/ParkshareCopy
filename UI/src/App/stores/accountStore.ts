import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Account } from "../Models/Account";
import { v4 as uuid } from 'uuid'; 


export default class AccountStore{
    accounts: Account[] = [];
    selectedAccount: Account | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    
    constructor(){
        makeAutoObservable(this)
    }

    loadAccounts = async () => {
        this.setLoadingInitial(true);
        try {
            const accounts = await agent.Accounts.list();
            accounts.forEach(account => {
                // modify each account-object
                this.accounts.push(account);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // Virkelig dårlig idé at navngive to ting i klassen så tæt på hinanden
    selectAccount = (id: string) => {
        this.selectedAccount = this.accounts.find(a => a.id === id);
    }

    cancelSelectedAccount = () => {
        this.selectedAccount = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectAccount(id) : this.cancelSelectedAccount();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createAccount = async (account: Account) => {
        console.log("account: " + account)
        this.loading = true;
        account.id = uuid();
        try {
            await agent.Accounts.create(account);
            runInAction(() => {
                this.accounts.push(account);
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
                this.accounts = [...this.accounts.filter(a => a.id !== account.id), account];
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
                this.accounts = [...this.accounts.filter(a => a.id !== id)];
                if (this.selectedAccount?.id == id) this.cancelSelectedAccount();
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
