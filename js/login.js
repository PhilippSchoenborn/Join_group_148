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
    let warningContainer = document.getElementById('pwWarningContainer');

    // Überprüfen, ob die Passwörter übereinstimmen
    if (password !== confirmPassword) {
        warningContainer.style.display = 'flex';
        return false;
    }

    // Überprüfen der Mindestlänge des Passworts
    if (password.length < 8) {
        warningContainer.style.display = 'flex';
        return false;
    }

    // Überprüfen, ob das Passwort mindestens eine Zahl enthält
    if (!/\d/.test(password)) {
        warningContainer.style.display = 'flex';
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
        slideSuccessfully();        
    } catch (e) {
        console.error('Fehler beim Speichern der Benutzerdaten:', e);
        alert("Fehler beim Speichern der Benutzerdaten.");
        return false;
    }

    resetForm();    
    return false; // Verhindert das Absenden des Formulars
}

function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);
    if (user) {
        console.log('User gefunden');
        window.location.href = 'summary.html'       

    } else {
        console.log('User not found')
    }

}

function checkFormFields() {    
    const isTermsAccepted = document.getElementById('customCheckbox');
    const registerBtn = document.getElementById('registerBtn');

    // Überprüfen, ob alle Felder ausgefüllt sind und die Checkbox markiert ist
    if (isTermsAccepted = isTermsAccepted.checked) {
        registerBtn.disabled = false;
    } else {
        registerBtn.disabled = true;
    }
}

function slideSuccessfully() {
    let container = document.getElementById('successfullyContainer');
    let successfully = document.getElementById('successfully');

    // Stellen Sie sicher, dass der Container sichtbar ist, um die Animation zu zeigen
    container.style.display = 'flex';

    // Fügen Sie die Klasse für die Animation hinzu
    successfully.classList.add('slide-in-bottom');

    // Setzen Sie eine Verzögerung, um der Animation Zeit zum Abspielen zu geben
    setTimeout(() => {
        // Entfernen Sie die Animation, nachdem sie abgespielt wurde
        successfully.classList.remove('slide-in-bottom');

        // Verstecken Sie den Container wieder
        container.style.display = 'none';

        // Wechseln Sie die Seite nach der Animation
        window.location.href = 'login.html';
    }, 2000); // Warten Sie z.B. 1000 Millisekunden (1 Sekunde)
}

function pwWarningHTML(){
    return `<span id="signUpWarning"
    >The password must be at least 8 characters long and must contain a number.</span>`
}

function closeWarning(){
    document.getElementById('pwWarningContainer').style.display = 'none';
}