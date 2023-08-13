import { ConflictError, UnauthorizedError } from "../errorMessages/http";

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

export async function fetchUsers(): Promise<User[]> {
  const response = await fetchData("/api/users/retrieve", { method: "GET" });
  return response.json();
}
