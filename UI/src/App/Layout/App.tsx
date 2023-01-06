import { useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { Account } from '../Models/Account';
import NavBar from './NavBar';
import AccountDashboard from '../../features/accounts/dashboard/AccountDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  // Adding Account[] the the types adds type-safety
  const [accounts,setAccounts] = useState<Account[]>([]);
  // useState<Account | undefined> tager højde for at vælge account og cancel account
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  // submitting bruges til loading-componenten
  const [submitting, setSubmitting] = useState(false);

  // Extract the accounts from the API
  useEffect(() => {
    agent.Accounts.list()
    .then(response => {

      // Smart nok hvis jeg skulle håndtere datoer
      // let accounts: Account[] = [];
      // response.forEach(account => {
      //   account.date = account.date.split('T')[0];
      //   accounts.push(account)
      // setAccounts(accounts)

      setAccounts(response);
      setLoading(false);
    })
  }, [])

  function handleSelectAccount(id: string){
    setSelectedAccount(accounts.find(x => x.id == id));
  }

  function handleCancelSelectedAccount(){
    setSelectedAccount(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectAccount(id) : handleCancelSelectedAccount();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

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

  if (loading) return <LoadingComponent content='Loading app'/> 


  return (
    <div className="App">
        <NavBar openForm={handleFormOpen}/>
        <Container style={{marginTop: '6em'}}>
          <AccountDashboard 
            accounts={accounts}
            selectedAccount={selectedAccount}
            selectAccount={handleSelectAccount}
            cancelSelectedAccount={handleCancelSelectedAccount}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditAccount}
            deleteAccount={handleDeleteAccount}
            submitting={submitting}
          />
        </Container>
    </div>
  );
}




export default App;























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
