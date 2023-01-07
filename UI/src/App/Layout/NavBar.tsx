import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";



export default function NavBar(){

    const {accountStore} = useStore();

    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    {/* path from public-folder */}
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}}/>
                    Accounts
                </Menu.Item>
                <Menu.Item name="Accounts"/>
                <Menu.Item>
                    {/* TODO: openForm skal bruge et 'id' */}
                    <Button onClick={() => accountStore.openForm()} positive content="Create Account"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}