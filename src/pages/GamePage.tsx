import { useEffect, useState } from "react";
import { Game as GameModel } from "../models/game";
import { User } from "../models/user";
import * as GamesAPI from "./../network/games_api";
import { useParams } from "react-router-dom";
import Game from "../components/Game/Game";
import { Spinner } from "react-bootstrap";

interface GamePageProps {
  loggedInUser: User | null;
}

const GamePage = ({ loggedInUser }: GamePageProps) => {
  const { id } = useParams();
  const [game, setGame] = useState<GameModel|null>();
  const [loading, setLoading] = useState(false);
  const [showLoadingError, setShowLoadingError] = useState(false);

  useEffect(() => {
    async function loadGame() {
      try {
        setShowLoadingError(false);
        setLoading(true);
        const game = await GamesAPI.fetchGame(id!);
        setGame(game);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setShowLoadingError(true);
        setLoading(false);
      }
    }
    loadGame();
  }, [id]);

  return (
    <>
      
        {loading && <Spinner animation="border" variant="primary" />}

        {showLoadingError && (
            <p>Something went wrong. Please refresh your page.</p>
        )}

            {console.log(game)}
        {!game
            ? (
                <p>No Game was found.</p>
            ) : (
                <Game
                    game={game} 
                />
                // <p>Game found.</p>
            )
        }
        </>
    // }
  );
};

export default GamePage;
