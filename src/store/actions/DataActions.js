export function setSearchTerm(searchTerm) {
    return function (dispatch) {
        dispatch({
            type: "SET_SEARCH_TERM",
            searchTerm: searchTerm 
        });
    };
}