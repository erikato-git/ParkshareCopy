import { ChangeEvent, useState } from "react";
import { Segment, Form, Button, AccordionPanel } from "semantic-ui-react";
import { isSetAccessorDeclaration } from "typescript";
import { Account } from "../../../../App/Models/Account";

interface Props {
    closeForm: () => void;
    account: Account | undefined;
    createOrEdit: (account: Account) => void;
    submitting: (boolean);
}

export default function AccountForm({closeForm, account: selectedAccount, createOrEdit, submitting}: Props){

    const initialState = selectedAccount ?? {
        id: '',
        name: '',
        email: '',
        address: '',
        password: '',
    }

    const [account, setAccount] = useState(initialState);

    function handleSubmit(){
        createOrEdit(account);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        // Make sure name is refering to variable 'name' above not 'name' below
        setAccount({...account, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="name" value={account.name} name='name' onChange={handleInputChange}/>
                <Form.Input placeholder="email" value={account.email} name='email' onChange={handleInputChange}/>
                <Form.TextArea placeholder="address" value={account.address} name='address' onChange={handleInputChange}/>
                <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
                <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}


