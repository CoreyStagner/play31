import { Container } from "react-bootstrap";
import GamePageLoggedInView from "../components/GamePageLoggedInView/GamePageLoggedInView";
import GamePageLoggedOutView from "../components/GamePageLoggedOutView/GamePageLoggedOutView";
import loggedInUser from "../components/NavBar/LoggedInUser";
import styles from "../styles/pages/GamesPage.module.css";
import { User } from "../models/user";

interface GamesPageProps {
    loggedInUser: User | null;
}

const GamesPage = ({loggedInUser} : GamesPageProps) => {
    return ( 
      <Container className={styles.gamePage}>
        <>
          {loggedInUser ? <GamePageLoggedInView /> : <GamePageLoggedOutView />}
        </>
      </Container>
     );
}
 
export default GamesPage;