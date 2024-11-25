var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

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
