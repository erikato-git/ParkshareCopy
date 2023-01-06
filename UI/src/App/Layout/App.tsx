import { useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { Account } from '../Models/Account';
import NavBar from './NavBar';
import AccountDashboard from '../../features/accounts/dashboard/AccountDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  // Adding Account[] the the types adds type-safety
  const [accounts,setAccounts] = useState<Account[]>([]);
  // useState<Account | undefined> tager højde for at vælge account og cancel account
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Account[]>('http://localhost:5000/api/Account')
    .then(response => {
      setAccounts(response.data);
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
      //if we have an id then update it else create a new account
      account.id 
        ? setAccounts([...accounts.filter(x => x.id !== account.id), account])
        // : setAccounts([...accounts, account]);
        : setAccounts([...accounts, {...account, id: uuid()}]);
      setEditMode(false);
      setSelectedAccount(account);
  }

  function handleDeleteAccount(id: string){
    // filtrerer alle id'er som ikke matcher id
    setAccounts([...accounts.filter(x => x.id !== id)]);
  }



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
