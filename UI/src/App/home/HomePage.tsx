import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import { useStore } from "../stores/store";


export default observer(function HomePage(){
    const { userStore } = useStore();
    

    //If the user is logged in then the app will be showed else a login-button will appear

    return (
        <><Header content="Navbar" />
        {userStore.isLoggedIn ? (
           <>
           <Header content="Welcome to the app"/>
            <Container style={{ marginTop: '7em' }}>
                    <h1>Home Page</h1>
                    <h3>Go to <Link to='/accounts'>Accounts</Link></h3>
                    <h3>Go to <Link to='/login'>login</Link></h3>
                </Container></>
            </>
        }
        ) : (
            <Button as={Link} to='/login'>
                Login
            </Button>
        )
        </>
    )
})