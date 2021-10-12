const navAccess = document.getElementById('navAccess');
console.log(navAccess);
navAccess.addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('hideNav');
});