// ------------------------- BANCO DE DADOS SIMULADO -------------------------
const usuarios = {}; // Guarda os cadastros (nome: senha)
let tentativas = 0;
let bloqueadoAte = 0;

// ------------------------- SELETORES DE ELEMENTOS -------------------------
const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");
const btnLogin = form.querySelector("button:nth-of-type(1)");
const btnCriarConta = form.querySelector("button:nth-of-type(2)");
const titulo = document.querySelector("h1");
const subtitulo = document.querySelector("h2");
const texto = document.querySelector("p");
const container = document.querySelector(".container") || document.body;

// Cria um parágrafo para exibir mensagens
const msg = document.createElement("p");
msg.style.color = "white";
msg.style.fontWeight = "bold";
msg.style.background = "rgba(0,0,0,0.5)";
msg.style.padding = "8px";
msg.style.borderRadius = "10px";
msg.style.marginTop = "10px";
msg.style.display = "inline-block";
container.appendChild(msg);

// ------------------------- FUNÇÃO DE VALIDAÇÃO DE SENHA -------------------------
function validarSenha(senha) {
  const temTamanhoMinimo = senha.length >= 8;
  const temNumero = /\d/.test(senha);
  const temSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
  return temTamanhoMinimo && temNumero && temSimbolo;
}

// ------------------------- LOGIN -------------------------
function fazerLogin() {
  const agora = Date.now();
  if (agora < bloqueadoAte) {
    const segundos = Math.ceil((bloqueadoAte - agora) / 1000);
    msg.textContent = `🚫 Sistema bloqueado! Tente novamente em ${segundos}s.`;
    return;
  }

  const nome = inputs[0].value.trim();
  const senha = inputs[1].value.trim();

  if (!nome || !senha) {
    msg.textContent = "⚠️ Preencha todos os campos!";
    return;
  }

  if (usuarios[nome] && usuarios[nome] === senha) {
    msg.textContent = `✅ Login bem-sucedido! Bem-vindo(a), ${nome}!`;
    tentativas = 0;
  } else {
    tentativas++;
    msg.textContent = `❌ Credenciais incorretas. Tentativa ${tentativas}/3.`;

    if (tentativas >= 3) {
      bloqueadoAte = Date.now() + 60000; // bloqueio de 60 segundos
      msg.textContent = "⚠️ 3 tentativas incorretas! Sistema bloqueado por 60 segundos.";
      tentativas = 0;
    }
  }
}

// ------------------------- CADASTRO -------------------------
function criarConta() {
  const nome = inputs[0].value.trim();
  const senha = inputs[1].value.trim();

  if (!nome || !senha) {
    msg.textContent = "⚠️ Preencha todos os campos!";
    return;
  }

  if (usuarios[nome]) {
    msg.textContent = "❌ Usuário já existe!";
    return;
  }

  if (!validarSenha(senha)) {
    msg.textContent = "❌ A senha deve ter pelo menos 8 caracteres, 1 número e 1 símbolo!";
    return;
  }

  usuarios[nome] = senha;
  msg.textContent = "✅ Conta criada com sucesso! Agora faça login.";
}

// ------------------------- EVENTOS -------------------------
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  fazerLogin();
}); jsjsjsjjsjsjsjsj

btnCriarConta.addEventListener("click", (e) => {
  e.preventDefault();
  criarConta();
});