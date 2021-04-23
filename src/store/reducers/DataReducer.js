const initialState = {
  searchTerm: ""
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

        default:
            return state;
    }
}

export default DataReducer;