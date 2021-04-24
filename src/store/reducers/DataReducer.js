const initialState = {
  searchTerm: "",
  loggedIn: false
};

function DataReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_SEARCH_TERM":
            return {
                ...state,
                searchTerm: action.searchTerm
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
}

export default DataReducer;