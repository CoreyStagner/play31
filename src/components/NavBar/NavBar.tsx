import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom"
import { User } from "../../models/user";
import LoggedInUser from "./LoggedInUser";
import LoggedOutUser from "./LoggedOutUser";

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    return ( 
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Play 31
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/games" >
                            Games
                        </Nav.Link>
                        <Nav.Link as={Link} to="/players" >
                            Players
                        </Nav.Link>
                        <Nav.Link as={Link} to="/rules" >
                            Rules
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        { loggedInUser
                        ? <LoggedInUser user={ loggedInUser } onLogoutSuccessful={onLogoutSuccessful} />
                        : <LoggedOutUser onSignUpClicked={onSignUpClicked} onLoginClicked={onLoginClicked} />
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default NavBar;