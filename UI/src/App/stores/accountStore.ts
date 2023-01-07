import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Account } from "../Models/Account";


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

}


// runInAction gets off with MobX-warning when starting the app
