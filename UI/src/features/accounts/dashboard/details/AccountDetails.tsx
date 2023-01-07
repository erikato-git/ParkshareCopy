import { Button, Card, Icon, Image } from "semantic-ui-react";
import LoadingComponent from "../../../../App/Layout/LoadingComponent";
import { useStore } from "../../../../App/stores/store";



export default function AccountDetails(){

  const {accountStore} = useStore();
  const {selectedAccount: account, openForm, cancelSelectedAccount} = accountStore;

  // account cannot be 'null' anyway since the parent component checks before accessing this component
  if(!account) return <LoadingComponent />;

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
              {/* // Don't add lambda */}
              <Button onClick={cancelSelectedAccount} basic color="grey" content="Cancel" />
          </Button.Group>
      </Card.Content>
    </Card>
  )
}