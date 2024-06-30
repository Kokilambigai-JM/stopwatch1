let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let lapId = 1;
let isRunning = false;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const lapTimes = document.querySelector('.lap-times');

function formatTime(milliseconds) {
  let hours = Math.floor(milliseconds / 3600000);
  let minutes = Math.floor((milliseconds % 3600000) / 60000);
  let seconds = Math.floor((milliseconds % 60000) / 1000);
  let ms = milliseconds % 1000;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);
  }
}

function stopTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
  }
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  display.textContent = '00:00:00.000';
  laps = [];
  lapId = 1;
  updateLapTimes();
}

function addLapTime() {
  if (isRunning) {
    laps.push(elapsedTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${lapId}: ${formatTime(elapsedTime)}`;
    lapTimes.prepend(li);
    lapId++;
  }
}

function updateLapTimes() {
  lapTimes.innerHTML = '';
  laps.forEach((lapTime, index) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
    lapTimes.appendChild(li);
  });
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

document.querySelector('.lap-times').addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    const lapIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
    elapsedTime = laps[lapIndex];
    display.textContent = formatTime(elapsedTime);
  }
});
