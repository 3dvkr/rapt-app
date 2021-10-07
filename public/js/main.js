let newTimerAllow = true;
const startBtn = document.getElementById("startBtn");

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modalFade").classList.add("hide");
  startBtn.classList.remove("hide");
});

// Default time for session types:
let inputs = document.querySelectorAll('.sessionOption');
let sessionType = 'work';
inputs.forEach((el) =>
  el.addEventListener("click", () => {
    if (newTimerAllow) {
      // Make the option to start timer available:
      document.getElementById('startBtn').classList.remove("hide");
      // Reset the form:
      Array.from(inputs).forEach((el) => {
        el.classList.remove("selected");
      });
      // Set the selected option:
      const pickChecked = Array.from(inputs)
        .filter((el) => el.childNodes[3].checked)
      console.log(pickChecked);
      pickChecked.forEach((el) => {
          console.log(el)
          el.classList.add("selected");
          let duration = document.getElementById("sessionTimer");
          duration.focus();
          sessionType = el.childNodes[1].innerText.toLowerCase();
          duration.value = sessionType == "work" ? 25 : 5; 
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
          document.getElementById("modalFade").classList.remove("hide");
          
          
          newTimerAllow = true;
        }
      }, 
      20);
      // 1000);
    }
  });
}