export function setSearchTerm(searchTerm) {
    return function (dispatch) {
        dispatch({
            type: "SET_SEARCH_TERM",
            searchTerm: searchTerm 
        });
    };
}

export function setUser(user) {
    return function (dispatch) {
        dispatch({
            type: "SET_USER",
            user: user 
        });
    };
}