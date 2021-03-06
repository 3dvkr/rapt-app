let newTimerAllow = true;
const startBtn = document.getElementById("startBtn");

// Default time for session types:
let sessionType = "work";

const inputs = Array.from(
  document.querySelectorAll('input[name="sessionType"]')
);

inputs.forEach((el) => el.addEventListener("click", checkValue));

// block the user from interacting with the session labels while the timer is running
function checkValue(e) {
  if (newTimerAllow) {
    for (let i = 0; i < inputs.length; i++) {
      const prevLabel = inputs[i].previousElementSibling;

      if (inputs[i].checked) {
        prevLabel.classList.add("selected");
        sessionType = inputs[i].value;
      } else {
        prevLabel.classList.remove("selected");
      }
    }
    enterPresetTime(sessionType);
  }
}
function enterPresetTime(whichSession) {
  const duration = document.getElementById("sessionTimer");
  duration.focus();
  duration.value = whichSession == "work" ? 25 : 5;
}

// Count down feature
let timeString;

startBtn.addEventListener("click", (e) => {
  e.preventDefault();

  newTimerAllow = false;
  window.onbeforeunload = function (e) {
    e.preventDefault();
    return "Your timer will be cancelled. Are you sure you want to navigate away from this page?";
  };
  timeString = document.getElementById("sessionTimer").value;
  if (timeString && timeString > 0) {
    startBtn.classList.add("hide");
    let [minutes, seconds] = [+timeString, 0];
    let countdown = setInterval(() => {
      if (seconds == 0) {
        seconds = 59;
        minutes--;
      } else {
        seconds--;
      }
      seconds = seconds < 10 ? "0" + seconds : seconds;
      document.getElementById(
        "countdownP"
      ).textContent = `${minutes}:${seconds}`;
      if (minutes == 0 && seconds == 0) {
        clearInterval(countdown);
        if (Notification.permission === "granted") {
          createNotification(sessionType);
        }
        document.getElementById(
          "sessionInfo"
        ).textContent = `You had a ${timeString}-minute long ${sessionType} session. Add to history?`;
        document.getElementById("modalFade").classList.remove("hide");

        newTimerAllow = true;
        if (window.location.pathname == "/timer") {
          window.onbeforeunload = function (e) {
            e.preventDefault();
            return "Any session history will be cleared. Are you sure you want to navigate away from this page?";
          };
        } else {
          window.onbeforeunload = null;
        }
      }
    }, secondLength);
  }
});
