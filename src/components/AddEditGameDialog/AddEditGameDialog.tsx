import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Game } from "../../models/game";
import { useForm } from "react-hook-form";
import { GameInput } from "../../network/games_api";
import * as GamesApi from "../../network/games_api";
import TextInputField from "../Form/TextInputField";

interface AddEditGameDialogProps {
  gameToEdit?: Game;
  onDismiss: () => void;
  onSave: (game: Game) => void;
}

const AddEditGameDialog = ({
  onDismiss,
  onSave,
  gameToEdit,
}: AddEditGameDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GameInput>({
    defaultValues: {
      title: gameToEdit?.title || "",
      location: gameToEdit?.location || "",
    },
  });

  async function onSubmit(input: GameInput): Promise<void> {
    try {
      let gameResponse: Game;
      if (gameToEdit) {
        gameResponse = await GamesApi.updateGame(gameToEdit._id, input);
      } else {
        gameResponse = await GamesApi.createGame(input);
      }
      onSave(gameResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{gameToEdit ? "Edit Game" : "Add New Game"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditGameForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            placeholder="Title"
            label="Title"
            type="text"
            register={register}
            registerOptions={{ required: "Game Title is Required" }}
            error={errors.title}
          />

          <TextInputField
            name="location"
            placeholder="Location"
            label="Location"
            type="text"
            register={register}
            error={errors.location}
          />

          <TextInputField
            name="notes"
            placeholder="Notes"
            label="Notes"
            type="textarea"
            rows={5}
            register={register}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditGameForm" disabled={isSubmitting}>
          {gameToEdit ? "Continue Playing" : "Let's Play"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditGameDialog;
