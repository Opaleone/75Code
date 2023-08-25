const main = document.querySelector('#main');
const card = document.querySelector('.card');
const timer = document.querySelectorAll('.timer-clicker')
const timerLength = document.querySelectorAll('.timer-length')


const handleTimerClick = (time, timerChild) => {
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

  console.log(`${h}h ${m}m ${s}s`)


  timerChild.style.color = "#444"
  timerChild.innerHTML = `${h}h ${m}m ${s}s`

  // console.log()
}


for (let i = 0; i < timer.length; i++) {
  timer[i].addEventListener('click', function() {
    let timerStopCondition = parseInt(timerLength[i].innerHTML) * 60000 / 1000 + 1;
    let timeInMs = parseInt(timerLength[i].innerHTML) * 60000;
    let timesRun = 0
    
    let interval = setInterval(function () {
      timesRun++
      if (timesRun === timerStopCondition) {
        clearInterval(interval)
        timer[i].style.display = 'none';
        timerLength[i].innerHTML = 'Done!'
      }
      handleTimerClick(timeInMs, timer[i])

      timeInMs -= 1000
    }, 1000)
  })
}
