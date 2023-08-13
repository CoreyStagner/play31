import { ConflictError, UnauthorizedError } from "../errorMessages/http";
import { Game } from "../models/game";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  // const fetchURL = `https://play31server-a26fc9e3cea9.herokuapp.com${input}`
  const fetchURL = `http://localhost:5000${input}`
  const response = await fetch(fetchURL, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    }  else if (response.status === 409) {
      throw new ConflictError(errorMessage)
    }
    throw Error(`Request failed with Status: ${response.status}.\nMessage: ${errorMessage}`);
  }
}

// TODO: Move to user_api.ts
export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData('/api/users', { method: "GET"});
  return response.json();
}

export async function fetchGames(): Promise<Game[]> {
  const response = await fetchData("/api/games", { method: "GET" });
  return response.json();
}

export async function fetchGame(gameId: string): Promise<Game> {
  console.log(`[GET] [/network/games_api.ts] [fetchGames()] [/api/games/${gameId}]`);
  const response = await fetchData(`/api/games/${gameId}`, { method: "GET" });
  console.log(`[GET] [/network/games_api.ts] [fetchGames()] [response: ${JSON.stringify(response)}]`);
  return response.json();
}

export interface GameInput {
  title: string;
  location?: string;
}

export async function createGame(game: GameInput): Promise<Game> {
  const response = await fetchData("/api/games/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
  return response.json();
}

export async function updateGame(
  gameId: string,
  game: GameInput
): Promise<Game> {
  const response = await fetchData(`/api/games/${gameId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
  return response.json();
}

export async function deleteGame(gameId: string) {
  await fetchData(`/api/games/${gameId}`, { method: "DELETE" });
}

export interface SignUpCredentials {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  console.log(credentials)
  debugger;
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
  return response.json();
}

export interface LogInCredentials {
  username: string,
  email?: string,
  password?: string,
}

export async function logIn(credentials: LogInCredentials): Promise<User> {
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
  return response.json();
}

export async function logOut() {
  await fetchData("/api/users/logout", {
    method: "POST"
  });
}