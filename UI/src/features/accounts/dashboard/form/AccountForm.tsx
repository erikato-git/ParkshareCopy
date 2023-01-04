import { Segment, Form, Button } from "semantic-ui-react";
import { Account } from "../../../../App/Models/Account";

interface Props {
    closeForm: () => void;
    account: Account | undefined;
}

export default function AccountForm({closeForm}: Props){
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder="name"/>
                <Form.Input placeholder="email"/>
                <Form.TextArea placeholder="address"/>
                <Button floated="right" positive type="submit" content="Submit" />
                <Button floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}


