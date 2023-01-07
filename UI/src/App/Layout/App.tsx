import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="App">
        <NavBar />
        <Container style={{marginTop: '6em'}}>
          <Outlet />
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
