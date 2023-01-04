import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Account } from "../../../../App/Models/Account";

interface Props {
    account: Account
    cancelSelectedAccount: () => void;
    openForm: (id?: string) => void;
}


export default function AccountDetails({account, openForm, cancelSelectedAccount}: Props){
    return (
        <Card>
        {/* Be carefull to import all components when copy-pasting from semantic-ui-examples */}
        <Image src={`/assets/categoryImages/${account}.jpg`}/>
        <Card.Content>
          <Card.Header>{account.name}</Card.Header>
          <Card.Meta>
            <span>{account.email}</span>
          </Card.Meta>
          <Card.Description>
            {account.address}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group>
                <Button onClick={() => openForm(account.id)} basic color="blue" content="Edit" />
                <Button onClick={() => cancelSelectedAccount} basic color="grey" content="Cancel" />
            </Button.Group>
        </Card.Content>
      </Card>
    )
}