document.addEventListener('DOMContentLoaded', () => {
// Select the game board and restart button from the HTML
const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restart');

// Card values that will be used to create the cards
const cardValues = ['😴','🤣','😃','😎','😍','🤬','🤡','😱'];
// Variables to keep track of the game state
let firstCard = null;
let secondCard = null;
let lockBoard = false;  // To prevent flipping more than 2 cards at once

// Function to shuffle the cards (randomize their positions)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to set up the game board
function setupBoard() {
  gameBoard.innerHTML = ''; // Clear the board
  let allValues = shuffle([...cardValues, ...cardValues]); // Double the array and shuffle

  // Create a card for each value
  allValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card'); // Add the card class for styling
    card.dataset.value = value; // Store the card's value
    card.addEventListener('click', flipCard); // Add event listener for card flip
    gameBoard.appendChild(card); // Add the card to the game board
  });
}

// Function to flip a card when clicked
function flipCard() {
  if (lockBoard || this === firstCard) return; // Prevent flipping if two cards are already flipped or clicking the same card

  this.classList.add('flipped'); // Show the card's front side
  this.textContent = this.dataset.value; // Display the card's value (A, B, C, etc.)

  // If no card is flipped yet, store this card as the first card
  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this; // If one card is already flipped, store this as the second card
    lockBoard = true;  // Lock the board to prevent flipping more cards
    checkForMatch();   // Check if the two flipped cards match
  }
}

// Function to check if the two flipped cards match
function checkForMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    // If the cards match, keep them flipped and reset for the next turn
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetTurn();
  } else {
    // If the cards do not match, flip them back after a short delay
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetTurn();
    }, 1000); // Delay of 1 second before flipping back
  }
}

// Function to reset the game state for the next turn
function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}


// Event listener for the restart button
restartBtn.addEventListener('click', setupBoard);

// Initialize the game board when the page loads
setupBoard();
});

