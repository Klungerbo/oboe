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

        default:
            return state;
    }
}

export default DataReducer;