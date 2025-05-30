// script.js - Parties 1 et 2 (Exercice 1)

// 1. DOM Level 0 - onproperty
const boutonDOM0 = document.getElementById('monBoutonDOM0');
const messageInteraction = document.getElementById('messageInteraction');

boutonDOM0.onclick = function() {
    messageInteraction.textContent = 'Interaction : Bouton DOM Level 0 cliqué !';
    console.log('Bouton DOM Level 0 cliqué !');
};

// 2. DOM Level 2 - addEventListener
const boutonDOM2 = document.getElementById('monBoutonDOM2');

function gererClicBoutonDOM2(event) {
    messageInteraction.textContent = 'Interaction : Bouton DOM Level 2 cliqué !';
    console.log('Bouton DOM Level 2 cliqué !', event.target); // event.target est le bouton
}

boutonDOM2.addEventListener('click', gererClicBoutonDOM2);

// Ajout d'un deuxième écouteur pour démontrer la différence avec DOM Level 0
boutonDOM2.addEventListener('click', function() {
    console.log('Deuxième écouteur pour bouton DOM Level 2 !');
});

// Événements de souris
const zoneSurvol = document.getElementById('zoneSurvol');
const coordonneesSouris = document.getElementById('coordonneesSouris');

zoneSurvol.addEventListener('mouseover', function() {
    zoneSurvol.style.backgroundColor = 'lightgreen';
});

zoneSurvol.addEventListener('mouseout', function() {
    zoneSurvol.style.backgroundColor = 'lightblue';
});

zoneSurvol.addEventListener('mousemove', function(event) {
    coordonneesSouris.textContent = `X: ${event.clientX}, Y: ${event.clientY}`;
});

// Événements de clavier
const champTexte = document.getElementById('champTexte');
const affichageTouche = document.getElementById('affichageTouche');
const contenuChamp = document.getElementById('contenuChamp'); // Pour le bonus

champTexte.addEventListener('keydown', function(event) {
    affichageTouche.textContent = `Dernière touche pressée : ${event.key} (Code: ${event.keyCode})`;
});

// Bonus : Affichage en temps réel du contenu du champ
champTexte.addEventListener('input', function(event) {
    contenuChamp.textContent = `Contenu : ${event.target.value}`;
});


// script.js - Parties 3 et 4 (Exercice 2)

// Prévention du comportement par défaut - Formulaire
const monFormulaire = document.getElementById('monFormulaire');
const messageForm = document.getElementById('messageForm');

monFormulaire.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const nomInput = document.getElementById('nom');
    if (nomInput.value.trim() === '') {
        messageForm.textContent = 'Veuillez remplir le champ Nom !';
        messageForm.style.color = 'red';
    } else {
        messageForm.textContent = `Formulaire soumis par ${nomInput.value} (via JavaScript) !`;
        messageForm.style.color = 'green';
        // Ici, vous enverriez normalement les données à un serveur via Fetch API ou XMLHttpRequest
    }
});

// Prévention du comportement par défaut - Lien
const monLien = document.getElementById('monLien');
const messageLien = document.getElementById('messageLien');

monLien.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche la redirection par défaut du lien
    messageLien.textContent = 'Redirection vers Google annulée !';
    messageLien.style.color = 'orange';
});

// Délégation d'événements et ajout dynamique
const listeDynamique = document.getElementById('listeDynamique');
const ajouterElementBouton = document.getElementById('ajouterElement');
let compteurElements = 3; // Pour les nouveaux éléments

// Écouteur sur l'élément parent (<ul>)
listeDynamique.addEventListener('click', function(event) {
    // Vérifie si l'élément cliqué est bien un <li>
    if (event.target.tagName === 'LI') {
        console.log('Élément cliqué :', event.target.textContent);
        event.target.style.color = 'red';
        // Pour le remettre à la normale après un court délai (optionnel)
        setTimeout(() => {
            event.target.style.color = 'initial';
        }, 500);
    }
});

// Ajout dynamique d'éléments
ajouterElementBouton.addEventListener('click', function() {
    compteurElements++;
    const nouvelElement = document.createElement('li');
    nouvelElement.textContent = `Nouvel Élément ${compteurElements}`;
    listeDynamique.appendChild(nouvelElement);
    console.log('Nouvel élément ajouté :', nouvelElement.textContent);
});


// script.js - Partie 5 (Exercice 3 - Détecteur de Mouvement)

const zoneDessin = document.getElementById('zoneDessin');
const resultatDetection = document.getElementById('resultatDetection');
const resetDetectionBtn = document.getElementById('resetDetection');

let isDrawing = false;
let startX, startY;
let pathPoints = [];

// Fonction pour ajouter un point visuel
function addPointToDrawing(x, y) {
    const pointDiv = document.createElement('div');
    pointDiv.classList.add('point');
    // Les coordonnées doivent être relatives à la zoneDessin
    const rect = zoneDessin.getBoundingClientRect();
    pointDiv.style.left = `${x - rect.left - 2.5}px`; // -2.5 pour centrer le point de 5px
    pointDiv.style.top = `${y - rect.top - 2.5}px`;
    zoneDessin.appendChild(pointDiv);
}

// Efface tous les points visuels
function clearDrawing() {
    const points = zoneDessin.querySelectorAll('.point');
    points.forEach(point => point.remove());
}

zoneDessin.addEventListener('mousedown', function(event) {
    isDrawing = true;
    startX = event.clientX;
    startY = event.clientY;
    pathPoints = [{ x: startX, y: startY }];
    clearDrawing();
    addPointToDrawing(startX, startY); // Ajoute le point de départ
    resultatDetection.textContent = 'Détection : Dessin en cours...';
});

zoneDessin.addEventListener('mousemove', function(event) {
    if (isDrawing) {
        pathPoints.push({ x: event.clientX, y: event.clientY });
        addPointToDrawing(event.clientX, event.clientY);
    }
});

zoneDessin.addEventListener('mouseup', function() {
    isDrawing = false;
    if (pathPoints.length > 10) { // Assez de points pour une détection significative
        detecterForme();
    } else {
        resultatDetection.textContent = 'Détection : Mouvement trop court.';
    }
});

// Gérer le cas où la souris sort de la zone de dessin avant mouseup
zoneDessin.addEventListener('mouseleave', function() {
    if (isDrawing) {
        isDrawing = false;
        if (pathPoints.length > 10) {
            detecterForme();
        } else {
            resultatDetection.textContent = 'Détection : Mouvement trop court.';
        }
    }
});


function detecterForme() {
    if (pathPoints.length < 2) {
        resultatDetection.textContent = 'Détection : Pas assez de points pour analyser.';
        return;
    }

    const firstPoint = pathPoints[0];
    const lastPoint = pathPoints[pathPoints.length - 1];

    // Calculer la différence totale en X et Y
    const deltaX = lastPoint.x - firstPoint.x;
    const deltaY = lastPoint.y - firstPoint.y;

    // Pour une détection plus robuste, on peut sommer les différences absolues entre chaque point successif
    let totalDeltaXAbs = 0;
    let totalDeltaYAbs = 0;
    for (let i = 1; i < pathPoints.length; i++) {
        totalDeltaXAbs += Math.abs(pathPoints[i].x - pathPoints[i-1].x);
        totalDeltaYAbs += Math.abs(pathPoints[i].y - pathPoints[i-1].y);
    }


    // Détecter si c'est majoritairement horizontal ou vertical
    const tolerance = 0.5; // Tolérance pour considérer un mouvement comme dominant
    if (totalDeltaXAbs > totalDeltaYAbs * (1 / tolerance)) { // Beaucoup plus de mouvement horizontal que vertical
        resultatDetection.textContent = 'Détection : Ligne Horizontale !';
        resultatDetection.style.color = 'blue';
    } else if (totalDeltaYAbs > totalDeltaXAbs * (1 / tolerance)) { // Beaucoup plus de mouvement vertical que horizontal
        resultatDetection.textContent = 'Détection : Ligne Verticale !';
        resultatDetection.style.color = 'green';
    } else if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20 && pathPoints.length > 10) {
         // Si le mouvement est court mais contient beaucoup de points, c'est peut-être un point ou un petit gribouillis
        resultatDetection.textContent = 'Détection : Gribouillis / Point';
        resultatDetection.style.color = 'purple';
    }
    else {
        resultatDetection.textContent = 'Détection : Autre forme (mouvement complexe)';
        resultatDetection.style.color = 'red';
    }
}

resetDetectionBtn.addEventListener('click', function() {
    clearDrawing();
    pathPoints = [];
    resultatDetection.textContent = 'Détection : Aucune';
    resultatDetection.style.color = 'initial';
});