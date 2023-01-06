import { Button, Container, Menu } from "semantic-ui-react";

interface Props{
    openForm: () => void;
}

export default function NavBar({openForm}: Props){
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
                    <Button onClick={openForm} positive content="Create Account"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}