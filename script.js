const main = document.querySelector('#main');
const card = document.querySelectorAll('.card');
const timer = document.querySelectorAll('.timer-clicker');
const timerLength = document.querySelectorAll('.timer-length');
const days = document.querySelector('#day-counter');


let dayCtr = localStorage.getItem('dayCtr');

if (!dayCtr) {
  localStorage.setItem('dayCtr', 0);
} else {
  days.textContent = dayCtr;
}


// Handles logic for timer countdown
const handleTimerClick = (time, selectedTimerTimeP) => {
  let timeInMs = time;
  
  const future = new Date().valueOf() + timeInMs;
  const now = new Date().valueOf();
  const diff = future - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor(diff / (1000 * 60));
  const secs = Math.floor(diff / 1000);

  const h = hours - days * 24;
  const m = mins - hours * 60;
  const s = secs - mins * 60;

  selectedTimerTimeP.innerHTML = `${h}h ${m}m ${s}s`;
  document.title = `${h}h ${m}m ${s}s`;
}


// Creates event listener for each timer start btn
for (let i = 0; i < timer.length; i++) {
  timer[i].addEventListener('click', function() {
    const timerTimeP = document.querySelectorAll('.timer-time');
    const timerDisplayDiv = document.querySelectorAll('.timer-display');

    let timerStopCondition = parseInt(timerLength[i].innerHTML) * 60000 / 1000;
    let timeInMs = parseInt(timerLength[i].innerHTML) * 60000;
    let timesRun = 0;

    timer[i].style.display = 'none';
    timerDisplayDiv[i].style.display = 'flex';
    
    let interval = setInterval(function start() {
      if (timesRun === timerStopCondition) {
        clearInterval(interval)
        timerDisplayDiv[i].style.display = 'none';
        timerLength[i].innerHTML = 'Done!'
      };
      timesRun++;

      handleTimerClick(timeInMs, timerTimeP[i]);

      timeInMs -= 1000;

      return start;
    }(), 1000);
  });
};
