export const URL = "http://127.0.0.1:8080";
export const API = URL + "/api";
export const API_DECKS = `${API}/decks`;
export const API_EMAIL = `${API}/email`;
export const API_FLASHCARDS = `${API}/flashcards`;
export const API_AUTH_SIGNUP = `${API}/auth/signup`;

export const API_AUTH_SIGNUP_VERIFY = `${API}/auth/signupverify`;
export const API_AUTH_SIGNIN = `${API}/auth/signin`;
export const API_AUTH_SIGNOUT = `${API}/auth/signout`;
export const API_AUTH_LOGGED_IN = `${API}/auth/loggedin`;

export const oboeFetch = async (apiUrl, method = "get", content = null) => {
  if (!["get", "put", "post", "delete"].includes(method.toLowerCase()))
    return;

  if (method.toLowerCase() === "get") {
    return await fetchSelect(apiUrl);
  } else {
    return await fetchMutate(apiUrl, method, content);
  }
}

export const oboeJson = async (response) => {
  try {
    return await response.json();
  } catch (err) { console.log(err) }
}

const fetchSelect = async (apiUrl) => {
  try {
    const options = {
      credentials: "include",
    };

    const response = await fetch(apiUrl, options);
    return response;
  } catch (err) { console.log(err) }
}

const fetchMutate = async (apiUrl, method, content) => {
  try {
    const options = {
      credentials: "include",
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(content),
    };

    const response = await fetch(apiUrl, options);
    return response;
  } catch (err) { console.log(err) }
}