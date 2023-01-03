import { Grid, List } from "semantic-ui-react";
import { Account } from "../../../App/Models/Account";
import AccountList from "./AccountList";
import AccountDetails from "./details/AccountDetails";
import AccountForm from "./form/AccountForm";

interface Props {
    // provides type-safety
    accounts: Account[];
    selectedAccount: Account;
    selectAccount: (id: string) => void;
    cancelSelectedAccount: () => void;
}

export default function AccountDashboard({accounts}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <AccountList accounts={accounts} />
            </Grid.Column>
            <Grid.Column width='6'>
                {/* Makes sure the element isn't null */}
                {accounts[0] &&
                <AccountDetails account={accounts[0]} />}
                <AccountForm />
            </Grid.Column>
        </Grid>
    )
}