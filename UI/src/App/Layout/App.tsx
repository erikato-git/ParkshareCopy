import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Container, Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Account } from '../Models/Account';
import NavBar from './NavBar';
import AccountDashboard from '../../features/accounts/dashboard/AccountDashboard';

function App() {
  // Adding Account[] the the types adds type-safety
  const [accounts,setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    axios.get<Account[]>('http://localhost:5000/api/Account')
    .then(response => {
      setAccounts(response.data);
    })
  }, [])

  return (
    <div className="App">
        <NavBar/>
        <Container style={{marginTop: '6em'}}>
          <AccountDashboard accounts={accounts}/>
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
