import { useEffect, useState } from "react";
import {
  // Button, Col, Row,
  Spinner, Table } from "react-bootstrap";
// import { FaPlus } from "react-icons/fa";
// import styles from "../../styles/pages/GamesPage.module.css";
// import styleUtils from "../../styles/utils.module.css";
// import AddEditGameDialog from "../AddEditGameDialog/AddEditGameDialog";
// import Game from "../Game/Game";
import { User as UserModel } from "../../models/user";
import * as PlayersAPI from "../../network/players_api";
import User from "../User/User";

const PlayerPageLoggedInView = () => {
  const [player, setPlayer] = useState<UserModel[]>([]);
  // const [showAddEditGameDialog, setShowAddEditGameDialog] = useState(false);
  // const [gameToEdit, setGameToEdit] = useState<UserModel | null>(null); // TODO: Change to player to edit.
  const [loading, setLoading] = useState(false);
  const [showLoadingError, setShowLoadingError] = useState(false);

  useEffect(() => {
    async function loadGames() {
      try {
        setShowLoadingError(false);
        setLoading(true);
        const players = await PlayersAPI.fetchUsers();
        setPlayer(players);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setShowLoadingError(true);
        setLoading(false);
      }
    }
    loadGames();
  }, []);

  // async function deletePlayerHandler(player: UserModel) {
  //   try {
  //     await PlayersAPI.deletePlayer(player._id);
  //     setPlayer(player.filter((existingGame) => existingGame._id !== player._id));
  //   } catch (error) {
  //     console.error("Error Deleting Game:", error);
  //   }
  // }
  const playerGrid = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Email Address</th>
        </tr>
      </thead>
      <tbody>
        {/* <Row xs={1} md={2} xl={3} className={`${styles.playerGrid} g-4`}> */}
          {(player || []).map((player, i) => (
              <User
                key={i}
                user={player}
                index={i + 1}
                // className={styles.player}
                // onDeleteUserClick={(deletePlayerHandler)}
                // onUserClick={setGameToEdit}
              />
          ))}
        {/* </Row> */}
      </tbody>
    </Table>
  );

  return (
    <>
      {/* {showAddEditGameDialog && (
        <AddEditGameDialog
          onDismiss={() => setShowAddEditGameDialog(false)}
          onSave={(createdPlayer) => {
            setPlayer([...player, createdPlayer]);
            setShowAddEditGameDialog(false);
          }}
        />
      )} */}
      {/* {!showLoadingError && (
        <Row>
          <Button
            className={`my-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
            onClick={() => setShowAddEditGameDialog(true)}
          >
            <FaPlus />
            Add New Game
          </Button>
        </Row>
      )} */}
      {loading && <Spinner animation="border" variant="primary" />}
      {showLoadingError && (
        <p>Something went wrong. Please refresh your page.</p>
      )}
      {!loading && !showLoadingError && (
        <>{player.length > 0 ? playerGrid : <p>No players are available</p>}</>
      )}
      {/* {gameToEdit && (
        <AddEditGameDialog
          gameToEdit={gameToEdit}
          onDismiss={() => setGameToEdit(null)}
          onSave={(updatedGame) => {
            setPlayer(
              player.map((existingGame) =>
                existingGame._id === updatedGame._id
                  ? updatedGame
                  : existingGame
              )
            );
            setGameToEdit(null);
          }}
        />
      )} */}
    </>
  );
};

export default PlayerPageLoggedInView;
