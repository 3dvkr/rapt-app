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
        if (minutes == 0 && seconds == 0) {
          clearInterval(countdown);
          document.getElementById("sessionInfo").textContent = `You had a ${timeString}-minute long ${sessionType} session. Add to history?`;
          document.getElementById("submitBtn").classList.remove("hide");
        }
      }, 1000);
    }
  });
}

// update existing session records:
document.querySelectorAll(".update").forEach((el) =>
  el.addEventListener("click", (e) => {
    document.getElementById('updateDetailsBox').classList.remove('hide')

    let fetchBodyObj = {};
    
    document.getElementById("updateMemoBtn").addEventListener("click", () => {
      const newMemo = document.getElementById("newMemo").value;
      const newDuration = document.getElementById("newDuration").value;
      if (newMemo) {fetchBodyObj.memo = newMemo}
      if (newDuration) {fetchBodyObj.duration = newDuration}
      if (newMemo || newDuration) {
        console.log(fetchBodyObj)
        console.log(newMemo, newDuration)
        fetch(`/update/${e.target.parentNode.dataset.id}`, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(fetchBodyObj),
        }).then((res) => {  
          window.location.reload();
        })
      } else {
        document.getElementById('updateErrorP').classList.remove('hide')
      }
    })
  })
);