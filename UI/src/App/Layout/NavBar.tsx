import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";



export default function NavBar(){

    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    {/* path from public-folder */}
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}}/>
                    Accounts
                </Menu.Item>
                <Menu.Item as={NavLink} to='/accounts' name="Accounts"/>
                <Menu.Item>
                    {/* TODO: openForm skal bruge et 'id' */}
                    <Button as={NavLink} to='/createAccount' positive content="Create Account"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}