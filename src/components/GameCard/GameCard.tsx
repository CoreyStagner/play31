import React from "react";
import styles from "./GameCard.module.css";
import { Card } from "react-bootstrap";
import { Game as GameModel } from "../../models/game";
import { formatDate } from "../../utils/formatDate";
import { MdDelete, MdEdit } from "react-icons/md";
interface GameProps {
    game: GameModel,
    onGameClick: (game: GameModel) => void,
    onGameEditClick: (game: GameModel) => void,
    onDeleteGameClick: (game: GameModel) => void,
    className?: string,
}

const GameCard = ( { game, className, onGameClick, onDeleteGameClick, onGameEditClick } : GameProps) => {
    const { title, location, createdAt, updatedAt } = game;

    let dateToShowText: string = updatedAt > createdAt ? `Updated: ${formatDate(updatedAt)}` : `Created: ${formatDate(createdAt)}`;

    return (
        <Card onClick={() => onGameClick(game)}className={`${styles.gameCard} ${className}`}>
            <Card.Body className={styles.gameBody}>
                <Card.Title className={styles.gameTitle}>
                    {/* TODO: Only show edit if the commissioner is who is currently signed in */}
                    <MdEdit 
                        className="text-muted"
                        onClick={(e) => {
                            onGameEditClick(game)
                            e.stopPropagation();}
                        }/>
                    {/* TODO: if not commissioner then leave a little bit of room on the left so they all stay aligned. width 25.99px or just icon with transparent text */}
                    { title }
                    {/* TODO: Only show delete if the commissioner is who is currently signed in */}
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

export default GameCard;