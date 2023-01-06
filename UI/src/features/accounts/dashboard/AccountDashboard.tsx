import { Grid } from "semantic-ui-react";
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
    createOrEdit: (account: Account) => void;
    deleteAccount: (id: string) => void;
}

export default function AccountDashboard({accounts, selectedAccount, selectAccount, cancelSelectedAccount, editMode, openForm, closeForm, createOrEdit, deleteAccount}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>

                <AccountList 
                    accounts={accounts} 
                    selectAccount={selectAccount} 
                    deleteAccount={deleteAccount}
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
                    createOrEdit={createOrEdit}
                />}

            </Grid.Column>
        </Grid>
    )
}