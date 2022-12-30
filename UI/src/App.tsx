import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [accounts,setAccounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Account')
    .then(response => {
      console.log(response)
      setAccounts(response.data);
    })
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {accounts.map((account: any) => (
            <li key={account.id}>
              {account.name}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
