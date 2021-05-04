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
  currentCards: [],
  currentCardFilter: [],
  acceptedCookies: false,
  openVerifyCookies: true 
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
    case "SET_CURRENT_CARD_FILTER":
      return {
        ...state,
        currentCardFilter: action.currentCardFilter
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
    
    case "SET_OPEN_VERIFY_COOKIES":
      return {
        ...state,
        openVerifyCookies: action.openVerifyCookies
      }
    case "SET_ACCEPTED_COOKIES":
      return {
        ...state,
        acceptedCookies: action.acceptedCookies
      }

    default:
      return state;
  }
};

  export default DataReducer;