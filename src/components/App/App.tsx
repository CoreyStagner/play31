import { useEffect, useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import NavBar from "../NavBar/NavBar";
import SignUpModal from "../SignUpModal/SignUpModal";
import { User } from "../../models/user";
import * as GamesAPI from "../../network/games_api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import GamesPage from "../../pages/GamesPage";
import ErrorPage from "../../pages/ErrorPage";
import styles from "./App.module.css";
import RulesPage from "../../pages/RulesPage";
import PlayersPage from "../../pages/PlayersPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await GamesAPI.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLogInModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<GamesPage loggedInUser={loggedInUser} />}
            />
            <Route
              path="/games"
              element={<GamesPage loggedInUser={loggedInUser} />}
            />
            <Route
              path="/players"
              element={<PlayersPage loggedInUser={loggedInUser} />}
            />
            <Route
              path="/rules"
              element={<RulesPage />}
            />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Container>
        {/* Authentication Modals */}
        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSuccess={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
        {showLogInModal && (
          <LoginModal
            onDismiss={() => setShowLogInModal(false)}
            onSuccess={(user) => {
              setLoggedInUser(user);
              setShowLogInModal(false);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
