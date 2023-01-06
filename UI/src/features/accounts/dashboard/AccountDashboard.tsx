import { Grid, List } from "semantic-ui-react";
import { Account } from "../../../App/Models/Account";
import AccountList from "./AccountList";
import AccountDetails from "./details/AccountDetails";
import AccountForm from "./form/AccountForm";

interface Props {
    // provides type-safety
    accounts: Account[];
    selectedAccount: Account | undefined;
    selectAccount: (id: string) => void;
    cancelSelectedAccount: () => void;
    editMode: boolean;
    openForm: (id?: string) => void;
    closeForm: () => void;
}

export default function AccountDashboard({accounts, selectedAccount, selectAccount, cancelSelectedAccount, editMode, openForm, closeForm}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>

                <AccountList 
                    accounts={accounts} 
                    selectAccount={selectAccount} 
                    />

            </Grid.Column>
            <Grid.Column width='6'>

                {/* Makes sure the element isn't null */}
                {selectedAccount && !editMode && <AccountDetails 
                    account={selectedAccount}
                    cancelSelectedAccount={cancelSelectedAccount} 
                    openForm={openForm}

                />}

                {editMode && <AccountForm 
                    closeForm={closeForm}
                    account={selectedAccount}
                />}

            </Grid.Column>
        </Grid>
    )
}