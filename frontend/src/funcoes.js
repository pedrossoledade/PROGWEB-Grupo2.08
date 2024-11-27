console.log('Script carregado');

var myModal = document.getElementById('myModal');
var myInput = document.getElementById('myInput');

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('cadastroForm');
  const cpfInput = document.getElementById('cpf');
  const phoneInput = document.getElementById('phone');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const emailInput = document.getElementById('email');

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const phoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;

  // Função de validação genérica
  function validateField(input, errorElementId, condition, errorMessage) {
      const errorElement = document.getElementById(errorElementId);
      if (!condition) {
          errorElement.textContent = errorMessage;
      } else {
          errorElement.textContent = '';
      }
  }

  // Validação dos campos  
  /**                                 tava dando ERRO, por isso o comentei 
   
  cpfInput.addEventListener('blur', () => {
    validateField(cpfInput, 'cpfError', cpfRegex.test(cpfInput.value), "CPF deve estar no formato 999.999.999-99.");
});

phoneInput.addEventListener('blur', () => {
    validateField(phoneInput, 'phoneError', phoneRegex.test(phoneInput.value), "Telefone deve estar no formato (99)99999-9999.");
});

confirmPasswordInput.addEventListener('blur', () => {
    validateField(confirmPasswordInput, 'confirmPasswordError', passwordInput.value === confirmPasswordInput.value, "As senhas não correspondem.");
});

emailInput.addEventListener('blur', () => {
    validateField(emailInput, 'emailError', emailInput.validity.valid, "Digite um email válido.");
});
*/

form.addEventListener('submit', (event) => {
    if (document.querySelectorAll('.text-danger').some(el => el.textContent !== '')) {
        event.preventDefault();
    }
});
});

myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
    
})

function cadastro(){
    alert("Cadastro realizado com sucesso!");
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

// Função para carregar produtos
async function carregarProdutos() {
    console.log('Iniciando carregamento de produtos');
    try {
        const response = await fetch('http://localhost:3000/products/');
        console.log('Response:', response);
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        const produtos = await response.json();
        console.log('Produtos:', produtos);
        renderizarProdutos(produtos);
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar produtos');
    }
}

// Função para renderizar produtos na tela
function renderizarProdutos(produtos) {
    const container = document.getElementById('produtosContainer');
    if (!produtos || produtos.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhum produto encontrado</p>';
        return;
    }
    
    container.innerHTML = produtos.map(produto => `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${produto.photo || 'imagens/produto-sem-imagem.jpg'}" 
                     class="card-img-top" 
                     alt="${produto.name}"
                     style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${produto.name}</h5>
                    <p class="card-text">R$ ${produto.price.toFixed(2)}</p>
                    <a href="visualizarProduto.html?id=${produto.id}" 
                       class="btn btn-primary">Ver Detalhes</a>
                    <button onclick="adicionarAoCarrinho(${produto.id})" 
                            class="btn btn-orange">
                            Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para adicionar ao carrinho
async function adicionarAoCarrinho(produtoId) {
    try {
        const response = await fetch('http://localhost:3000/cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: produtoId,
                quantity: 1
            })
        });
        if (!response.ok) {
            throw new Error('Erro ao adicionar ao carrinho');
        }
        alert('Produto adicionado ao carrinho!');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao adicionar ao carrinho');
    }
}

// Carregar produtos quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado');
    carregarProdutos();
});
