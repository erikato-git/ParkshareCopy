import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';

function App() {
  const [accounts,setAccounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Account')
    .then(response => {
      setAccounts(response.data);
    })
  }, [])

  return (
    <div className="App">
        <Header as='h2' icon='users' content='Accounts' />
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
