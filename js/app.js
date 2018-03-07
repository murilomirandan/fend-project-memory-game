// Start the game click the button "Start!"
// const btn = document.querySelector('#start');
document.addEventListener('DOMContentLoaded', startGame);

// Display the cards on the page
function startGame() {
  // Create a list that holds all of your cards
  const cards = document.querySelectorAll(".card");

  // shuffle the list of cards using the provided "shuffle" method below
  const newCards = shuffle(Array.from(cards));

  // remove cards from deck
  cards.forEach(function(card){
    card.parentElement.removeChild(card);
  });

  const deck = document.querySelector(".deck");

  // loop through each card and create its HTML
  // add each card's HTML to the page
  newCards.forEach(function(card){
    deck.innerHTML = deck.innerHTML + card.outerHTML;
  });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = [];
let counter = 0;
let numberMatches = 0
let deck = document.querySelector('.deck');
deck.addEventListener('click', cardSelection);

function isMatch(){
  // check if there are two cards
  if(openCards.length === 2){
    // if the cards match
    if(openCards[0] === openCards[1]){
      //lock the cards in the open position
      const matchCards = document.getElementsByClassName(openCards[0]);
      Array.from(matchCards).forEach(function(card){
        card.parentElement.classList.toggle("show");
        card.parentElement.classList.toggle("open");
        card.parentElement.classList.add("match");
      });
      numberMatches = numberMatches + 1;
    }else{ // cards do not match

      const noMatchCard1 = document.getElementsByClassName(openCards[0]);
      Array.from(noMatchCard1).forEach(function(card){
        card.parentElement.classList.remove("show");
        card.parentElement.classList.remove("open");
      });
      const noMatchCard2 = document.getElementsByClassName(openCards[1]);
      Array.from(noMatchCard2).forEach(function(card){
        card.parentElement.classList.remove("show");
        card.parentElement.classList.remove("open");
      });
    }

    // increment the move counter and display it on the page
    counter = counter + 1;
    const numberMoves = document.querySelector(".moves");
    numberMoves.textContent = counter;
    openCards = [];
  }
}

function cardSelection(evt){
  let target = evt.target;
  // Add classes "show" and "open" to a selected card
  if(target.nodeName === "LI"){
    target.classList.toggle("show");
    target.classList.toggle("open");
    openCards.push(target.firstElementChild.classList[1]);
  }else if(target.nodeName === "I"){
    target.parentElement.classList.toggle("show");
    target.parentElement.classList.toggle("open");
    openCards.push(target.classList[1]);
  }

  isMatch();
}

// Reset the Game
const btn_restart = document.querySelector('.restart');
btn_restart.addEventListener('click', restartGame);

function restartGame(){
  const matchClass = document.querySelectorAll(".match");
  Array.from(matchClass).forEach(function(card){
    card.classList.remove("match");
  });
  const numberMoves = document.querySelector(".moves");
  numberMoves.textContent = 0;
  startGame();
}
