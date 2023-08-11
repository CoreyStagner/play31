import React from "react";
import styles from "./Game.module.css";
import { Card } from "react-bootstrap";
import { Game as GameModel } from "../../models/game";
import { formatDate } from "../../utils/formatDate";
import { MdDelete } from "react-icons/md";
interface GameProps {
    game: GameModel,
    onGameClick: (game: GameModel) => void,
    onDeleteGameClick: (game: GameModel) => void,
    className?: string,
}

const Game = ( { game, className, onGameClick, onDeleteGameClick } : GameProps) => {
    const { title, location, createdAt, updatedAt } = game;

    let dateToShowText: string = updatedAt > createdAt ? `Updated: ${formatDate(updatedAt)}` : `Created: ${formatDate(createdAt)}`;

    return (
        <Card onClick={() => onGameClick(game)}className={`${styles.gameCard} ${className}`}>
            <Card.Body className={styles.gameBody}>
                <Card.Title className={styles.gameTitle}>
                    { title }
                    <MdDelete 
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteGameClick(game);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.gameText}>
                    { location }
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {dateToShowText}
            </Card.Footer>
        </Card>
    )
}

export default Game;