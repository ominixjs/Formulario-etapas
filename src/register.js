const form = document.getElementById("form_register");
const btnNext = document.querySelectorAll("#button_next");
const step = document.querySelectorAll(".step");
const circleStep = document.querySelectorAll(".circle-step");
const fullName = document.getElementById("full_name");
const email = document.getElementById("email");
const codeInput = document.getElementById("verifi_code");
const phone = document.getElementById("phone");
const cpf = document.getElementById("cpf");
const txtErros = document.getElementById("txt_erros");
const btnBack = document.querySelectorAll("#btn_back");

let countStep = 0;

// Valida e dar continuidade no envio de dados
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Valida informações do cliente
  validarEtapaAtual();
});

// Em motivo de desistência ou ateração a possibilidade de voltar
btnBack.forEach((btn) => {
  btn.addEventListener("click", voltarEtapas);
});

// Etapas para validação de cada aba
function validarEtapaAtual() {
  // Erros de cada input vai ser armazenado
  let erros = [];
  txtErros.textContent = "";

  if (countStep === 0) {
    // ETAPA 1 Validar nome, email e telefone
    let name = fullName.value.trim();
    if (name === "") erros.push("Campo de nome inválido");

    if (!validarEmail(email.value)) erros.push("Email inválido");
  }

  if (countStep === 1) {
    // ETAPA 2 Validar codigo pelo email
    if (validarCode()) erros.push("Codigo inválido");
  }

  if (countStep === 2) {
    // ETAPA 3 Conclui validando cpf
    if (!validarCPF(cpf.value)) erros.push("Formato de CPF inválido");
  }

  if (erros.length > 0) {
    txtErros.textContent = erros.join(", ");
    return;
  }

  // Função para avancar etapa
  avancarEtapas();
}

// Procedimento para conferir CPF
function validarCPF(inputCpf) {
  let cpfValue = inputCpf;

  cpfValue = cpfValue.replace(/\D/g, ""); // remove tudo que não for número
  if (cpfValue.length !== 11) return false;

  // Checa se todos os números são iguais
  if (/^(\d)\1{10}$/.test(cpfValue)) return false;

  let soma = 0;

  // Verifica o 1° digito
  // O "for" vai pegar a posição de cada caractere
  for (let i = 0; i < 9; i++) {
    // Calcula os números do cpf.
    // Multiplica cada um dos 9 primeiros dígitos por um peso que vai de 10 até 2.
    // Soma os resultados
    // soma == valor dos numeros anteriores
    soma += parseInt(cpfValue.charAt(i)) * (10 - i);
  }
  // Calcula o resto da divisão da soma por 11.
  let resto = (soma * 10) % 11;
  // Se o resto for menor que 2, o dígito é 0. Senão, é 11 – resto.
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cpfValue.charAt(9))) {
    return false;
  }

  soma = 0;
  // Verifica o 2° digito
  for (i = 0; i < 10; i++) {
    // Agora usa os 10 primeiros dígitos (já incluindo o dígito verificador encontrado antes).
    // Multiplica cada um deles por um peso que vai de 11 até 2.
    soma += parseInt(cpfValue.charAt(i)) * (11 - i);
  }
  // Faz a mesma regra do resto / 11.
  // Resto de 255 ÷ 11 = 2 → Como é maior que 2, 11 – 2 = 9.
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  return resto === parseInt(cpfValue.charAt(10));
}

// Valida sms ou email para validar email ou telefone
function validarCode(inputCode) {
  return false;
}

// Valida estrutura do email
function validarEmail(inputEmail) {
  const regx = /^\S+@\S+\.\S+$/;

  return regx.test(inputEmail);
}

// Avança de acordo com abas existentes
function avancarEtapas() {
  // Marca aba atual
  circleStep[countStep].classList.add("on");

  // Esconde aba atual
  step[countStep].classList.add("hide");

  // Count de index de cada elemento
  countStep++;

  // Proxima aba se existir
  if (countStep < step.length) {
    step[countStep].classList.remove("hide");
  }
}

// Retrocede de acordo com abas existentes :)
function voltarEtapas() {
  txtErros.textContent = "";

  // Marca aba atual
  circleStep[countStep].classList.remove("on");

  // Esconde aba atual
  step[countStep].classList.add("hide");

  // Count de index de cada elemento
  countStep--;

  // Proxima aba se existir
  if (countStep < step.length || countStep > 0) {
    step[countStep].classList.remove("hide");
  }

  if (countStep < 0) countStep = 0;
}

// Máscara para número do cartão (###.###.###-##)
cpf.addEventListener("input", function () {
  let valor = this.value.replace(/\D/g, ""); // remove não-dígitos
  valor = valor.substring(0, 11); // limita a 11 números
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  this.value = valor;
});

// Máscara para número de telefone ((##) # #### ####)
phone.addEventListener("input", function () {
  let valor = this.value
    .replace(/\D/g, "") // remove tudo que não é número
    .replace(/^(\d{2})(\d)/, "($1) $2") // coloca o DDD
    .replace(/(\d{1})(\d{4})(\d{4})$/, "$1 $2-$3"); // celular e traço
  this.value = valor;
});
