const initialState = {
  searchTerm: "",
  loggedIn: false,
  currentDeck: {
    cardColor: "#111"
  },
  reviewStats: {
    correct: 0,
    incorrect: 0,
    cardsLeft: 0
  },
  user: {
    jwt: ""
  }
};

function DataReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.searchTerm
      };
    case "SET_REVIEW_STATS":
      return {
        ...state,
        reviewStats: action.reviewStats
      };
    case "SET_CURRENT_DECK":
      return {
        ...state,
        currentDeck: action.currentDeck
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user
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