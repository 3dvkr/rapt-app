// select demo mode:
const demoMemo = document.getElementById("demoMemo");
const demoSwitch = document.getElementById("demo");
if (demoSwitch.value === "1") {
    demoMemo.classList.remove('hide');
}
let secondLength = demoSwitch.value == 1 ? 20 : 1000;
demoSwitch.addEventListener("change", switchDemoMode);

function switchDemoMode(e) {
  console.log(demoSwitch.value, e.target.value);
    if (demoSwitch.value === "1") {
        secondLength = 20;
        demoMemo.classList.remove('hide');
    } else {
        secondLength = 1000;
        demoMemo.classList.add('hide');
    }
}