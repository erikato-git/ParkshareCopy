import { makeAutoObservable } from "mobx"


export default class AccountStore{
    title = 'Hello from MobX'

    constructor(){
        makeAutoObservable(this)
    }

    setTitle = () => {
        this.title = this.title + "!"
    }
}