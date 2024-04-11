let users = [];

async function init() {
    loadUsers();
    matchPassword()    
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.warn('could not load users');
    }
}


async function register() {
    document.getElementById('registerBtn').disabled = true;
    
    users.push({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    })

    await setItem('users', JSON.stringify(users));
    resetForm();
}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('registerBtn').disabled = false;
}

function matchPassword(){
  let password = document.getElementById('password').value;
  let confirmPassword =  document.getElementById('confirmPassword').value;
  let registerBtn =  document.getElementById('registerBtn');

  if (password === confirmPassword) {
    registerBtn.style.disabled = 'none';
  } else {
    registerBtn.disabled = true;
  }
};