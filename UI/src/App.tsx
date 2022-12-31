import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';

function App() {
  const [accounts,setAccounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Account')
    .then(response => {
      console.log(response.data)
      setAccounts(response.data);
    })
  }, [])


  return (
    <div className="App">
        <Header as='h2' icon='users' content='Accounts' />
        <img src={logo} className="App-logo" alt="logo" />
        <List>
          {accounts.map((account: any) => (
            <List.Item key={account.id}>
              {account.name}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
