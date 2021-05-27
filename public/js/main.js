let timeString;

const startBtn = document.getElementById("startBtn");
if (startBtn) {
  startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    timeString = document.getElementById("sessionTimer").value;
    if (timeString && timeString > 0) {
      e.target.classList.add("hide");
      let [minutes, seconds] = [+timeString, 0];
      let countdown = setInterval(() => {
        if (seconds == 0) {
          seconds = 5; //fix
          minutes--;
        } // FIX THIS LINE, it's the wrong # for testing
        else {
          seconds--;
        }
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById("countdownP").textContent = `${minutes}:${seconds}`;
      }, 1000);
    }
  });
}