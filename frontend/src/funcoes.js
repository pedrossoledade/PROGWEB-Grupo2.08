var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})


async function login(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email) {
        return alert('O campo email é obrigatório');
    }
    if (!password) {
        return alert('O campo senha é obrigatório');
    }

    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Erro ao fazer login');
    }
}

async function cadastro(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const form = event.target;
    const name = form.name.value;
    const cpf = form.cpf.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!name || !cpf || !phone || !email || !password || !confirmPassword) {
        return alert('Todos os campos são obrigatórios');
    }

    if (password !== confirmPassword) {
        return alert('As senhas não coincidem');
    }

    try {
        const response = await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, cpf, phone, email, password, confirmPassword })
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Erro ao fazer cadastro');
    }
}