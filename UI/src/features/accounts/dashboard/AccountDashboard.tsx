import { observer } from "mobx-react-lite"; // always check the exact path, it might cause bugs
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { useStore } from "../../../App/stores/store";
import AccountList from "./AccountList";
import AccountDetails from "./details/AccountDetails";
import AccountForm from "./form/AccountForm";


export default observer(function AccountDashboard(){

    const {accountStore} = useStore();
    const {loadAccounts, accountRegistry} = accountStore;

    // Extract the accounts from the API
    useEffect(() => {
        if(accountRegistry.size === 0) loadAccounts();
    }, [loadAccounts])
  
  
    if (accountStore.loadingInitial) return <LoadingComponent content='Loading app'/> 
  

    return(
        <Grid>
            <Grid.Column width='10'>

                <AccountList />

            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Account Filters</h2>
            </Grid.Column>
        </Grid>
    )
})