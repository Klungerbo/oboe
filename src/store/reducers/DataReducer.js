const initialState = {
  loggedIn: false,
  currentDeck: {
    id: -1,
    name: "",
    description: "",
    hexColor: "#111"
  },
  reviewStats: {
    correct: 0,
    incorrect: 0,
    cardsLeft: 0
  },
  // Array of deck objects
  decks: [],
  currentCards: []
};

function DataReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_REVIEW_STATS":
      return {
        ...state,
        reviewStats: action.reviewStats
      };
    case "SET_DECKS":
      return {
        ...state,
        decks: action.decks
      };
    case "SET_CURRENT_DECK":
      return {
        ...state,
        currentDeck: action.currentDeck
      };
    case "SET_CURRENT_CARDS":
      return {
        ...state,
        currentCards: action.currentCards
      };
    case "SET_USER_EMAIL":
      return {
        ...state,
        userEmail: action.userEmail
      };
    case "SET_LOGGED_IN":
      return {
        ...state,
        loggedIn: action.loggedIn
      };

    default:
      return state;
  }
};

  export default DataReducer;