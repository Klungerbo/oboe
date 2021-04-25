export function setSearchTerm(searchTerm) {
  return function (dispatch) {
    dispatch({
      type: "SET_SEARCH_TERM",
      searchTerm: searchTerm
    });
  };
}

export function setReviewStats(reviewStats) {
  return function (dispatch) {
    dispatch({
      type: "SET_REVIEW_STATS",
      reviewStats: reviewStats
    });
  };
}

export function setCurrentDeck(currentDeck) {
  return function (dispatch) {
    dispatch({
      type: "SET_CURRENT_DECK",
      currentDeck: currentDeck
    });
  };
}