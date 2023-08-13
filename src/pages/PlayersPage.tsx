import { Container } from "react-bootstrap";
import PlayerPageLoggedInView from "../components/PlayerPageLoggedInView/PlayerPageLoggedInView";
import PlayerPageLoggedOutView from "../components/PlayerPageLoggedOutView/PlayerPageLoggedOutView";
// import loggedInUser from "../components/NavBar/LoggedInUser";
import styles from "../styles/pages/PlayersPage.module.css";
import { User } from "../models/user";

interface PlayersPageProps {
    loggedInUser: User | null;
}

const PlayersPage = ({loggedInUser} : PlayersPageProps) => {
    return ( 
      <Container className={styles.gamePage}>
        <>
          {loggedInUser ? <PlayerPageLoggedInView /> : <PlayerPageLoggedOutView />}
        </>
      </Container>
     );
}
 
export default PlayersPage;