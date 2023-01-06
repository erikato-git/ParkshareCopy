import { Button, Item, Label, Segment } from "semantic-ui-react"
import { Account } from "../../../App/Models/Account"

interface Props{
    accounts: Account[];
    selectAccount: (id: string) => void;
    deleteAccount: (id: string) => void;
}

export default function AccountList({accounts, deleteAccount, selectAccount}: Props){
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
                                <Button onClick={() => deleteAccount(account.id)} floated="right" content="Delete" color="red"/>
                                <Label basic content={account.id}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}