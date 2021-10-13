const navAccess = document.getElementById('navAccess');

navAccess.addEventListener('click', () => {
  toggleMenu();
});

navAccess.addEventListener('keypress' , () => {
  toggleMenu();
});

function toggleMenu() {
  document.getElementById('mainNav').classList.toggle('hideNav');
}