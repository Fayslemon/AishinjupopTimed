// References to DOM elements
const popcat = document.querySelector("#popcat");
const btn = document.querySelector("#btn");
const scoreDisplay = document.querySelector("#score");
const timerDisplay = document.querySelector("#timer");
const restartBtn = document.querySelector("#restartBtn");

// Score variable
let score = 0;

// The two images of the POP CAT
const openMouthImg = "./images/open.png";
const closeMouthImg = "./images/close.png";

// PRELOAD IMAGES
const openImg = new Image();
openImg.src = openMouthImg;

const closeImg = new Image();
closeImg.src = closeMouthImg;

// The two Popping sounds
const openMouthSound = new Audio("./sound/sound-open.mp3");
const closeMouthSound = new Audio("./sound/sound-close.mp3");

// Timer variables
let timeLeft = 30; // seconds
let timerRunning = false;
let timerInterval;

// Update timer display
function updateTimerDisplay() {
    timerDisplay.textContent = `Time: ${timeLeft}s`;
}

// Start the game
function startGame() {
    if (!timerRunning) {
        timerRunning = true;
        timeLeft = 30;
        score = 0;
        scoreDisplay.textContent = score;
        updateTimerDisplay();
        btn.disabled = false;
        restartBtn.style.display = "none"; // hide restart button during play

        // Start countdown
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
}

// End the game
function endGame() {
    clearInterval(timerInterval);
    timerRunning = false;
    btn.disabled = true;
    timerDisplay.textContent = "Time's up!";
    scoreDisplay.textContent = `Final Score: ${score}`;
    restartBtn.style.display = "inline-block"; // show restart button
}

// Event Handlers (Desktops)
btn.addEventListener("mousedown", () => {
    if (!timerRunning) startGame();
    openMouth();
});
btn.addEventListener("mouseup", closeMouth);

// Event Handlers (Touch Screens)
btn.addEventListener("touchstart", function(e) {
    e.preventDefault();
    if (!timerRunning) startGame();
    openMouth();
});
btn.addEventListener("touchend", function(e) {
    e.preventDefault();
    closeMouth();
});

// Functions
function openMouth() {
    if (!timerRunning) return;
    popcat.src = openMouthImg;
    openMouthSound.play();

    // Increase score
    score++;
    scoreDisplay.textContent = score;
}

function closeMouth() {
    if (!timerRunning) return;
    popcat.src = closeMouthImg;
    closeMouthSound.play();
}

// Restart button click
restartBtn.addEventListener("click", () => {
    // Reset everything
    popcat.src = closeMouthImg;
    score = 0;
    scoreDisplay.textContent = score;
    timeLeft = 30;
    updateTimerDisplay();
    btn.disabled = false;
    restartBtn.style.display = "none";
    timerRunning = false; // next click will start the game again
});