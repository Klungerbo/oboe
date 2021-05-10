# Oboe
A mandatory group project from the course IDATA2301 Webteknologi (2021 SPRING) 

<img src="https://media.giphy.com/media/dZongPVfufls5DcmXr/source.gif">

A web solution for flashcards similar to Anki which uses spaced repetition system (SRS). The website requires a user to log in to manage and review their decks. Decks consist of zero to many cards, and each card has a front and backside. The front side is the question to which the backside holds the answer. When a user flips the card from front to back, a choice between “forgotten” and “remembered” is presented. Depending on the selection, the SRS system will adapt. 

The SRS system balances the frequency of a card’s presence in a review. Cards that have been forgotten will show up more frequently than those that were remembered. A card will be marked as completed and no longer show up in a review when it has been “remembered” enough times in a row.

## Requirements
To build or run Oboe, you need to have [Node.js](https://nodejs.org/en/) installed on your machine.
For this installation to work optimally, you should also acquire and set up the [oboe-backend](https://github.com/Klungerbo/oboe-backend)

## Installation
Prerequisites:
- A terminal with path to node
- Change working directory to this project's root folder

Steps:
1. Run `npm install` to download the dependencies
2. Run `npm start` or `npm build` depending on whether you want to start a development server or build to production
