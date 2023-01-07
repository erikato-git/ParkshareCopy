import { observer } from "mobx-react-lite"; // always check the exact path, it might cause bugs
import { Grid } from "semantic-ui-react";
import { Account } from "../../../App/Models/Account";
import { useStore } from "../../../App/stores/store";
import AccountList from "./AccountList";
import AccountDetails from "./details/AccountDetails";
import AccountForm from "./form/AccountForm";

interface Props {
    deleteAccount: (id: string) => void;
    submitting: boolean;
}

export default observer(function AccountDashboard({deleteAccount, submitting}: Props){

    const {accountStore} = useStore();
    const {selectedAccount, editMode, accounts} = accountStore;

    return(
        <Grid>
            <Grid.Column width='10'>

                <AccountList 
                    accounts={accounts} 
                    deleteAccount={deleteAccount}
                    submitting={submitting}
                    />

            </Grid.Column>
            <Grid.Column width='6'>

                {/* Makes sure the element isn't null */}
                {selectedAccount && !editMode && 
                <AccountDetails/>}

                {editMode && 
                // Only leave variables that control conditions. Resources that belongs to a class should be removed
                <AccountForm />}

            </Grid.Column>
        </Grid>
    )
})