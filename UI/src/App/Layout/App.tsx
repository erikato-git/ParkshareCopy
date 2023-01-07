import { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { Account } from '../Models/Account';
import NavBar from './NavBar';
import AccountDashboard from '../../features/accounts/dashboard/AccountDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {accountStore} = useStore();


  // Adding Account[] the the types adds type-safety
  const [accounts,setAccounts] = useState<Account[]>([]);
  // useState<Account | undefined> tager højde for at vælge account og cancel account
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  // submitting bruges til loading-componenten
  const [submitting, setSubmitting] = useState(false);

  // Extract the accounts from the API
  useEffect(() => {
    accountStore.loadAccounts();
    
  }, [accountStore])


  function handleCreateOrEditAccount(account: Account)
  {
    setSubmitting(true);

    // create
    if(account.id){
      agent.Accounts.update(account).then(() => {
        setAccounts([...accounts.filter(x => x.id !== account.id), account]);
        setSelectedAccount(account);
        setEditMode(false);
        setSubmitting(false);
      })
    // update
    } else {
      account.id = uuid();
      agent.Accounts.create(account).then(() => {
        setAccounts([...accounts, account])
        setSelectedAccount(account);
        setEditMode(false);
        setSubmitting(false);
      })

    }
  }

  function handleDeleteAccount(id: string){
    setSubmitting(true);
    agent.Accounts.delete(id).then(() => {
      // filtrerer alle id'er som ikke matcher id
      setAccounts([...accounts.filter(x => x.id !== id)]);
      setSubmitting(false)
    })
  }

  if (accountStore.loadingInitial) return <LoadingComponent content='Loading app'/> 


  return (
    <div className="App">
        <NavBar />
        <Container style={{marginTop: '6em'}}>
          <AccountDashboard 
            createOrEdit={handleCreateOrEditAccount}
            deleteAccount={handleDeleteAccount}
            submitting={submitting}
          />
        </Container>
    </div>
  );
}

// TODO: Se nogle flere videoer, hvorfor observer skal erklæres her
export default observer(App);























  // Alternative to axios. Use fetch

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/Account')
  //     .then((response) => {
  //       return response.json()   // return the array
  //     })
  //     .then((data) => {
  //       console.log(data) // get each item
  //     })
  // }, [])
