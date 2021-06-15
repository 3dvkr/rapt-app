// update existing session records:
document.querySelectorAll(".update").forEach((el) =>
  el.addEventListener("click", (e) => {
    document.getElementById("updateDetailsBox").classList.remove("hide");
    document.getElementById("updateErrorP").classList.add("hide");

    let fetchBodyObj = {};

    document.getElementById("updateMemoBtn").addEventListener("click", () => {
      const newMemo = document.getElementById("newMemo").value;
      const newDuration = document.getElementById("newDuration").value;
      if (newMemo) {
        fetchBodyObj.memo = newMemo;
      }
      if (newDuration) {
        fetchBodyObj.duration = newDuration;
      }
      if (newMemo || newDuration) {
        console.log(fetchBodyObj);
        console.log(newMemo, newDuration);
        fetch(`/update/${e.target.parentNode.dataset.id}`, {
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
  })
);

document.querySelectorAll(".delete").forEach((el) =>
  el.addEventListener("click", (e) => {
    if (e.target) {
      fetch(`/delete/${e.target.parentNode.dataset.id}`, {
        method: "DELETE",
      }).then((res) => {
        window.location.reload();
      });
    }
  })
);

let barData = Array.from(document.querySelectorAll(".bartext")).map(
  (el) => +el.textContent.slice(0, -5)
);
console.log(barData)

if (barData.length > 0) {
  setTimeout(() => {
    d3.selectAll("div.bar")
      .data(barData)
      .style("width", (d) => `${(d / Math.max(...barData)) * 60}%`);
  }, 0);
}
