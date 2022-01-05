if (document.getElementById("closeModal")){
    document.getElementById("closeModal").addEventListener("click", () => {
      document.getElementById("modalFade").classList.add("hide");
      startBtn.classList.remove("hide");
    });
  }