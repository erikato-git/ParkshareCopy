import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react"
import { Account } from "../../../App/Models/Account"

interface Props{
    accounts: Account[];
    selectAccount: (id: string) => void;
    deleteAccount: (id: string) => void;
    submitting: boolean;
}

export default function AccountList({accounts, deleteAccount, selectAccount, submitting}: Props){
    const [target, setTarget] = useState('');


    function handleAccountDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        // setTarget bruges til at specificere hvilken delete knap, der skal have en loading-comp.
        setTarget(e.currentTarget.name);
        deleteAccount(id);
    }

    return(
        <Segment>
            <Item.Group divided>
                {accounts.map(account => (
                    <Item key={account.id}>
                        <Item.Content>
                            <Item.Header as='a'>{account.name}</Item.Header>
                            <Item.Meta>{account.email}</Item.Meta>
                            <Item.Description>
                                <div>{account.address}</div>
                            </Item.Description>
                            <Item.Extra>
                                {/* Lambda gør at funktionen ikke kaldes lige så snart Button bliver load'et */}
                                <Button onClick={() => selectAccount(account.id)} floated="right" content="View" color="blue"/>
                                <Button
                                    name={account.id}
                                    loading={submitting && target === account.id} 
                                    onClick={(e) => handleAccountDelete(e, account.id)} 
                                    floated="right" 
                                    content="Delete" 
                                    color="red"/>
                                <Label basic content={account.id}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}