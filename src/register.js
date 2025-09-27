const form = document.getElementById("form_register");
const btnNext = document.querySelectorAll("#button_next");
const step = document.querySelectorAll(".step");
const circleStep = document.querySelectorAll(".circle-step");
const fullName = document.getElementById("full_name");
const email = document.getElementById("email");
const codeEmail = document.getElementById("verifi_code");
const txtErros = document.getElementById("txt_erros");

let i = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validarEtapaAtual();
});

function validarEtapaAtual() {
  // Erros de cada input vai ser armazenado
  let erros = [];
  txtErros.textContent = "";

  if (i === 0) {
    // ETAPA 1 Validar nome, email e telefone
    let name = fullName.value.trim();
    if (name === "") erros.push("Campo de nome inválido");

    if (!validarEmail(email.value)) erros.push("Email inválido");
  }

  if (i === 1) {
    // ETAPA 2 Validar codigo pelo email
    if (validarCode()) erros.push("Codigo inválido");
  }

  if (i === 2) {
    // ETAPA 3 Conclui validando cpf
    if (validarCPF()) erros.push("Formato de CPF inválido");
  }

  if (erros.length > 0) {
    txtErros.textContent = erros.join(", ");
    return;
  }

  avancarEtapas();
}

function validarCPF(inputCpf) {
  return false;
}

function validarCode(inputCpf) {
  return false;
}

function validarEmail(inputEmail) {
  const regx = /^\S+@\S+\.\S+$/;

  return regx.test(inputEmail);
}

function avancarEtapas() {
  // Marca aba atual
  circleStep[i].classList.add("on");

  // Esconde aba atual
  step[i].classList.add("hide");

  // Count de index de cada elemento
  i++;

  // Proxima aba se existir
  if (i < step.length) {
    step[i].classList.remove("hide");
  }
}
