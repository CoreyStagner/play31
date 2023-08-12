import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import styles from "../../styles/pages/GamesPage.module.css";
import styleUtils from "../../styles/utils.module.css";
import AddEditGameDialog from "../AddEditGameDialog/AddEditGameDialog";
import Game from "../Game/Game";
import { Game as GameModel } from "./../../models/game";
import * as GamesAPI from "./../../network/games_api";


const GamePageLoggedInView = () => {

    const [games, setGames] = useState<GameModel[]>([]);
    const [showAddEditGameDialog, setShowAddEditGameDialog] = useState(false);
    const [gameToEdit, setGameToEdit] = useState<GameModel | null>(null);
    const [loading, setLoading] = useState(false);
    const [showLoadingError, setShowLoadingError] = useState(false);
    
    useEffect(() => {
        async function loadGames() {
          try {
            setShowLoadingError(false);
            setLoading(true);
            const games = await GamesAPI.fetchGames();
            setGames(games);
            setLoading(false);
          } catch (error) {
            console.error(error);
            setShowLoadingError(true);
            setLoading(false);
          }
        }
        loadGames();
      }, []);
    
      async function deleteGameHandler(game: GameModel) {
        try {
          await GamesAPI.deleteGame(game._id);
          setGames(games.filter((existingGame) => existingGame._id !== game._id));
        } catch (error) {
          console.error("Error Deleting Game:", error);
        }
      }
    const gamesGrid = (
        <Row xs={1} md={2} xl={3} className={`${styles.gameGrid} g-4`}>
          {(games || []).map((game, i) => (
            <Col key={i}>
              <Game
                game={game}
                className={styles.game}
                onDeleteGameClick={deleteGameHandler}
                onGameClick={setGameToEdit}
              />
            </Col>
          ))}
        </Row>
      );
      
  return (
    <>
      {showAddEditGameDialog && (
        <AddEditGameDialog
          onDismiss={() => setShowAddEditGameDialog(false)}
          onSave={(createdGame) => {
            setGames([...games, createdGame]);
            setShowAddEditGameDialog(false);
          }}
        />
      )}
      {!showLoadingError && (
        <Row>
          <Button
            className={`my-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
            onClick={() => setShowAddEditGameDialog(true)}
          >
            <FaPlus />
            Add New Game
          </Button>
        </Row>
      )}
      {loading && <Spinner animation="border" variant="primary" />}
      {showLoadingError && (
        <p>Something went wrong. Please refresh your page.</p>
      )}
      {!loading && !showLoadingError && (
        <>{games.length > 0 ? gamesGrid : <p>No games are available</p>}</>
      )}
      {gameToEdit && (
        <AddEditGameDialog
          gameToEdit={gameToEdit}
          onDismiss={() => setGameToEdit(null)}
          onSave={(updatedGame) => {
            setGames(
              games.map((existingGame) =>
                existingGame._id === updatedGame._id
                  ? updatedGame
                  : existingGame
              )
            );
            setGameToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default GamePageLoggedInView;
