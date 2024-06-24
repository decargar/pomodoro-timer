// JavaScript code in script.js

let workTime = 25 * 60; // 25 minutes in seconds
let shortBreakTime = 5 * 60; // 5 minutes in seconds
let longBreakTime = 15 * 60; // 15 minutes in seconds
let currentTime = workTime;
let timerInterval;
let isRunning = false;
let isPaused = false;
let currentMode = 'pomodoro'; // Initial mode is pomodoro

// Function to start the timer based on current mode
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        document.getElementById("startBtn").disabled = true;
        document.getElementById("pauseBtn").disabled = false;
        document.getElementById("resetBtn").disabled = false;
        timerInterval = setInterval(updateTimer, 1000);
    }
}

// Function to pause the timer
function pauseTimer() {
    isPaused = true;
    document.getElementById("pauseBtn").disabled = true;
    document.getElementById("resumeBtn").disabled = false;
    clearInterval(timerInterval);
}

// Function to resume the timer
function resumeTimer() {
    isPaused = false;
    document.getElementById("pauseBtn").disabled = false;
    document.getElementById("resumeBtn").disabled = true;
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to reset the timer
function resetTimer() {
    isRunning = false;
    isPaused = false;
    clearInterval(timerInterval);
    currentTime = getTimeByMode(currentMode);
    updateDisplay(currentTime);
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = true;
    document.getElementById("resumeBtn").disabled = true;
    document.getElementById("resetBtn").disabled = true;
}

// Function to update the timer display
function updateTimer() {
    if (!isPaused) {
        currentTime--;
        updateDisplay(currentTime);
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            handleEndOfTimer();
        }
    }
}

// Function to handle the end of the timer
function handleEndOfTimer() {
    alert("Time's up!");
    switchMode(); // Switch to the next mode
    currentTime = getTimeByMode(currentMode);
    updateDisplay(currentTime);
    startTimer(); // Start the next timer automatically
}

// Function to switch mode between Pomodoro, Short Break, and Long Break
function switchMode() {
    if (currentMode === 'pomodoro') {
        currentMode = 'shortBreak';
    } else if (currentMode === 'shortBreak') {
        currentMode = 'longBreak';
    } else if (currentMode === 'longBreak') {
        currentMode = 'pomodoro';
    }
    updateButtonState(currentMode); // Update button states based on mode
}

// Function to get time in seconds based on mode
function getTimeByMode(mode) {
    if (mode === 'pomodoro') {
        return workTime;
    } else if (mode === 'shortBreak') {
        return shortBreakTime;
    } else if (mode === 'longBreak') {
        return longBreakTime;
    }
}

// Function to update button states based on mode
function updateButtonState(mode) {
    if (mode === 'pomodoro') {
        document.getElementById("pomodoroBtn").disabled = true;
        document.getElementById("shortBreakBtn").disabled = false;
        document.getElementById("longBreakBtn").disabled = false;
    } else if (mode === 'shortBreak') {
        document.getElementById("pomodoroBtn").disabled = false;
        document.getElementById("shortBreakBtn").disabled = true;
        document.getElementById("longBreakBtn").disabled = false;
    } else if (mode === 'longBreak') {
        document.getElementById("pomodoroBtn").disabled = false;
        document.getElementById("shortBreakBtn").disabled = false;
        document.getElementById("longBreakBtn").disabled = true;
    }
}

// Function to update the timer display
function updateDisplay(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    document.getElementById("timer").textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Event listeners for mode buttons
document.getElementById("pomodoroBtn").addEventListener("click", function() {
    currentMode = 'pomodoro';
    updateButtonState(currentMode);
    resetTimer();
});

document.getElementById("shortBreakBtn").addEventListener("click", function() {
    currentMode = 'shortBreak';
    updateButtonState(currentMode);
    resetTimer();
});

document.getElementById("longBreakBtn").addEventListener("click", function() {
    currentMode = 'longBreak';
    updateButtonState(currentMode);
    resetTimer();
});

// Initialize button states based on initial mode (pomodoro)
updateButtonState(currentMode);
updateDisplay(currentTime);
