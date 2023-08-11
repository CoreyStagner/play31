import { useForm } from "react-hook-form";
import { User } from "../../models/user";
import { LogInCredentials } from "../../network/games_api";
import * as GamesAPI from "../../network/games_api";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import TextInputField from "../Form/TextInputField";
import styleUtils from "../../styles/utils.module.css";
import { useState } from "react";
import { UnauthorizedError } from "../../errorMessages/http";

interface LoginModalProps {
  onDismiss: () => void;
  onSuccess: (user: User) => void;
}

const LoginModal = ({ onDismiss, onSuccess }: LoginModalProps) => {

  const [errorText, setErrorText] = useState<string|null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInCredentials>();

  async function onSubmit(credentials: LogInCredentials) {
    try {
      const user = await GamesAPI.logIn(credentials);
      onSuccess(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && 
          <Alert variant="danger">
            {errorText}
          </Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />

          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder={null}
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
