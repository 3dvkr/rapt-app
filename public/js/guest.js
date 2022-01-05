const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener("click", addToSessionList);

function addToSessionList() {
    document.querySelector(".record").classList.remove("hide");
    const sessionType = document.querySelector('input[name="sessionType"]:checked').value;
    const duration = document.getElementById("sessionTimer").value;
    const session = {
        sessionType,
        duration
    };
    const sessionList = document.getElementById("sessionList");
    const sessionItem = document.createElement("li");
    sessionItem.textContent = `${session.sessionType} session for ${session.duration} minute(s)`;
    sessionList.appendChild(sessionItem);
    document.getElementById("modalFade").classList.add("hide");
    startBtn.classList.remove("hide");
}