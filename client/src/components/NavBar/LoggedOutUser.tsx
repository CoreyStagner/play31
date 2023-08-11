import { Button, Navbar } from "react-bootstrap";
import { User } from "../../models/user";
import * as GamesAPI from "../../network/games_api";

interface LoggedOutUserProps {
    onSignUpClicked: () => void;
    onLoginClicked: () => void,
}

const loggedInUser = ({ onSignUpClicked, onLoginClicked }: LoggedOutUserProps) => {
    
    return (  
        <>
            <Button onClick={onSignUpClicked}>Sign Up</Button>
            <Button onClick={onLoginClicked}>Log In</Button>
        </>
    );
}
 
export default loggedInUser;