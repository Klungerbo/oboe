const initialState = {
    searchTerm: "",
    currentDeck: { cardColor: "#111" },
    reviewStats: { correct: 0, incorrect: 0, cardsLeft: 0 }
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

        default:
            return state;
    }
}

export default DataReducer;