import { Button, Container, Menu } from "semantic-ui-react";


export default function NavBar(){
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
                    <Button positive content="Create Account"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}