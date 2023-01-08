import { observer } from "mobx-react-lite/";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Segment, Form, Button, AccordionPanel } from "semantic-ui-react";
import LoadingComponent from "../../../../App/Layout/LoadingComponent";
import { Account } from "../../../../App/Models/Account";
import { useStore } from "../../../../App/stores/store";
import {v4 as uuid} from 'uuid';


// makes oberserver because we wanna track 'loading' from accountStore
export default observer(function AccountForm(){
    const {accountStore} = useStore();
    const {selectedAccount, createAccount, updateAccount, loading, loadAccount, loadingInitial} = accountStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [account, setAccount] = useState<Account>({
        id: '',
        name: '',
        email: '',
        address: '',
        password: '',
    })

    useEffect(() => {
        // account! er et hack for at undgå at erklære account med typen 'Account | undefined'
        if(id) loadAccount(id).then(account => setAccount(account!));
    }, [id, loadAccount])

    function handleSubmit(){
        console.log("handleSubmit: " + account.id)
        if(!account.id){
            account.id = uuid();
            createAccount(account).then(() => navigate(`/accounts/${account.id}`))
        }else {
            updateAccount(account).then(() => navigate(`/accounts/${account.id}`));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        // Make sure name is refering to variable 'name' above not 'name' below
        setAccount({...account, [name]: value});
    }

    if (loadingInitial) return <LoadingComponent content="Loading accounts ..." />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="name" value={account.name} name='name' onChange={handleInputChange}/>
                <Form.Input placeholder="email" value={account.email} name='email' onChange={handleInputChange}/>
                <Form.TextArea placeholder="address" value={account.address} name='address' onChange={handleInputChange}/>
                <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                <Button floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
})


