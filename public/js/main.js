// Default time for session types:
let inputs = document.querySelectorAll('input[name="sessionType"]');
let sessionType = 'work';
inputs.forEach((el) =>
  el.addEventListener("click", () => {
    document.getElementById('startBtn').classList.remove("hide");
    Array.from(inputs).forEach((el) => {
      el.parentNode.children[0].classList.remove("selected");
    });

    Array.from(inputs)
      .filter((el) => el.checked)
      .forEach((el) => {
        el.parentNode.children[0].classList.add("selected");
        let duration = document.querySelector('input[name="duration"]');
        duration.focus();
        sessionType = el.value;
        duration.value = el.value == "work" ? 25 : 5; 
      });
  })
);


// Count down feature
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
            createNotification();
          }
          document.getElementById("sessionInfo").textContent = `You had a ${timeString}-minute long ${sessionType} session. Add to history?`;
          document.getElementById("submitBtn").classList.remove("hide");
        }
      }, 
      20);
      // 1000);
    }
  });
}

function check(){
  var radios = document.getElementsByName("input");

  for (var i = 0, len = radios.length; i < len; i++) {
       if (radios[i].checked) {
           return true;
       }
  }

  return false;
}