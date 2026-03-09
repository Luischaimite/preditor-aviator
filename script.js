// CONFIGURAÇÕES DO DONO (VOCÊ)
const MEU_WHATSAPP = "258872343542"; 
const SENHAS_VALIDAS = ["VIP2026", "MOZ87", "PRO"];

let historico = [];

// FUNÇÃO WHATSAPP
function enviarPedidoWhatsapp() {
    const numCliente = document.getElementById('num_cliente').value;
    if (numCliente.length < 9) return alert("Insira o seu número.");

    const msg = `Olá! Acabei de pagar 100MT para o acesso ao Preditor.%0ACliente: ${numCliente}%0APor favor, envie-me a Chave VIP.`;
    window.open(`https://wa.me/${MEU_WHATSAPP}?text=${msg}`, '_blank');
}

// FUNÇÃO DE LOGIN
function verificarSenhaManual() {
    const senha = document.getElementById('chave_acesso').value.toUpperCase();
    if (SENHAS_VALIDAS.includes(senha)) {
        localStorage.setItem('acesso_liberado', 'true');
        window.location.href = "./index.html";
    } else {
        alert("Senha Incorrecta!");
    }
}

// LÓGICA DO PREDITOR (Tradução do seu Python)
function adicionarDado() {
    const input = document.getElementById('valor');
    const valor = parseFloat(input.value);

    if (isNaN(valor)) return;

    historico.push(valor);
    if (historico.length > 15) historico.shift();
    input.value = '';
    
    atualizarPainel();
}

function atualizarPainel() {
    const sElement = document.getElementById('sinal');
    const pFill = document.getElementById('prob-fill');
    const tElement = document.getElementById('tendencia');
    const lista = document.getElementById('lista-resultados');

    const ultimos5 = historico.slice(-5);
    const baixos = ultimos5.filter(x => x < 2.0).length;

    if (historico.length < 3) {
        sElement.innerText = "COLETE MAIS DADOS";
        pFill.style.width = "20%";
        pFill.style.backgroundColor = "#888";
    } 
    else if (baixos >= 4) {
        // Lógica de Saturação: Muita perda = Chance de Ganho
        sElement.innerText = "ENTRADA CONFIRMADA (Alvo 1.5x)";
        sElement.style.color = "#4caf50";
        pFill.style.width = "92%";
        pFill.style.backgroundColor = "#4caf50";
        tElement.innerText = "ALTA PROBABILIDADE";
    } 
    else {
        sElement.innerText = "AGUARDAR PADRÃO";
        sElement.style.color = "#ff9800";
        pFill.style.width = "35%";
        pFill.style.backgroundColor = "#ff9800";
        tElement.innerText = "MERCADO OSCILANTE";
    }

    lista.innerHTML = historico.slice().reverse().map(h => 
        `<span class="badge" style="color:${h >= 2 ? '#4caf50' : '#e91e63'}">${h.toFixed(2)}x</span>`
    ).join('');
}

function fazerLogout() {
    localStorage.removeItem('acesso_liberado');
    window.location.href = "./login.html";
}
