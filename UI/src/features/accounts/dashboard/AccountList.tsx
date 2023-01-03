import { Button, Item, Label, Segment } from "semantic-ui-react"
import { Account } from "../../../App/Models/Account"

interface Props{
    accounts: Account[]
}

export default function AccountList({accounts}: Props){
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
                                <Button floated="right" content="View" color="blue"/>
                                <Label basic content={account.id}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}