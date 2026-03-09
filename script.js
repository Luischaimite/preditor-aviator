function selecionarPlano(nome, valor) {
    // Atualiza os campos escondidos
    document.getElementById('plano_escolhido').value = nome;
    document.getElementById('valor_escolhido').value = valor;

    // Muda o visual dos cards
    document.getElementById('plano-semanal').classList.remove('active');
    document.getElementById('plano-mensal').classList.remove('active');

    if(nome === 'Semanal') {
        document.getElementById('plano-semanal').classList.add('active');
    } else {
        document.getElementById('plano-mensal').classList.add('active');
    }
}

// Inicia com o plano semanal selecionado por padrão
window.onload = () => selecionarPlano('Semanal', 100);

function enviarPedidoWhatsapp() {
    const numCliente = document.getElementById('num_cliente').value;
    const plano = document.getElementById('plano_escolhido').value;
    const valor = document.getElementById('valor_escolhido').value;

    if (numCliente.length < 9) return alert("Por favor, coloque seu número.");

    const msg = `Olá! Quero o plano *${plano.toUpperCase()}*.%0A%0A*Detalhes:*%0A- Valor: ${valor} MT%0A- Cliente: ${numCliente}%0A%0AConfirmem o depósito para me enviarem a senha!`;
    
    window.open(`https://wa.me/258872343542?text=${msg}`, '_blank');
}
