import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";


export default function NotFound()
{
    return(
        <Segment>
            <Header icon>
                <Icon name='search'/>
                Ooops, couldn't find what you're looking for
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/accounts'>
                    Return to account-page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}