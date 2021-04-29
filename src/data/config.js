const developMode = true;

export const URL = developMode ? "http://localhost:8081" : "https://oboe.klungerbo.com";
export const API = URL + "/api";
export const API_DECKS = `${API}/decks`;
export const API_EMAIL = `${API}/email`;
export const API_FLASHCARDS = `${API}/flashcards`;
export const API_AUTH_SIGNUP = `${API}/auth/signup`;
export const API_AUTH_SIGNIN = `${API}/auth/signin`;
export const API_AUTH_SIGNOUT = `${API}/auth/signout`;