const MEU_WHATSAPP = "258872343542"; 
const SENHAS_VALIDAS = ["VIP2026", "MOZ87", "PRO", "TESTE"];
let historico = [];

// Seleção de Planos
function selecionarPlano(nome, valor) {
    document.getElementById('plano_escolhido').value = nome;
    document.getElementById('valor_escolhido').value = valor;
    document.getElementById('plano-semanal').classList.remove('active');
    document.getElementById('plano-mensal').classList.remove('active');
    if(nome === 'Semanal') {
        document.getElementById('plano-semanal').classList.add('active');
    } else {
        document.getElementById('plano-mensal').classList.add('active');
    }
}

// Enviar para WhatsApp
function enviarPedidoWhatsapp() {
    const num = document.getElementById('num_cliente').value;
    const plano = document.getElementById('plano_escolhido').value;
    const valor = document.getElementById('valor_escolhido').value;
    if (num.length < 8) return alert("Coloque um número válido.");
    
    const msg = `Olá! Quero o plano *${plano.toUpperCase()}* de ${valor}MT. Minha conta: ${num}. Já fiz o depósito!`;
    window.open(`https://wa.me/${MEU_WHATSAPP}?text=${msg}`, '_blank');
}

// Liberar Preditor
function verificarSenhaManual() {
    const senha = document.getElementById('chave_acesso').value.toUpperCase().trim();
    if (SENHAS_VALIDAS.includes(senha)) {
        localStorage.setItem('acesso_liberado', 'true');
        window.location.href = "./index.html";
    } else {
        alert("Senha incorrecta!");
    }
}

// Lógica da Próxima Vela
function adicionarDado() {
    const val = parseFloat(document.getElementById('valor').value);
    if (isNaN(val)) return;
    historico.push(val);
    if (historico.length > 10) historico.shift();
    document.getElementById('valor').value = '';
    atualizarPainel();
}

function atualizarPainel() {
    const s = document.getElementById('sinal');
    const f = document.getElementById('prob-fill');
    const t = document.getElementById('tendencia');
    const l = document.getElementById('lista-resultados');

    if (historico.length < 3) {
        s.innerText = "INSIRA + DADOS";
        return;
    }

    const ultimos = historico.slice(-3);
    const media = ultimos.reduce((a, b) => a + b, 0) / 3;

    if (media < 1.8) {
        const previsao = (Math.random() * (2.20 - 1.55) + 1.55).toFixed(2);
        s.innerHTML = `PRÓXIMA VELA: <span style="color:#4caf50">${previsao}x</span>`;
        f.style.width = "92%";
        f.style.backgroundColor = "#4caf50";
        t.innerText = "ALTA CONFIANÇA";
    } else {
        s.innerText = "AGUARDE PADRÃO";
        f.style.width = "35%";
        f.style.backgroundColor = "#ff9800";
        t.innerText = "MERCADO INSTÁVEL";
    }

    l.innerHTML = historico.slice().reverse().map(h => 
        `<span class="badge" style="color:${h >= 2 ? '#4caf50' : '#e91e63'}">${h.toFixed(2)}x</span>`
    ).join('');
}

function fazerLogout() {
    localStorage.removeItem('acesso_liberado');
    window.location.href = "./login.html";
}
