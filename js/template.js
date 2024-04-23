async function init() {
    await includeHTML();
    underlineCurrentPage();
    setupDropdowns();  // Setup für alle Dropdown-bezogenen Funktionen    
    setupInputFields();
    await loadTask();
    displayTask(tasks);
    
    
}



async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text()
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function back() {
    window.history.back();
}

/* öffnet LogOut Container */
function showLogOut() {
    let logOutContainer = document.getElementById('logOutContainer');
    if (logOutContainer.style.display === 'flex') {
        logOutContainer.style.display = 'none';

    } else {
        logOutContainer.style.display = 'flex';
    }
}

// aktiviert den button für die Seite auf der man sich befindet
function underlineCurrentPage() {
    let currentPage = window.location.href;

    if (currentPage.includes("summary.html")) {
        document.getElementById('summaryBtn').classList.add('backgroundColorMenu');
    }
    else if (currentPage.includes('addTask.html')) {
        document.getElementById('addTaskButton').classList.add('backgroundColorMenu');
    }
    else if (currentPage.includes('board.html')) {
        document.getElementById('boardBtn').classList.add('backgroundColorMenu');
    } else if (currentPage.includes('contacts.html')) {
        document.getElementById('contactBtn').classList.add('backgroundColorMenu');
    } else if (currentPage.includes('dataProtection.html')) {
        document.getElementById('dataProtection').classList.add('backgroundColorLegal');
    } else if (currentPage.includes('imprint.html')) {
        document.getElementById('imprint').classList.add('backgroundColorLegal');
    }
}

function logout() {
    // Weiterleitung zur Login-Seite
    window.location.href = 'login.html';
}

