import { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import AccountDashboard from '../../features/accounts/dashboard/AccountDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {accountStore} = useStore();


  // Extract the accounts from the API
  useEffect(() => {
    accountStore.loadAccounts();
  }, [accountStore])


  if (accountStore.loadingInitial) return <LoadingComponent content='Loading app'/> 


  return (
    <div className="App">
        <NavBar />
        <Container style={{marginTop: '6em'}}>
          <AccountDashboard />
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
