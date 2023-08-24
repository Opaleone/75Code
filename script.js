const main = document.querySelector('#main');
const card = document.querySelector('.card');
const timer = document.querySelectorAll('.timer-clicker')
const timerLength = document.querySelectorAll('.timer-length')

// console.log(parseInt(timerLength[0].innerHTML))


const handleTimerClick = (time) => {
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

  // console.log()
}

// handleTimerClick(parseInt(timerLength[i].innerHTML))



for (let i = 0; i < timer.length; i++) {
  timer[i].addEventListener('click', function() {
    setInterval(function () {
      let timeInMs = parseInt(timerLength[i].innerHTML) * 60000;

      handleTimerClick(timeInMs)

      timeInMs -= 1000
    }, 1000)
  })
}