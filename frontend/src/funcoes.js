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

    // Verifique se os elementos existem antes de adicionar os event listeners
    if (cpfInput) {
        cpfInput.addEventListener('blur', () => {
            validateField(cpfInput, 'cpfError', cpfRegex.test(cpfInput.value), "CPF deve estar no formato 999.999.999-99.");
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('blur', () => {
            validateField(phoneInput, 'phoneError', phoneRegex.test(phoneInput.value), "Telefone deve estar no formato (99)99999-9999.");
        });
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', () => {
            validateField(confirmPasswordInput, 'confirmPasswordError', passwordInput.value === confirmPasswordInput.value, "As senhas não correspondem.");
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            validateField(emailInput, 'emailError', emailInput.validity.valid, "Digite um email válido.");
        });
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            if (document.querySelectorAll('.text-danger').some(el => el.textContent !== '')) {
                event.preventDefault();
            }
        });
    }
});

if (myModal) {
    myModal.addEventListener('shown.bs.modal', function () {
        myInput.focus();
    });
}

function cadastro() {
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

// Função para login
async function login(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Validação básica dos campos
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    emailError.textContent = email ? '' : 'O campo email é obrigatório';
    passwordError.textContent = password ? '' : 'O campo senha é obrigatório';

    if (!email || !password) return;

    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            window.location.href = 'paginaInicial.html'; // Redireciona para a página inicial
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login');
    }
}

// Adicionando o evento ao formulário de login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
});


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
        
    }
}

// Função para renderizar produtos na tela
function renderizarProdutos(produtos) {
    const container = document.getElementById('produtosContainer');
    if (!container) {
        console.error('Elemento produtosContainer não encontrado');
        return;
    }
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

// Função para carregar detalhes do produto
async function carregarDetalhesProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert('Produto não encontrado');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/products/findById/${productId}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes do produto');
        }
        const produto = await response.json();
        renderizarDetalhesProduto(produto);
    } catch (error) {
        console.error('Erro:', error);

    }
}

// Função para renderizar detalhes do produto na tela
function renderizarDetalhesProduto(produto) {
    document.querySelector('h2').textContent = produto.name;
    document.querySelector('.card-text').textContent = `R$ ${produto.price.toFixed(2)}`;
    document.querySelector('.card-img-top').src = produto.photo || 'imagens/produto-sem-imagem.jpg';
    document.querySelector('.card-description').textContent = produto.description || 'Sem descrição disponível';
    document.querySelector('.btn-orange').setAttribute('onclick', `adicionarAoCarrinho(${produto.id})`);
}

// Carregar detalhes do produto quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarDetalhesProduto);

// Carregar produtos quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado');
    carregarProdutos();
});

// Função para apagar produto pelo id
async function apagarProduto(id) {
    try {
        // Realiza a requisição DELETE para apagar o produto com o id fornecido
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE',  // Usando o método DELETE para remover o produto
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao apagar produto');
        }

        // Caso o produto tenha sido apagado com sucesso
        alert('Produto apagado com sucesso!');
        
        // Opcional: Recarregar os produtos após a exclusão (ou fazer outras ações)
        carregarProdutos(); // Recarregar a lista de produtos (caso deseje exibir novamente os produtos)
    } catch (error) {
        console.error('Erro ao apagar o produto:', error);
        alert('Erro ao apagar produto');
    }
}

// FUNÇÕES DO CHECKOUT

// Obter os modais
var modalCreditoDebito = document.getElementById("modalCreditoDebito");
var modalPix = document.getElementById("modalPix");

// Obter o botão de submit
var btn = document.getElementById("proximo");

// Obter os elementos <span> que fecham os modais
var spans = document.getElementsByClassName("close");

// Quando o usuário clica no botão de submit
btn.onclick = function (event) {
  event.preventDefault(); // Evitar envio do formulário
  var credito = document.getElementById("credito").checked;
  var debito = document.getElementById("debito").checked;
  var pix = document.getElementById("pix").checked;
  if (credito || debito) {
    modalCreditoDebito.style.display = "block";
  } else if (pix) {
    modalPix.style.display = "block";
  }
};

// Quando o usuário clica em <span> (x), fecha os modais
for (var i = 0; i < spans.length; i++) {
  spans[i].onclick = function () {
    modalCreditoDebito.style.display = "none";
    modalPix.style.display = "none";
  };
}

// Quando o usuário clica fora dos modais, fecha-os
window.onclick = function (event) {
  if (event.target == modalCreditoDebito) {
    modalCreditoDebito.style.display = "none";
  } else if (event.target == modalPix) {
    modalPix.style.display = "none";
  }
};
