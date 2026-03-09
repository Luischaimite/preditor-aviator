// CONFIGURAÇÃO MANUAL
const MEU_WHATSAPP = "258872343542"; // COLOCA O TEU NÚMERO AQUI (com 258)
const SENHAS_VALIDAS = ["VIP2026", "MARRACUENE", "AV1ATOR"]; // Senhas que vais vender

function enviarPedidoWhatsapp() {
    const numCliente = document.getElementById('num_cliente').value;
    const valor = "100 MT";
    
    if (numCliente.length < 9) {
        alert("Por favor, coloca um número válido.");
        return;
    }

    // Cria a mensagem automática para o teu WhatsApp
    const mensagem = `Olá! Quero comprar o acesso ao Preditor Aviator.%0A%0A*Dados do Pedido:*%0A- Cliente: ${numCliente}%0A- Valor: ${valor}%0A%0AFiz o pagamento, por favor envie-me a senha de acesso.`;
    
    // Abre o WhatsApp com a tua conversa
    const url = `https://wa.me/${MEU_WHATSAPP}?text=${mensagem}`;
    window.open(url, '_blank');
}

function verificarSenhaManual() {
    const senhaInserida = document.getElementById('chave_acesso').value.toUpperCase();
    
    if (SENHAS_VALIDAS.includes(senhaInserida)) {
        localStorage.setItem('acesso_liberado', 'true');
        alert("Acesso Confirmado! Boa sorte.");
        window.location.href = "index.html";
    } else {
        alert("Senha incorrecta. Fala com o administrador no WhatsApp.");
    }
}
