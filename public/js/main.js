let newTimerAllow = true;
const startBtn = document.getElementById("startBtn");

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("timeModalFade").classList.add("hide");
  startBtn.classList.remove("hide");
});

// Default time for session types:
let inputs = document.querySelectorAll('.sessionOption');
let sessionType = 'work';
inputs.forEach((el) =>
  el.addEventListener("click", () => {
    if (newTimerAllow) {
      document.getElementById('startBtn').classList.remove("hide");
      Array.from(inputs).forEach((el) => {
        el.classList.remove("selected");
      });
      Array.from(inputs)
        .filter((el) => el.childNodes[3].checked)
        .forEach((el) => {
          el.classList.add("selected");
          let duration = document.querySelector('input[name="duration"]');
          duration.focus();
          sessionType = el.value;
          duration.value = el.value == "work" ? 25 : 5; 
        });
      }
    }
  )
);


// Count down feature
let timeString;

if (startBtn) {
  startBtn.addEventListener("click", (e) => {
    e.preventDefault();
  //   window.onbeforeunload = function() {
  //     return "Do you really want to leave our brilliant application?";

  //  };

    newTimerAllow = false;
    timeString = document.getElementById("sessionTimer").value;
    if (timeString && timeString > 0) {
      startBtn.classList.add("hide");
      let [minutes, seconds] = [+timeString, 0];
      let countdown = setInterval(() => {
        if (seconds == 0) {
          seconds = 59; 
          minutes--;
        } 
        else {
          seconds--;
        }
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById("countdownP").textContent = `${minutes}:${seconds}`;
        if (minutes == 0 && seconds == 0) {
          clearInterval(countdown);
          if(Notification.permission === 'granted') {
            createNotification(sessionType);
          }
          document.getElementById("sessionInfo").textContent = `You had a ${timeString}-minute long ${sessionType} session. Add to history?`;
          document.getElementById("timeModalFade").classList.remove("hide");
          
          
          newTimerAllow = true;
        }
      }, 
      20);
      // 1000);
    }
  });
}