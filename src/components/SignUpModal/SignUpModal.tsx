import { useForm } from "react-hook-form";
import { User } from "../../models/user";
import { SignUpCredentials } from "../../network/games_api";
import * as GamesAPI from "../../network/games_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "../Form/TextInputField";
import styleUtils from "../../styles/utils.module.css";
import { useState } from "react";
import { ConflictError } from "../../errorMessages/http";

interface SignUpModalProps {
  onDismiss: () => void;
  onSuccess: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSuccess }: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    if (credentials.password !== credentials.confirmPassword) {
      setErrorText("Password must match!");
    } else {
      try {
        const newUser = await GamesAPI.signUp(credentials);
        onSuccess(newUser);
      } catch (error) {
        if (error instanceof ConflictError) {
          setErrorText(error.message);
        } else {
          alert(error);
        }
        console.error(error);
      }
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: true }}
            error={errors.username}
          />

          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter Email Address"
            register={register}
            registerOptions={{ required: true }}
            error={errors.email}
          />

          <TextInputField
            name="firstName"
            label="First Name"
            type="firstName"
            placeholder="Enter your First Name"
            register={register}
            registerOptions={{ required: true }}
            error={errors.firstName}
          />

          <TextInputField
            name="lastName"
            label="Last Name"
            type="lastName"
            placeholder="Enter your Last Name"
            register={register}
            registerOptions={{ required: true }}
            error={errors.lastName}
          />

          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your Password"
            register={register}
            registerOptions={{ required: true }}
            error={errors.password}
          />

          <TextInputField
            name="confirmPassword"
            label="Re-enter Password"
            type="confirmPassword"
            placeholder="Confirm your Password"
            register={register}
            registerOptions={{ required: true }}
            error={errors.confirmPassword}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
