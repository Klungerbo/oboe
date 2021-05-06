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

export function setCurrentCardFilter(currentCardFilter) {
  return function (dispatch) {
    dispatch({
      type: "SET_CURRENT_CARD_FILTER",
      currentCardFilter: currentCardFilter
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

export function addCard(cardToAdd) {
  return function (dispatch) {
    dispatch({
      type: "ADD_CARD",
      cardToAdd: cardToAdd
    });
  };
}

export function updateCard(cardToUpdate) {
  return function (dispatch) {
    dispatch({
      type: "UPDATE_CARD",
      cardToUpdate: cardToUpdate
    });
  };
}

export function promptDeleteCard(cardToDelete) {
  return function (dispatch) {
    dispatch({
      type: "PROMPT_DELETE_CARD",
      cardToDelete: cardToDelete
    });
  };
}

export function deleteCard(cardToDelete) {
  return function (dispatch) {
    dispatch({
      type: "DELETE_CARD",
      cardToDelete: cardToDelete
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

export function setCurrentCardWithAction(currentCardWithAction) {
  return function (dispatch) {
    dispatch({
      type: "SET_CURRENT_CARD_WITH_ACTION",
      currentCardWithAction: currentCardWithAction 
    });
  };
}

export function setOpenVerifyCookies(openVerifyCookies) {
  return function (dispatch) {
    dispatch({
      type: "SET_OPEN_VERIFY_COOKIES",
      openVerifyCookies: openVerifyCookies 
    });
  };
}

export function setAcceptedCookies(acceptedCookies) {
  return function (dispatch) {
    dispatch({
      type: "SET_ACCEPTED_COOKIES",
      acceptedCookies: acceptedCookies
    });
  };
}