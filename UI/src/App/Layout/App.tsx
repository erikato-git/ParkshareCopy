import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import UserStore from '../stores/UserStore';
import LoadingComponent from './LoadingComponent';



function App() {

  const location = useLocation();
  const {commonStore, userStore} = userStore();

  useEffect(() => {
    if (commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, UserStore])

    if(!commonStore.appLoaded) return <LoadingComponent content='Loading app ...' />


  // return (
  //   <div className="App">
  //     {location.pathname === '/' ? <HomePage /> : (
  //         <>
  //           <NavBar />
  //           <Container style={{marginTop: '6em'}}>
  //             <Outlet />
  //           </Container>
  //         </>
  //     )}
  //   </div>
  // );

  return (
    <div className="App">
      <ToastContainer position="bottom-right" hideProgressBar theme='colored' />
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
