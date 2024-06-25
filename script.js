let workTime = 25 * 60; // 25 minutes in seconds
        let shortBreakTime = 5 * 60; // 5 minutes in seconds
        let longBreakTime = 15 * 60; // 15 minutes in seconds
        let currentTime = workTime;
        let timerInterval;
        let isRunning = false;
        let isPaused = false;
        let currentMode = 'pomodoro'; // Initial mode is pomodoro

        function setMode(mode) {
            currentMode = mode;
            currentTime = getTimeByMode(currentMode);
            updateDisplay(currentTime);
            updateButtonState();
        }

        function startTimer() {
            if (!isRunning) {
                isRunning = true;
                isPaused = false;
                document.getElementById("startBtn").disabled = true;
                document.getElementById("pauseBtn").disabled = false;
                document.getElementById("resetBtn").disabled = false;
                timerInterval = setInterval(updateTimer, 1000);
            }
        }

        function pauseTimer() {
            if (isRunning && !isPaused) {
                isPaused = true;
                clearInterval(timerInterval);
                document.getElementById("pauseBtn").disabled = true;
                document.getElementById("resumeBtn").disabled = false;
            }
        }

        function resumeTimer() {
            if (isRunning && isPaused) {
                isPaused = false;
                document.getElementById("pauseBtn").disabled = false;
                document.getElementById("resumeBtn").disabled = true;
                timerInterval = setInterval(updateTimer, 1000);
            }
        }

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

        function handleEndOfTimer() {
            alert("Time's up!");
            switchMode(); // Switch to the next mode
            currentTime = getTimeByMode(currentMode);
            updateDisplay(currentTime);
            startTimer(); // Start the next timer automatically
        }

        function getTimeByMode(mode) {
            if (mode === 'pomodoro') {
                return workTime;
            } else if (mode === 'shortBreak') {
                return shortBreakTime;
            } else if (mode === 'longBreak') {
                return longBreakTime;
            }
        }

        function updateDisplay(timeInSeconds) {
            let minutes = Math.floor(timeInSeconds / 60);
            let seconds = timeInSeconds % 60;
            document.getElementById("timer").textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function updateButtonState() {
            document.getElementById("startBtn").disabled = false;
            document.getElementById("pauseBtn").disabled = true;
            document.getElementById("resumeBtn").disabled = true;
            document.getElementById("resetBtn").disabled = true;
            if (currentMode === 'pomodoro') {
                document.getElementById("pomodoroBtn").disabled = true;
                document.getElementById("shortBreakBtn").disabled = false;
                document.getElementById("longBreakBtn").disabled = false;
            } else if (currentMode === 'shortBreak') {
                document.getElementById("pomodoroBtn").disabled = false;
                document.getElementById("shortBreakBtn").disabled = true;
                document.getElementById("longBreakBtn").disabled = false;
            } else if (currentMode === 'longBreak') {
                document.getElementById("pomodoroBtn").disabled = false;
                document.getElementById("shortBreakBtn").disabled = false;
                document.getElementById("longBreakBtn").disabled = true;
            }
        }