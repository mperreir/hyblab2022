let txt = document.querySelector(".botterau");
txt.textContent = localStorage.getItem("objetGagner")
let button = document.querySelector(".goToBonusQuestion")
button.addEventListener('click', () => {
    window.location.href = 'question-ma-commune.html';
});
