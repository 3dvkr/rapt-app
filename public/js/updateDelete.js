let memoId = "", time = '', memo = '';

const memoBox = document.getElementById("newMemo");
const durationBox = document.getElementById("newDuration");

// display form to update existing work sessions:
if (document.querySelector(".update")){
document.querySelectorAll(".update").forEach((el) =>
  el.addEventListener("click", (e) => {
    el.parentElement.classList.add("highlightSelection");
    memoId = e.target.parentNode.dataset.id;
    [memo, time] = parseSession(el.parentElement.innerText);
    // prefill out the form for updating:
    memoBox.value = memo;
    durationBox.value = time;

    document.getElementById("modalFade").classList.remove("hide");
    document.getElementById("updateErrorP").classList.add("hide");
    setTimeout(() => {
      el.parentElement.classList.remove("highlightSelection");
    }, 900);
  }));
}
// handle update form submission:
if (document.getElementById("updateMemoBtn")) {
  document.getElementById("updateMemoBtn").addEventListener("click", () => { 
      let fetchBodyObj = {};

      const newMemo = memoBox.value;
      const newDuration = durationBox.value;
      if (newMemo) {
        fetchBodyObj.memo = newMemo;
      }
      if (newDuration) {
        fetchBodyObj.duration = newDuration;
      }
      if (newMemo || newDuration) {
        fetch(`/update/${memoId}`, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(fetchBodyObj),
        }).then((res) => {
          window.location.reload();
        })
      } else {
        document.getElementById("updateErrorP").classList.remove("hide");
      }
    });
}
// handle delete form submission:
  document.querySelectorAll(".delete").forEach((el) =>
    el.addEventListener("click", (e) => {
      if (e.target) {
        fetch(`/delete/${e.target.parentNode.dataset.id}`, {
          method: "DELETE",
        }).then(() => {
          window.location.reload();
        });
      }
    })
  );

function parseSession(sessionStr) {
  return [
    sessionStr.split(': ')[1].split(' m')[1].split('E')[0].slice(6),
    sessionStr.split(': ')[1].split(' m')[0]
  ];
}