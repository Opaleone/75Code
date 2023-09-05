
/* ***************
  GLOBAL VARIABLES
 ***************** */

const timer = document.querySelectorAll('.timer-clicker');
const timerLength = document.querySelectorAll('.timer-length');
const days = document.querySelector('#day-counter');

let timerIndexArr = [];

let dayCtr = localStorage.getItem('dayCtr');
let midnight = localStorage.getItem('midnight');
let parsedTimerIndex = JSON.parse(localStorage.getItem('timerIndex'));


// setting today midnight
const todayMidnight = new Date();
todayMidnight.setDate(todayMidnight.getDate() + 1)
todayMidnight.setUTCHours(0,0,0,0);

// Adjusts midnight according to Timezone user is in
const midnightTimezone = todayMidnight.getTimezoneOffset() * 60;

// Converts midnight to unix timestamp and adds timezone offset for midnight according to user location
const midnightUnix = Math.floor(todayMidnight.getTime() / 1000 + midnightTimezone);

// Retrieving current time and converting date to UNIX
const rightNow = Math.floor(new Date() / 1000);


/* **********************
  FUNCTION DECLARATIONS
 ********************** */

const reset = () => {
  if (parsedTimerIndex.length !== timer.length) {
    localStorage.setItem('dayCtr', 0);
  } else {
    localStorage.setItem('dayCtr', ++dayCtr);
    days.textContent = dayCtr;
  }

  localStorage.setItem('midnight', midnightUnix);
  localStorage.setItem('timerIndex', JSON.stringify(timerIndexArr))


  for (let i = 0; i < timer.length; i++) {
    timerLength[i].innerHTML = timerLength[i].textContent;
    timer[i].style.display = 'flex';
  }
}

const complete = () => {
  for (let i = 0; i < timer.length; i++) {
    if (parsedTimerIndex.includes(i)) {
      timerLength[i].innerHTML = 'Done!';
      timer[i].style.display = 'none';
    }
  }
}

const timerIndexPush = (selectedTimerIndex) => {
  parsedTimerIndex.push(selectedTimerIndex);
}

const pastMidnight = () => {
  return rightNow > midnight;
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

/* **************************
  IIFE for LocalStorage Items
 ************************** */

// Initializes local storage items if there are none
(function setLocalStorageItems() {
  if (!dayCtr) {
    localStorage.setItem('dayCtr', 0);
  } else {
    days.textContent = dayCtr;
  }

  if (!midnight) {
    localStorage.setItem('midnight', midnightUnix)
  }

  if (!parsedTimerIndex) {
    localStorage.setItem('timerIndex', JSON.stringify(timerIndexArr));
    location.reload();
  }

  if (pastMidnight()) {
    reset();
  } else if (!pastMidnight()) {
    complete();
  }

})();

/* ***************
  EVENT LISTENERS
 *************** */

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
        timerLength[i].innerHTML = 'Done!';
        timerIndexPush(i);
        localStorage.setItem('timerIndex', JSON.stringify(parsedTimerIndex))
      };
      timesRun++;

      handleTimerClick(timeInMs, timerTimeP[i]);

      timeInMs -= 1000;

      return start;
    }(), 1000);
  });
};
