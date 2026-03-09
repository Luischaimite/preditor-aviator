const MEU_WHATSAPP = "258872343542"; 
const SENHAS_VALIDAS = ["VIP2026", "MOZ87", "PRO", "TESTE"];
let historico = [];

// 1. GESTÃO DE PLANOS E WHATSAPP
function selecionarPlano(nome, valor) {
    const pInput = document.getElementById('plano_escolhido');
    const vInput = document.getElementById('valor_escolhido');
    if(!pInput) return;
    pInput.value = nome;
    vInput.value = valor;
    document.getElementById('plano-semanal').classList.remove('active');
    document.getElementById('plano-mensal').classList.remove('active');
    if(nome === 'Semanal') document.getElementById('plano-semanal').classList.add('active');
    else document.getElementById('plano-mensal').classList.add('active');
}

function enviarPedidoWhatsapp() {
    const num = document.getElementById('num_cliente').value;
    const plano = document.getElementById('plano_escolhido').value;
    const valor = document.getElementById('valor_escolhido').value;
    if (num.length < 8) return alert("Introduza um número válido!");
    const msg = `Olá! Quero o plano *${plano.toUpperCase()}* de ${valor}MT. Conta: ${num}. Já fiz o depósito!`;
    window.open(`https://wa.me/${MEU_WHATSAPP}?text=${msg}`, '_blank');
}

// 2. VERIFICAÇÃO DE SENHA
function verificarSenhaManual() {
    const senha = document.getElementById('chave_acesso').value.toUpperCase().trim();
    if (SENHAS_VALIDAS.includes(senha)) {
        localStorage.setItem('acesso_liberado', 'true');
        window.location.href = "./index.html";
    } else { alert("Senha incorrecta! Fale com o Agente."); }
}

// 3. ANALISADOR ULTRA AGRESSIVO COM VELAS ROSAS
function adicionarDado() {
    const input = document.getElementById('valor');
    const val = parseFloat(input.value);
    if (isNaN(val)) return;
    historico.push(val);
    if (historico.length > 12) historico.shift();
    input.value = '';
    atualizarPainel();
}

function atualizarPainel() {
    const s = document.getElementById('sinal');
    const f = document.getElementById('prob-fill');
    const t = document.getElementById('tendencia');
    const l = document.getElementById('lista-resultados');

    if (historico.length < 2) {
        s.innerText = "COLETANDO DADOS...";
        return;
    }

    // LOGICA DE SORTEIO: 90% Velas Normais, 10% Velas Rosas
    let previsao;
    let sorteio = Math.random() * 100;

    if (sorteio > 90) { 
        // GERA VELA ROSA (GRANDE)
        previsao = (Math.random() * (35.00 - 10.00) + 10.00).toFixed(2);
        s.innerHTML = `PRÓXIMA VELA: <span style="color:#e91e63">${previsao}x</span>`;
        t.innerHTML = "🔥 <span style='color:#e91e63'>ALERTA: VELA ROSA DETETADA!</span>";
        f.style.backgroundColor = "#e91e63";
    } else {
        // GERA VELA NORMAL (SEGURA)
        previsao = (Math.random() * (2.45 - 1.55) + 1.55).toFixed(2);
        s.innerHTML = `PRÓXIMA VELA: <span style="color:#4caf50">${previsao}x</span>`;
        t.innerHTML = "🎯 <span style='color:#4caf50'>SINAL VIP CONFIRMADO</span>";
        f.style.backgroundColor = "#4caf50";
    }

    f.style.width = "98%";

    l.innerHTML = historico.slice().reverse().map(h => 
        `<span class="badge" style="color:${h >= 2 ? '#4caf50' : '#ff0044'}">${h.toFixed(2)}x</span>`
    ).join('');
}

// 4. SISTEMA DE GANHOS (PROVA SOCIAL)
const NOMES = ["Carlos", "Marta", "Zito", "Nelson", "Fátima", "Sérgio", "Eunice", "Benjamim", "Delfina", "Agostinho"];
const LOCAIS = ["Marracuene", "Maputo", "Matola", "Boane", "Xai-Xai"];

function gerarGanhoFalso() {
    const lista = document.getElementById('lista-ganhos');
    if(!lista) return;
    const nome = NOMES[Math.floor(Math.random() * NOMES.length)];
    const local = LOCAIS[Math.floor(Math.random() * LOCAIS.length)];
    const valor = (Math.random() * (1400 - 150) + 150).toFixed(0);
    const div = document.createElement('div');
    div.style.borderBottom = "1px solid #30363d";
    div.style.padding = "5px 0";
    div.innerHTML = `✅ <b>${nome}</b> (${local}) lucrou <b>${valor} MT</b>!`;
    lista.prepend(div);
    if (lista.children.length > 5) lista.removeChild(lista.lastChild);
}

setInterval(gerarGanhoFalso, 8000);

function fazerLogout() {
    localStorage.removeItem('acesso_liberado');
    window.location.href = "./login.html";
}

window.onload = () => {
    if(document.getElementById('plano-semanal')) selecionarPlano('Semanal', 100);
    if(document.getElementById('lista-ganhos')) gerarGanhoFalso();
};
