import { Grid, List } from "semantic-ui-react";
import { Account } from "../../../App/Models/Account";

interface Props {
    accounts: Account[];
}

export default function AccountDashboard({accounts}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <List>
                    {accounts.map((account) => (
                    <List.Item key={account.id}>
                        {account.name}
                    </List.Item>
                    ))}
                </List>
            </Grid.Column>
        </Grid>
    )
}