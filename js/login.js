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


/* async function register() {
    document.getElementById('registerBtn').disabled = true;
    
    users.push({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    })

    await setItem('users', JSON.stringify(users));
    resetForm();
} */

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('registerBtn').disabled = false;
}



function register() {
    // Retrieve values from form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const isTermsAccepted = document.getElementById('customCheckbox').checked;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false; // Prevent form submission
    }

    // Check if terms are accepted
    if (!isTermsAccepted) {
        alert("You must accept the privacy policy to continue.");
        return false; // Prevent form submission
    }

    // Add user data to the array
    users.push({
        name: name,
        email: email,
        password: password
    });

    resetForm();
    console.log(users); // For debugging, to see the contents of the users array
    alert("Registration successful!");




}
