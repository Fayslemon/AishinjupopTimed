// ELEMENTS
const popcat = document.getElementById("popcat");
const btn = document.getElementById("btn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");
const highscoreDisplay = document.getElementById("highscore");
const secretMessage = document.getElementById("secretMessage");

// IMAGES
const openMouthImg = "./images/open.png";
const closeMouthImg = "./images/close.png";

// SOUNDS
const openSound = new Audio("./sound/sound-open.mp3");
const closeSound = new Audio("./sound/sound-close.mp3");

// GAME VARIABLES
let score = 0;
let timeLeft = 30;
let timerRunning = false;
let timerInterval;

// HIGHSCORE
let highscore = localStorage.getItem("popcatHighscore") || 0;
highscoreDisplay.textContent = "High Score: " + highscore;

// TIMER DISPLAY
function updateTimer() {
    timerDisplay.textContent = "Time: " + timeLeft + "s";
}

// START GAME
function startGame() {
    if (timerRunning) return;

    timerRunning = true;
    score = 0;
    timeLeft = 30;

    scoreDisplay.textContent = score;
    updateTimer();

    btn.disabled = false;
    restartBtn.style.display = "none";
    secretMessage.style.display = "none";

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) endGame();
    }, 1000);
}

// END GAME
function endGame() {
    clearInterval(timerInterval);
    timerRunning = false;

    btn.disabled = true;

    timerDisplay.textContent = "Time's Up!";
    scoreDisplay.textContent = "Final Score: " + score;

    restartBtn.style.display = "block";

    // SECRET MESSAGE
    if (score === 143) {
        secretMessage.style.display = "block";
        setTimeout(() => {
            alert("Achievement unlocked: Lemon 🍋");
        }, 300);
    }

    // SAVE HIGHSCORE
    if (score > highscore) {
        highscore = score;
        localStorage.setItem("popcatHighscore", highscore);
        highscoreDisplay.textContent = "High Score: " + highscore;
    }
}

// OPEN / CLOSE MOUTH
function openMouth() {
    if (!timerRunning) startGame();
    if (!timerRunning) return;

    popcat.src = openMouthImg;
    popcat.style.transform = "scale(1.08)";

    try { openSound.currentTime = 0; openSound.play(); } catch(err){}

    score++;
    scoreDisplay.textContent = score;
}

function closeMouth() {
    if (!timerRunning) return;

    popcat.src = closeMouthImg;
    popcat.style.transform = "scale(1)";

    try { closeSound.currentTime = 0; closeSound.play(); } catch(err){}
}

// BUTTON EVENTS
btn.addEventListener("mousedown", openMouth);
btn.addEventListener("mouseup", closeMouth);

// MOBILE
btn.addEventListener("touchstart", (e)=>{e.preventDefault(); openMouth();});
btn.addEventListener("touchend", (e)=>{e.preventDefault(); closeMouth();});

// KEYBOARD (SPACEBAR) - anti-cheat
let spaceHeld = false;
document.addEventListener("keydown", (e)=>{
    if(e.code==="Space" && !spaceHeld){
        spaceHeld = true;
        openMouth();
    }
});
document.addEventListener("keyup", (e)=>{
    if(e.code==="Space"){
        spaceHeld = false;
        closeMouth();
    }
});

// RESTART BUTTON
restartBtn.addEventListener("click", ()=>{
    popcat.src = closeMouthImg;

    score = 0;
    timeLeft = 30;

    scoreDisplay.textContent = score;
    updateTimer();

    btn.disabled = false;
    restartBtn.style.display = "none";
    secretMessage.style.display = "none";

    timerRunning = false;
});
