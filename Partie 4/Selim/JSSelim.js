
// Utilitaires
function msg(el, txt, type, dur=3000) {
    document.querySelectorAll('.message-info, .message-succes, .message-erreur').forEach(m => {
        m.classList.remove('visible'); m.textContent = '';
    });
    el.className = `message-${type}`; el.textContent = txt; el.classList.add('visible');
    setTimeout(() => { el.classList.remove('visible'); el.textContent = ''; }, dur);
}

// Partie 1: Compteur
let c = 0;
// ID de l'affichage du compteur est 'compteur' dans HTML
const affC = document.getElementById('compteur'), btnMoins = document.getElementById('moins'),
      btnPlus = document.getElementById('plus'), btnReset = document.getElementById('reset'),
      msgC = document.getElementById('msg-compteur');

function majC() { affC.textContent = c; }
btnMoins.addEventListener('click', () => { c--; majC(); msg(msgC, `Compteur: ${c}`, 'info'); });
btnPlus.addEventListener('click', () => { c++; majC(); msg(msgC, `Compteur: ${c}`, 'info'); });
btnReset.addEventListener('click', () => { c = 0; majC(); msg(msgC, 'Compteur remis à zéro!', 'succes'); });
majC(); msg(msgC, 'Bienvenue!', 'info');

// Partie 2: Formulaire
const formU = document.getElementById('form-user'), nomIn = document.getElementById('nom'),
      errNom = document.getElementById('err-nom'), msgF = document.getElementById('msg-form');

function valNom() {
    if (nomIn.value.trim().length < 3) {
        errNom.textContent = 'Min 3 lettres.'; errNom.classList.add('visible'); nomIn.classList.add('champ-erreur'); return false;
    }
    errNom.classList.remove('visible'); nomIn.classList.remove('champ-erreur'); return true;
}
formU.addEventListener('submit', e => {
    e.preventDefault();
    if (valNom()) { msg(msgF, `Bonjour, ${nomIn.value}!`, 'succes'); formU.reset(); }
});
nomIn.addEventListener('input', valNom);

// Partie 3: Tâches
const tacheTxt = document.getElementById('tache-txt'), btnAddTache = document.getElementById('add-tache'),
      listeTaches = document.getElementById('liste-taches'), msgT = document.getElementById('msg-taches');

function loadT() { return JSON.parse(localStorage.getItem('taches') || '[]'); }
function saveT(t) { localStorage.setItem('taches', JSON.stringify(t)); }
function creerT(tache) {
    const li = document.createElement('li'); li.textContent = tache.txt;
    if (tache.done) li.classList.add('terminee');
    const btnDone = document.createElement('button'); btnDone.textContent = tache.done ? 'Annuler' : 'Terminer';
    btnDone.style.backgroundColor = tache.done ? '#ffc107' : '#28a745';
    btnDone.addEventListener('click', () => {
        tache.done = !tache.done;
        li.classList.toggle('terminee');
        btnDone.textContent = tache.done ? 'Annuler' : 'Terminer';
        btnDone.style.backgroundColor = tache.done ? '#ffc107' : '#28a745';
        saveT(loadT().map(t => t.txt === tache.txt ? tache : t));
        msg(msgT, `Tâche "${tache.txt}" ${tache.done ? 'terminée' : 'non terminée'}.`, 'info');
    });
    const btnDel = document.createElement('button'); btnDel.textContent = 'Supprimer'; btnDel.style.backgroundColor = '#dc3545';
    btnDel.addEventListener('click', () => {
        li.remove(); saveT(loadT().filter(t => t.txt !== tache.txt));
        msg(msgT, `Tâche "${tache.txt}" supprimée.`, 'succes');
    });
    const divBtns = document.createElement('div'); divBtns.append(btnDone, btnDel); li.append(divBtns);
    return li;
}
function addT() {
    const txt = tacheTxt.value.trim();
    if (!txt) { msg(msgT, 'Écrivez une tâche!', 'erreur'); return; }
    const newT = { txt: txt, done: false };
    const taches = loadT(); taches.push(newT); saveT(taches);
    listeTaches.append(creerT(newT)); tacheTxt.value = '';
    msg(msgT, `Tâche "${txt}" ajoutée!`, 'succes');
}
btnAddTache.addEventListener('click', addT);
tacheTxt.addEventListener('keydown', e => { if (e.key === 'Enter') addT(); });
loadT().forEach(t => listeTaches.append(creerT(t)));
if (loadT().length === 0) msg(msgT, 'Aucune tâche. Ajoutez-en une!', 'info');

// Partie 4: Thème
const btnTheme = document.getElementById('toggle-theme'), msgTh = document.getElementById('msg-theme');

function applyTh() {
    document.body.classList.toggle('theme-sombre', localStorage.getItem('theme') === 'sombre');
}
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('theme-sombre');
    const isDark = document.body.classList.contains('theme-sombre');
    localStorage.setItem('theme', isDark ? 'sombre' : 'clair');
    msg(msgTh, `Thème: ${isDark ? 'sombre' : 'clair'}.`, 'info');
});
applyTh();

// Partie 5: Glisser-Déposer
// ID de l'élément déplaçable est 'element-deplacable' dans HTML
const dragEl = document.getElementById('element-deplacable');
let isDrag = false;
let initialMouseX, initialMouseY; // Position initiale de la souris
let initialElX, initialElY;     // Position initiale de l'élément

// Initialisation de la position de l'élément au chargement du DOM
function initDrag() {
    // S'assurer que l'élément est bien là avant de tenter de le manipuler
    if (!dragEl) {
        console.error("Erreur: L'élément déplaçable (#element-deplacable) n'a pas été trouvé dans le DOM.");
        return;
    }
    // Positionne l'élément en haut à gauche de son conteneur parent
    dragEl.style.left = '10px';
    dragEl.style.top = '10px';
    console.log('initDrag: Élément de glisser-déposer initialisé à (10px, 10px).');
}

dragEl.addEventListener('mousedown', e => {
    isDrag = true;
    dragEl.classList.add('en-mouvement');
    console.log('mousedown: Début du glisser-déposer. isDrag = true.');

    // Enregistrer la position initiale de la souris
    initialMouseX = e.clientX;
    initialMouseY = e.clientY;

    // Enregistrer la position initiale de l'élément (relative à son parent positionné)
    // On doit utiliser getComputedStyle pour lire les valeurs 'left' et 'top' actuelles
    // Si elles ne sont pas définies, elles seront 'auto', donc on les initialise à 0
    initialElX = parseFloat(getComputedStyle(dragEl).left) || 0;
    initialElY = parseFloat(getComputedStyle(dragEl).top) || 0;

    console.log('mousedown: Initial Mouse X:', initialMouseX, 'Y:', initialMouseY);
    console.log('mousedown: Initial Element X:', initialElX, 'Y:', initialElY);
});

document.addEventListener('mousemove', e => {
    if (!isDrag) return;
    // console.log('mousemove: Glisser en cours. ClientX:', e.clientX, 'ClientY:', e.clientY);

    // Calculer le déplacement de la souris
    const deltaX = e.clientX - initialMouseX;
    const deltaY = e.clientY - initialMouseY;

    // Calculer la nouvelle position de l'élément
    let newX = initialElX + deltaX;
    let newY = initialElY + deltaY;

    // Limiter le mouvement à l'intérieur de la section parente
    const parent = dragEl.parentElement;
    const pRect = parent.getBoundingClientRect();

    const largeurElement = dragEl.offsetWidth;
    const hauteurElement = dragEl.offsetHeight;

    newX = Math.max(0, Math.min(newX, pRect.width - largeurElement));
    newY = Math.max(0, Math.min(newY, pRect.height - hauteurElement));

    dragEl.style.left = newX + 'px';
    dragEl.style.top = newY + 'px';
    // console.log('mousemove: Nouvelle position (relative au parent) X:', newX, 'Y:', newY);
});

document.addEventListener('mouseup', () => {
    isDrag = false;
    dragEl.classList.remove('en-mouvement');
    console.log('mouseup: Fin du glisser-déposer. isDrag = false.');
});

document.addEventListener('DOMContentLoaded', () => {
    initDrag(); // Initialiser le glisser-déposer après le chargement du DOM
});
