// script.js

// --- Variables globales et fonctions utilitaires ---

// Pour le compteur
let counter = 0;
let step = 1;
let counterMessageTimeout; // Gère le délai d'affichage des messages du compteur

// Récupération des éléments du DOM pour le compteur
const counterDisplay = document.getElementById('counter-display');
const decrementBtn = document.getElementById('decrement-btn');
const incrementBtn = document.getElementById('increment-btn');
const resetBtn = document.getElementById('reset-btn');
const stepInput = document.getElementById('step-input');
const counterMessageArea = document.getElementById('message-area'); // Renommé pour éviter les conflits

/**
 * Met à jour l'affichage du compteur sur la page.
 */
function updateCounterDisplay() {
    counterDisplay.textContent = counter;
}

/**
 * Affiche un message temporaire dans une zone de message spécifique.
 * @param {HTMLElement} messageElement - L'élément DOM où afficher le message.
 * @param {string} message - Le message à afficher.
 * @param {string} type - Le type de message (ex: 'success', 'info', 'error') pour des styles différents.
 * @param {number} duration - Durée d'affichage du message en ms.
 * @param {any} timeoutId - L'ID du timeout pour effacer le précédent.
 * @returns {any} Le nouvel ID du timeout.
 */
function showDynamicMessage(messageElement, message, type = 'info', duration = 3000, timeoutId = null) {
    clearTimeout(timeoutId);

    // Réinitialise les classes pour le style
    // Retire toutes les classes de type précédentes et ajoute la classe de base
    messageElement.className = 'mt-8 p-4 rounded-lg hidden message-area';

    messageElement.textContent = message;

    // Applique les styles en fonction du type de message en ajoutant une classe spécifique
    switch (type) {
        case 'success':
            messageElement.classList.add('message-success');
            break;
        case 'error':
            messageElement.classList.add('message-error');
            break;
        case 'info':
        default:
            messageElement.classList.add('message-info');
            break;
    }

    // Affiche le message avec une transition
    messageElement.classList.remove('hidden');
    requestAnimationFrame(() => {
        messageElement.classList.add('show');
    });

    // Cache le message après la durée spécifiée
    return setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            messageElement.classList.add('hidden');
        }, 500); // Correspond à la durée de transition CSS
    }, duration);
}


// --- Partie 1 : Le Compteur Interactif ---

/**
 * Initialise les gestionnaires d'événements pour le compteur.
 */
function initializeCounter() {
    // Gestionnaire de clic pour le bouton de décrémentation
    decrementBtn.addEventListener('click', () => {
        counter -= step;
        updateCounterDisplay();
        counterMessageTimeout = showDynamicMessage(counterMessageArea, `Compteur décrémenté de ${step}. Nouvelle valeur : ${counter}`, 'info', 3000, counterMessageTimeout);
    });

    // Gestionnaire de clic pour le bouton d'incrémentation
    incrementBtn.addEventListener('click', () => {
        counter += step;
        updateCounterDisplay();
        counterMessageTimeout = showDynamicMessage(counterMessageArea, `Compteur incrémenté de ${step}. Nouvelle valeur : ${counter}`, 'info', 3000, counterMessageTimeout);
    });

    // Gestionnaire de clic pour le bouton de réinitialisation
    resetBtn.addEventListener('click', () => {
        counter = 0;
        step = 1; // Réinitialise aussi le pas
        stepInput.value = 1; // Met à jour l'input du pas
        updateCounterDisplay();
        counterMessageTimeout = showDynamicMessage(counterMessageArea, 'Compteur et pas réinitialisés.', 'success', 3000, counterMessageTimeout);
    });

    // Gestionnaire de changement de valeur dans le champ de saisie du pas
    stepInput.addEventListener('input', (event) => {
        const newStep = parseInt(event.target.value, 10);

        if (isNaN(newStep) || newStep < 1) {
            counterMessageTimeout = showDynamicMessage(counterMessageArea, 'Le pas doit être un nombre entier positif (minimum 1).', 'error', 3000, counterMessageTimeout);
            event.target.value = step; // Réinitialise l'input à la dernière valeur valide
            return;
        }
        step = newStep;
        counterMessageTimeout = showDynamicMessage(counterMessageArea, `Pas mis à jour à : ${step}`, 'info', 3000, counterMessageTimeout);
    });

    // Interaction clavier pour le compteur (Exercice 5)
    document.addEventListener('keydown', (event) => {
        if (event.key === '+' || event.key === 'ArrowUp') {
            counter += step;
            updateCounterDisplay();
            counterMessageTimeout = showDynamicMessage(counterMessageArea, `Incrémentation par clavier de ${step}. Nouvelle valeur : ${counter}`, 'info', 3000, counterMessageTimeout);
        } else if (event.key === '-' || event.key === 'ArrowDown') {
            counter -= step;
            updateCounterDisplay();
            counterMessageTimeout = showDynamicMessage(counterMessageArea, `Décrémentation par clavier de ${step}. Nouvelle valeur : ${counter}`, 'info', 3000, counterMessageTimeout);
        } else if (event.key === 'r' || event.key === 'R') {
            counter = 0;
            step = 1;
            stepInput.value = 1;
            updateCounterDisplay();
            counterMessageTimeout = showDynamicMessage(counterMessageArea, 'Compteur réinitialisé par clavier.', 'success', 3000, counterMessageTimeout);
        }
    });

    // Initialisation de l'affichage
    updateCounterDisplay();
    counterMessageTimeout = showDynamicMessage(counterMessageArea, 'Bienvenue au TP JavaScript !', 'info', 3000, counterMessageTimeout);
}


// --- Partie 2 : Formulaire de Validation Simple (Exercice 6) ---

// Récupération des éléments du DOM pour le formulaire
const userForm = document.getElementById('user-form');
const usernameInput = document.getElementById('username-input');
const usernameError = document.getElementById('username-error');
const formSuccessMessage = document.getElementById('form-success-message');
let formMessageTimeout; // Gère le délai d'affichage des messages du formulaire

/**
 * Valide le champ du nom d'utilisateur.
 * @returns {boolean} True si valide, false sinon.
 */
function validateUsername() {
    const username = usernameInput.value.trim();
    if (username.length < 3) {
        usernameError.textContent = 'Le nom d\'utilisateur doit avoir au moins 3 caractères.';
        usernameError.classList.remove('hidden');
        usernameInput.classList.add('input-error'); // Ajoute une classe pour le style d'erreur
        return false;
    }
    usernameError.classList.add('hidden');
    usernameInput.classList.remove('input-error');
    return true;
}

/**
 * Initialise les gestionnaires d'événements pour le formulaire de validation.
 */
function initializeValidationForm() {
    userForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêche la soumission par défaut du formulaire

        if (validateUsername()) {
            formSuccessMessage.classList.remove('hidden');
            // Utilise showDynamicMessage pour le succès du formulaire
            formMessageTimeout = showDynamicMessage(formSuccessMessage, `Formulaire soumis avec succès ! Nom d'utilisateur: ${usernameInput.value}`, 'success', 5000, formMessageTimeout);
            userForm.reset(); // Réinitialise le formulaire
        } else {
            formSuccessMessage.classList.add('hidden'); // Cache le message de succès s'il était visible
            // Utilise showDynamicMessage pour l'erreur du formulaire
            formMessageTimeout = showDynamicMessage(usernameError, usernameError.textContent, 'error', 5000, formMessageTimeout);
        }
    });

    // Validation en temps réel pendant la saisie
    usernameInput.addEventListener('input', () => {
        validateUsername();
    });
}


// --- Partie 3 : Liste de Tâches Interactive (Exercice 7) ---

// Récupération des éléments du DOM pour la liste de tâches
const newTodoInput = document.getElementById('new-todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const todoMessageArea = document.getElementById('todo-message');
let todoMessageTimeout; // Gère le délai d'affichage des messages de la todo list

/**
 * Charge les tâches depuis le localStorage.
 * @returns {Array<Object>} Un tableau des tâches.
 */
function loadTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

/**
 * Sauvegarde les tâches dans le localStorage.
 * @param {Array<Object>} todos - Le tableau des tâches à sauvegarder.
 */
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * Rend une tâche dans la liste.
 * @param {Object} todo - L'objet tâche { text: string, completed: boolean }.
 */
function renderTodo(todo) {
    const listItem = document.createElement('li');
    listItem.className = 'flex items-center justify-between p-3 rounded-lg shadow-sm'; // Classes Tailwind de base
    if (todo.completed) {
        listItem.classList.add('completed'); // Classe CSS personnalisée pour le thème
    }

    const todoTextSpan = document.createElement('span');
    todoTextSpan.textContent = todo.text;
    todoTextSpan.className = 'flex-grow'; // Tailwind pour l'extension

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'flex space-x-2'; // Tailwind pour l'espacement

    const completeBtn = document.createElement('button');
    completeBtn.textContent = todo.completed ? 'Annuler' : 'Terminer';
    completeBtn.className = `py-1 px-3 text-sm rounded-md ${todo.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white transition duration-200`;
    completeBtn.addEventListener('click', () => toggleTodoComplete(todo, listItem, completeBtn));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.className = 'bg-red-500 hover:bg-red-600 text-white py-1 px-3 text-sm rounded-md transition duration-200';
    deleteBtn.addEventListener('click', () => deleteTodo(todo, listItem));

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(deleteBtn);

    listItem.appendChild(todoTextSpan);
    listItem.appendChild(actionsDiv);
    todoList.appendChild(listItem);
}

/**
 * Ajoute une nouvelle tâche.
 */
function addTodo() {
    const todoText = newTodoInput.value.trim();
    if (todoText === '') {
        todoMessageTimeout = showDynamicMessage(todoMessageArea, 'Veuillez entrer une tâche.', 'error', 3000, todoMessageTimeout);
        return;
    }

    const todos = loadTodos();
    const newTodo = { text: todoText, completed: false };
    todos.push(newTodo);
    saveTodos(todos);
    renderTodo(newTodo);
    newTodoInput.value = ''; // Vider le champ de saisie
    todoMessageTimeout = showDynamicMessage(todoMessageArea, `Tâche "${todoText}" ajoutée.`, 'success', 3000, todoMessageTimeout);
}

/**
 * Bascule l'état "terminé" d'une tâche.
 * @param {Object} todo - L'objet tâche à modifier.
 * @param {HTMLElement} listItem - L'élément LI correspondant dans le DOM.
 * @param {HTMLElement} button - Le bouton "Terminer/Annuler".
 */
function toggleTodoComplete(todo, listItem, button) {
    todo.completed = !todo.completed;
    if (todo.completed) {
        listItem.classList.add('completed');
        button.textContent = 'Annuler';
        button.classList.remove('bg-green-500', 'hover:bg-green-600');
        button.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
        todoMessageTimeout = showDynamicMessage(todoMessageArea, `Tâche "${todo.text}" marquée comme terminée.`, 'info', 3000, todoMessageTimeout);
    } else {
        listItem.classList.remove('completed');
        button.textContent = 'Terminer';
        button.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');
        button.classList.add('bg-green-500', 'hover:bg-green-600');
        todoMessageTimeout = showDynamicMessage(todoMessageArea, `Tâche "${todo.text}" marquée comme non terminée.`, 'info', 3000, todoMessageTimeout);
    }
    const todos = loadTodos();
    // Trouver et mettre à jour la tâche dans le tableau des todos
    const index = todos.findIndex(t => t.text === todo.text);
    if (index !== -1) {
        todos[index] = todo;
        saveTodos(todos);
    }
}

/**
 * Supprime une tâche de la liste.
 * @param {Object} todo - L'objet tâche à supprimer.
 * @param {HTMLElement} listItem - L'élément LI correspondant dans le DOM.
 */
function deleteTodo(todo, listItem) {
    listItem.remove(); // Supprime l'élément du DOM
    let todos = loadTodos();
    todos = todos.filter(t => t.text !== todo.text); // Filtre la tâche à supprimer
    saveTodos(todos);
    todoMessageTimeout = showDynamicMessage(todoMessageArea, `Tâche "${todo.text}" supprimée.`, 'success', 3000, todoMessageTimeout);
}

/**
 * Initialise la liste de tâches.
 */
function initializeTodoList() {
    addTodoBtn.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    // Charge et affiche les tâches existantes au démarrage
    const todos = loadTodos();
    todos.forEach(renderTodo);

    if (todos.length === 0) {
        todoMessageTimeout = showDynamicMessage(todoMessageArea, 'Aucune tâche pour le moment. Ajoutez-en une !', 'info', 3000, todoMessageTimeout);
    }
}


// --- Partie 4 : Changement de Thème (Exercice 8) ---

// Récupération des éléments du DOM pour le thème
const themeToggleButton = document.getElementById('theme-toggle-btn');
const themeMessageArea = document.getElementById('theme-message');
let themeMessageTimeout; // Gère le délai d'affichage des messages du thème

/**
 * Applique le thème sauvegardé ou le thème par défaut.
 */
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

/**
 * Bascule le thème de la page.
 */
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeMessageTimeout = showDynamicMessage(themeMessageArea, `Thème basculé en mode ${isDark ? 'sombre' : 'clair'}.`, 'info', 3000, themeMessageTimeout);
}

/**
 * Initialise le changement de thème.
 */
function initializeThemeSwitcher() {
    applySavedTheme(); // Applique le thème au chargement
    themeToggleButton.addEventListener('click', toggleTheme);
}


// --- Partie 5 : Glisser-Déposer Simple (Exercice 9) ---

// Récupération des éléments du DOM pour le glisser-déposer
const draggableElement = document.getElementById('draggable');
let isDragging = false;
let offsetX, offsetY; // Décalage du clic par rapport au coin supérieur gauche de l'élément

/**
 * Initialise la fonctionnalité de glisser-déposer.
 */
function initializeDragAndDrop() {
    // Positionne l'élément draggable au centre de sa section parente au chargement
    // Cela remplace les classes Tailwind de centrage pour un contrôle JS total
    const parentSection = draggableElement.parentElement;
    const parentRect = parentSection.getBoundingClientRect();
    const draggableRect = draggableElement.getBoundingClientRect();

    // Calculer la position initiale pour centrer l'élément
    let initialLeft = (parentRect.width / 2) - (draggableRect.width / 2);
    let initialTop = (parentRect.height / 2) - (draggableRect.height / 2);

    draggableElement.style.left = initialLeft + 'px';
    draggableElement.style.top = initialTop + 'px';


    draggableElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        // Calculer le décalage du clic par rapport au coin supérieur gauche de l'élément draggable
        const rect = draggableElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        draggableElement.classList.add('dragging'); // Ajoute une classe pour le style pendant le drag
        draggableElement.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        // Calculer la nouvelle position relative à la section parente
        const parentRect = draggableElement.parentElement.getBoundingClientRect();
        let newX = e.clientX - parentRect.left - offsetX;
        let newY = e.clientY - parentRect.top - offsetY;

        // Limiter le déplacement pour que l'élément reste à l'intérieur de sa section parente
        const maxX = parentRect.width - draggableElement.offsetWidth;
        const maxY = parentRect.height - draggableElement.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        draggableElement.style.left = newX + 'px';
        draggableElement.style.top = newY + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        draggableElement.classList.remove('dragging');
        draggableElement.style.cursor = 'grab';
    });
}


// --- Initialisation de toutes les fonctionnalités au chargement du DOM ---
document.addEventListener('DOMContentLoaded', () => {
    initializeCounter();
    initializeValidationForm();
    initializeTodoList();
    initializeThemeSwitcher();
    initializeDragAndDrop();
});
