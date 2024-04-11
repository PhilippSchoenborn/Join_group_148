let users = [];

async function init() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.warn('could not load users');
    }
}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('customCheckbox').checked = '';
    
}



async function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const isTermsAccepted = document.getElementById('customCheckbox').checked;

    // Überprüfen, ob die Passwörter übereinstimmen
    if (password !== confirmPassword) {
        alert("Die Passwörter stimmen nicht überein.");
        return false;
    }

    // Überprüfen der Mindestlänge des Passworts
    if (password.length < 8) {
        alert("Das Passwort muss mindestens 8 Zeichen lang sein.");
        return false;
    }

    // Überprüfen, ob das Passwort mindestens eine Zahl enthält
    if (!/\d/.test(password)) {
        alert("Das Passwort muss mindestens eine Zahl enthalten.");
        return false;
    }

    // Überprüfen, ob das Passwort mindestens ein Sonderzeichen enthält
    if (!/[!@#$%^&*]/.test(password)) {
        alert("Das Passwort muss mindestens ein Sonderzeichen enthalten.");
        return false;
    }

    // Überprüfen, ob die Nutzungsbedingungen akzeptiert wurden
    if (!isTermsAccepted) {
        alert("Sie müssen die Datenschutzrichtlinie akzeptieren, um fortzufahren.");
        return false;
    }

    // Benutzer zum Array hinzufügen
    users.push({
        name: name,
        email: email,
        password: password
    });

    // Speichern der aktualisierten Benutzerliste
    try {
        await setItem('users', JSON.stringify(users));
        alert("Registrierung erfolgreich!");
        // Weiterleitung zur Login-Seite
        window.location.href = 'login.html'; // Passen Sie den Pfad an die tatsächliche Lage Ihrer Login-Seite an
    } catch (e) {
        console.error('Fehler beim Speichern der Benutzerdaten:', e);
        alert("Fehler beim Speichern der Benutzerdaten.");
        return false;
    }

    resetForm();
    return false; // Verhindert das Absenden des Formulars
}

function login() {
    let email = document.getElementById( 'email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password-value);
    console. log(user);
    if(user) {
        console.log('User gefunden');
    }
    
    }