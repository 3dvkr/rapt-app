let memoId = "", time = '', memo = '';

const memoBox = document.getElementById("newMemo");
const durationBox = document.getElementById("newDuration");

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById("modalFade").classList.add("hide");
});
// update existing session records:
document.querySelectorAll(".update").forEach((el) =>
  el.addEventListener("click", (e) => {
    el.parentElement.classList.add("highlightSelection");
    memoId = e.target.parentNode.dataset.id;
    [memo, time] = parseSession(el.parentElement.innerText);
    memoBox.value = memo;
    durationBox.value = time;
    document.getElementById("modalFade").classList.remove("hide");
    document.getElementById("updateErrorP").classList.add("hide");
    setTimeout(() => {
      el.parentElement.classList.remove("highlightSelection");
    }, 900);
  }));
// handle update form 'submission':
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

let barData = Array.from(document.querySelectorAll(".bartext")).map(
  (el) => +el.textContent.slice(0, -5)
);


if (barData.length > 0) {
  setTimeout(() => {
    d3.selectAll("div.bar")
      .data(barData)
      .style("width", (d) => `${(d / Math.max(...barData)) * 60}%`);
  }, 0);
}

function parseSession(sessionStr) {
  return [
    sessionStr.split(': ')[1].split(' m')[1].split(' E')[0].slice(6),
    sessionStr.split(': ')[1].split(' m')[0]
  ];
}