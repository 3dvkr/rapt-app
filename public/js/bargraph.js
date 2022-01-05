if (document.querySelector(".bartext")){
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
  }