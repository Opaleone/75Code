const main = document.querySelector('#main');
const card = document.querySelectorAll('.card');
const timer = document.querySelectorAll('.timer-clicker')
const timerLength = document.querySelectorAll('.timer-length')



const handleTimerClick = (time) => {
  const timerTimeP = document.querySelector('.timer-time')

  let timeInMs = time
  
  const future = new Date().valueOf() + timeInMs
  const now = new Date().valueOf();
  const diff = future - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor(diff / (1000 * 60));
  const secs = Math.floor(diff / 1000);

  const h = hours - days * 24;
  const m = mins - hours * 60;
  const s = secs - mins * 60;

  timerTimeP.innerHTML = `${h}h ${m}m ${s}s`

  // console.log()
}



const timerDisplay = (timerDiv, selectedCard) => {
  const parentDiv = selectedCard

  const newDiv = document.createElement('div');
  const newP = document.createElement('p');

  newDiv.classList.add('timer-display');
  newP.classList.add('timer-time');

  timerDiv.style.display = 'none';

  newDiv.appendChild(newP);
  parentDiv.appendChild(newDiv);
}



for (let i = 0; i < timer.length; i++) {
  timer[i].addEventListener('click', function() {
    const targetCard = card[i];

    let timerStopCondition = parseInt(timerLength[i].innerHTML) * 60000 / 1000;
    let timeInMs = parseInt(timerLength[i].innerHTML) * 60000;
    let timesRun = 0;
    
    timerDisplay(timer[i], targetCard)
    
    let interval = setInterval(function start() {
      if (timesRun === timerStopCondition) {
        clearInterval(interval)
        timer[i].style.display = 'none';
        timerLength[i].innerHTML = 'Done!'
      }
      timesRun++

      handleTimerClick(timeInMs)

      timeInMs -= 1000

      return start
    }(), 1000)
  })
}
