// Default time for session types:
let inputs = document.querySelectorAll('input[name="sessionType"]');
let sessionType;
inputs.forEach((el) =>
  el.addEventListener("click", () => {
    Array.from(inputs).forEach((el) => {
      el.parentNode.children[1].classList.remove("selected");
    });

    Array.from(inputs)
      .filter((el) => el.checked)
      .forEach((el) => {
        el.parentNode.children[1].classList.add("selected");
        let duration = document.querySelector('input[name="duration"]');
        duration.focus();
        sessionType = el.value;
        duration.value = el.value == "work" ? 2 : 1; // fix
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