// ========== Jeu 1 : Cible à cliquer ==========

let score = 0;
let interval;
const scoreSpan = document.getElementById("score");
const targetZone = document.getElementById("targetZone");

document.getElementById("startTarget").addEventListener("click", () => {
  score = 0;
  scoreSpan.textContent = score;
  clearInterval(interval);

  interval = setInterval(() => {
    const target = document.createElement("div");
    target.classList.add("target");

    const x = Math.random() * (targetZone.clientWidth - 40);
    const y = Math.random() * (targetZone.clientHeight - 40);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.addEventListener("click", () => {
      score++;
      scoreSpan.textContent = score;
      target.remove();
    });

    targetZone.appendChild(target);

    setTimeout(() => {
      if (target.parentNode) target.remove();
    }, 1000);
  }, 1500);
});

document.getElementById("stopTarget").addEventListener("click", () => {
  clearInterval(interval);
});

// ========== Jeu 2 : Quiz ==========

const quiz = [
  { q: "Quelle balise HTML permet d'inclure du JavaScript ?", r: "script" },
  { q: "Quel événement JS est déclenché au clic ?", r: "click" },
  { q: "Propriété JS pour modifier le texte d'un élément ?", r: "textContent" }
];

let quizScore = 0;
const quizDiv = document.getElementById("quiz");
const quizScoreSpan = document.getElementById("quizScore");

quiz.forEach((item, i) => {
  const container = document.createElement("div");
  container.innerHTML = `<p>${item.q}</p>
                         <input id="answer${i}" placeholder="Ta réponse">`;
  const button = document.createElement("button");
  button.textContent = "Valider";

  button.addEventListener("click", () => {
    const input = document.getElementById(`answer${i}`);
    if (input.value.trim().toLowerCase() === item.r.toLowerCase()) {
      quizScore++;
      quizScoreSpan.textContent = quizScore;
      input.disabled = true;
      button.disabled = true;
    } else {
      alert("Mauvaise réponse.");
    }
  });

  container.appendChild(button);
  quizDiv.appendChild(container);
});

// ========== Jeu 3 : Couleur dynamique ==========

const picker = document.getElementById("colorPicker");
const box = document.getElementById("colorBox");

picker.addEventListener("input", () => {
  box.style.backgroundColor = picker.value;
});

// ========== Jeu 4 : Chronomètre ==========

let chrono = 0;
let chronoInterval;
const chronoDisplay = document.getElementById("chrono");

document.getElementById("startChrono").addEventListener("click", () => {
  clearInterval(chronoInterval);
  chronoInterval = setInterval(() => {
    chrono++;
    chronoDisplay.textContent = `${chrono} s`;
  }, 1000);
});

document.getElementById("pauseChrono").addEventListener("click", () => {
  clearInterval(chronoInterval);
});

document.getElementById("resetChrono").addEventListener("click", () => {
  clearInterval(chronoInterval);
  chrono = 0;
  chronoDisplay.textContent = "0 s";
});
