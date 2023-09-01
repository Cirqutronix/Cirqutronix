// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const gameScreen = document.getElementById("gameScreen");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const timerElement = document.getElementById("time");

let numberOfGuesses = 0;
let timeLeft = 120; ///// Set the initial time in seconds (2 minutes)
let timerInterval;

console.log(`Congratulations! You guessed the number ${randomNumber} in ${numberOfGuesses} guesses.`);

const handleGuess = () => {
    const userGuess = parseInt(guessInput.value);
    numberOfGuesses++;

    if (userGuess === randomNumber) {
        gameover(true); ///player won
        message.textContent = `Congratulations! You guessed the number ${randomNumber} in ${numberOfGuesses} guesses.`;
        guessButton.disabled = true;
        clearInterval(timerInterval); // Stop the timer
    } else if (userGuess < randomNumber) {
        message.textContent = "Too low. Try again.";
    } else {
        message.textContent = "Too high. Try again.";
    }
};

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 80;
    timerElement.textContent = `Time left: ${minutes} minutes ${seconds} seconds`;

    if (timeLeft === 0) {
        clearInterval(timerInterval); // Stop the timer
        guessButton.disabled = true;
        message.textContent = `Time's up! The correct number was ${randomNumber}.`;
        alert("Time's up!"); // Show an alert

        if (timeLeft === 0) {
            gameOver(false); // Time's up, player lost
        }
    }
    timeLeft--;
};

startButton.addEventListener("click", () => {
    startScreen.style.display = "none"; // Hide start screen
    gameScreen.style.display = "block"; // Show game screen
    updateTimer(); // Display initial timer value
    timerInterval = setInterval(updateTimer, 1000); // Update every second
});

guessButton.addEventListener("click", handleGuess);

guessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleGuess();
    }
});

const resetGame = () => {
    clearInterval(timerInterval); // Stop the timer
    guessButton.disabled = false; // Enable the guess button
    message.textContent = ""; // Clear the message
    guessInput.value = ""; // Clear the input field
    numberOfGuesses = 0; // Reset the number of guesses
    timeLeft = 120; // Reset the time left
    updateTimer(); // Reset the timer display
};

// Add an event listener for the reset button
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

