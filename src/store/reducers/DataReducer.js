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
  cardToDelete: {},
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
    case "UPDATE_CARD":
      const updateCardIndex = state.currentCards.findIndex(card => {
        return card.id === action.cardToUpdate.id
      });
      state.currentCards[updateCardIndex] = action.cardToUpdate
      return {
        ...state,
        currentCards: state.currentCards
      };
    case "PROMPT_DELETE_CARD":
      return {
        ...state,
        cardToDelete: action.cardToDelete
      };
    case "DELETE_CARD":
      const deleteCardIndex = state.currentCards.findIndex(card => {
        return card.id === action.cardToDelete.id
      });

      const newCurrentCards = [
        ...state.currentCards.slice(0, deleteCardIndex),
        ...state.currentCards.slice(deleteCardIndex + 1)
      ];

      state.cardToDelete = {};
      return {
        ...state,
        currentCards: newCurrentCards
      };
    case "ADD_CARD":
      return {
        ...state,
        currentCards: [
          ...state.currentCards,
          action.cardToAdd
        ]
      };
    case "SET_CURRENT_CARD_WITH_ACTION":
      return {
        ...state,
        currentCardWithAction: action.currentCardWithAction
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