import { Button, Navbar } from "react-bootstrap";
import { User } from "../../models/user";
import * as GamesAPI from "../../network/games_api";

interface LoggedInUserProps {
    user: User;
    onLogoutSuccessful: () => void,
}

const loggedInUser = ({ user, onLogoutSuccessful }: LoggedInUserProps) => {
    
    async function handleLogout() {
        try {
            await GamesAPI.logOut();
            onLogoutSuccessful();
        } catch(error) {
            console.log(error);
            alert(error);
        }
    }

    return (  
        <>
            <Navbar.Text className="me-2" >
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    );
}
 
export default loggedInUser;