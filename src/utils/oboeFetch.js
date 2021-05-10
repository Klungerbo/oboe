import {BACKEND_PORT, BACKEND_URL} from "./config";

export const URL = `${BACKEND_URL}:${BACKEND_PORT}`;
export const API = URL + "/api";
export const API_DECKS = `${API}/decks`;
export const API_EMAIL = `${API}/email`;
export const API_FLASHCARDS = `${API}/flashcards`;
export const API_AUTH_SIGNUP = `${API}/auth/signup`;

export const API_AUTH_SIGNUP_VERIFY = `${API}/auth/signupverify`;
export const API_AUTH_SIGNIN = `${API}/auth/signin`;
export const API_AUTH_SIGNOUT = `${API}/auth/signout`;
export const API_AUTH_LOGGED_IN = `${API}/auth/loggedin`;

export function oboeFetch(apiUrl, method = "get", content = null) {
  if (!["get", "put", "post", "delete"].includes(method.toLowerCase()))
    return;

  if (method.toLowerCase() === "get") {
    return fetchSelect(apiUrl);
  } else {
    return fetchMutate(apiUrl, method, content);
  }
}

function fetchSelect(apiUrl) {
  const options = {
    credentials: "include",
  };

  return fetch(apiUrl, options);
}

function fetchMutate(apiUrl, method, content) {
  const options = {
    credentials: "include",
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(content),
  };

  return fetch(apiUrl, options);
}