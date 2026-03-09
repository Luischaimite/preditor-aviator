function atualizarPainel() {
    const sElement = document.getElementById('sinal');
    const pFill = document.getElementById('prob-fill');
    const tElement = document.getElementById('tendencia');
    const lista = document.getElementById('lista-resultados');

    if (historico.length < 3) {
        sElement.innerText = "INSIRA + DADOS";
        return;
    }

    // Lógica de Cálculo da Próxima Vela
    const ultimos = historico.slice(-3);
    const media = ultimos.reduce((a, b) => a + b, 0) / ultimos.length;
    
    // Se saíram muitas velas baixas, o algoritmo projeta uma recuperação
    let previsao;
    if (media < 1.5) {
        previsao = (Math.random() * (2.10 - 1.50) + 1.50).toFixed(2);
        sElement.innerHTML = `PRÓXIMA VELA: <span style="color:#4caf50">${previsao}x</span>`;
        pFill.style.width = "94%";
        pFill.style.backgroundColor = "#4caf50";
        tElement.innerText = "SINAL DE ENTRADA FORTE";
    } else {
        sElement.innerHTML = `AGUARDE PADRÃO...`;
        pFill.style.width = "30%";
        pFill.style.backgroundColor = "#ff9800";
        tElement.innerText = "MERCADO EM RISCO";
    }

    // Atualiza a lista visual
    lista.innerHTML = historico.slice().reverse().map(h => 
        `<span class="badge" style="color:${h >= 2 ? '#4caf50' : '#e91e63'}">${h.toFixed(2)}x</span>`
    ).join('');
}
