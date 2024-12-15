// script.js
let cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D']; // Card pairs
let flippedCards = []; // Store flipped cards
let matchedCards = []; // Store matched cards
let score = 0; // Initial score
let timer = 0; // Timer value
let timerInterval; // Timer interval

const cardsContainer = document.getElementById('cards');
const scoreDisplay = document.getElementById('score-value');
const timeDisplay = document.getElementById('time');
const restartButton = document.getElementById('restart');

// Shuffle card values
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create the cards
function createCards() {
    shuffle(cardValues).forEach(value => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = value; // Store card value
        cardElement.addEventListener('click', flipCard); // Add click event
        cardsContainer.appendChild(cardElement); // Add card to the container
    });
}

// Flip card function
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped'); // Flip the card
        this.innerText = this.dataset.value; // Show card value
        flippedCards.push(this); // Add to flipped cards
        
        if (flippedCards.length === 2) {
            checkForMatch(); // Check if the two flipped cards match
        }
    }
}

// Check if two flipped cards match
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards.push(firstCard, secondCard); // Add to matched cards
        score += 10; // Increase score
        scoreDisplay.innerText = score; // Update score display
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped'); // Flip back
            secondCard.classList.remove('flipped'); // Flip back
            firstCard.innerText = ''; // Clear text
            secondCard.innerText = ''; // Clear text
        }, 1000); // Flip back after 1 second
    }

    flippedCards = []; // Reset flipped cards

    // Check for game over
    if (matchedCards.length === cardValues.length) {
        clearInterval(timerInterval); // Stop the timer
        document.getElementById('final-score').innerText=score;
        document.getElementById('game-over').style.display='block';
        alert('You have won! Your final score is: $ {score}');
    }
}

// Start the game with timer
function startGame() {
    createCards(); // Create cards
    score = 0; // Reset score
    scoreDisplay.innerText = score; // Update score display
    timer = 0; // Reset timer
    timeDisplay.innerText = timer; // Update timer display
    timerInterval = setInterval(() => {
        timer++; // Increment timer
        timeDisplay.innerText = timer; // Update timer display
    }, 1000); // Update every second
}

// Restart game
restartButton.addEventListener('click', () => {
    cardsContainer.innerHTML = ''; // Clear previous cards
    clearInterval(timerInterval); // Stop the timer
    startGame(); // Start a new game
});
document.addEventListener('DOMContentLoaded',()=>{

    // Start the game on page load
startGame();
});

