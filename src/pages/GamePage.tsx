import { useEffect, useState } from "react";
import { Game as GameModel } from "../models/game";
import { User } from "../models/user";
import * as GamesAPI from "./../network/games_api";
import { useParams } from "react-router-dom";


interface GamePageProps {
    loggedInUser: User | null; 
}

const GamePage = ({loggedInUser} : GamePageProps) => {
    const { id } = useParams();
    const [game, setGame] = useState<GameModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [showLoadingError, setShowLoadingError] = useState(false);

    useEffect(() => {
        async function loadGame() {
          try {
            setShowLoadingError(false);
            setLoading(true);
            const games = await GamesAPI.fetchGame(id!);
            setGame(games);
            setLoading(false);
          } catch (error) {
            console.error(error);
            setShowLoadingError(true);
            setLoading(false);
          }
        }
        loadGame();
      }, [id]);

    return ( <p>Display Game<p>{JSON.stringify(game)}</p></p> );
}
 
export default GamePage;