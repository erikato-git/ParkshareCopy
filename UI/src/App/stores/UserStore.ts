import { makeAutoObservable, reaction } from "mobx";
import agent from "../api/agent";
import { User } from "../Models/user";
import { router } from "../router/Routes";
import { store } from "./store";

export default class UserStore
{
    user: User | null = null;
    token: string | null = localStorage.getItem('jwt');

    constructor(){
        makeAutoObservable(this);

        // When we log in we set jwt localstorage. reaction will only run when token changes 
        reaction(
            () => this.token,
            token => {
                if (token){
                    localStorage.setItem('jwt',token);
                }else{
                    localStorage.removeItem('jwt');
                }
            }
        )
    }

    // recognized if a user is logged in
    get isLoggedIn()
    {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.User.login(creds);
        }catch (error){

            throw error;
        }
    }

    logout = () => {
        store.CommonStore.SetToken(null);
        localStorage.removeItem('jwt');     // Never store a token in localstorage, usa a MobX store in stead
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.User.current();
            
        } catch (error) {
            console.log(error)
        }
    }

}

