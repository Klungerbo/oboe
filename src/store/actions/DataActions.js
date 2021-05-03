export function setUserEmail(userEmail) {
  return function (dispatch) {
    dispatch({
      type: "SET_USER_EMAIL",
      userEmail: userEmail
    });
  }
}

export function setReviewStats(reviewStats) {
  return function (dispatch) {
    dispatch({
      type: "SET_REVIEW_STATS",
      reviewStats: reviewStats
    });
  };
}

export function setLoggedIn(loggedIn) {
  return function (dispatch) {
    dispatch({
      type: "SET_LOGGED_IN",
      loggedIn: loggedIn
    });
  }
}

export function setCurrentDeck(currentDeck) {
  return function (dispatch) {
    dispatch({
      type: "SET_CURRENT_DECK",
      currentDeck: currentDeck
    });
  };
}

export function setCurrentCards(currentCards) {
  return function (dispatch) {
    dispatch({
      type: "SET_CURRENT_CARDS",
      currentCards: currentCards
    });
  };
}

export function setDecks(decks) {
  return function (dispatch) {
    dispatch({
      type: "SET_DECKS",
      decks: decks 
    });
  };
}