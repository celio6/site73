
const interesses = document.querySelector("#interesses");

const botaoEnviar = document.querySelector("#botaoEnviar");

const resposta = document.querySelector("#resposta");

const tokensEntrada = document.querySelector("#tokensEntrada");

const tokensSaida = document.querySelector("#tokensSaida");

const tokensTotal = document.querySelector("#tokensTotal");

const botaoCalcular = document.querySelector("#botaoCalcular");

const custo = document.querySelector("#custo");

// CONTADORES

let entrada = 0;
let saida = 0;

// REGRAS DE SEGURANÇA

const palavrasProibidas = [
    "cpf",
    "senha",
    "cartão de crédito",
    "número do cartão"
];

// FUNÇÃO PARA ESTIMAR TOKENS

function contarTokens(texto) {
    return texto.trim().split(/\s+/).filter(Boolean).length;
}

// FUNÇÃO DO MENTOR

function enviarMensagem() {

    const texto = interesses.value.trim();

    if (texto === "") {
        alert("Digite seus interesses primeiro!");
        return;
    }

    // VERIFICAR INFORMAÇÕES SENSÍVEIS

    const textoMinusculo = texto.toLowerCase();

    const contemDadoSensivel = palavrasProibidas.some(
        palavra => textoMinusculo.includes(palavra)
    );

    if (contemDadoSensivel) {
        resposta.style.display = "block";
        resposta.textContent =
            "Por segurança, não compartilhe informações pessoais. Tente novamente sem esses dados.";
        return;
    }

    // CONTAR TOKENS DE ENTRADA

    entrada = contarTokens(texto);

    // GERAR RESPOSTA EDUCATIVA

    let mensagem = "";

    if (textoMinusculo.includes("viajar")) {
        mensagem += "• Turismo e Hotelaria\n";
        mensagem += "• Relações Internacionais\n";
        mensagem += "• Guia de Turismo\n";
    }

    if (textoMinusculo.includes("jogar")) {
        mensagem += "• Desenvolvimento de Jogos\n";
        mensagem += "• Design de Games\n";
        mensagem += "• Programação\n";
    }

    if (textoMinusculo.includes("estudar")) {
        mensagem += "• Professor\n";
        mensagem += "• Pesquisador\n";
        mensagem += "• Pedagogia\n";
    }

    if (mensagem === "") {
        mensagem =
            "Você pode explorar áreas como tecnologia, educação, administração, comunicação e saúde. Pesquise as profissões e descubra quais combinam com seus interesses!";
    }

    const textoResposta =
        "Olá! Analisei seus interesses. Aqui estão algumas profissões que você pode conhecer:\n\n" +
        mensagem +
        "\nPesquise sobre essas áreas e descubra qual combina mais com você!";

    // MOSTRAR RESPOSTA

    resposta.style.display = "block";
    resposta.textContent = textoResposta;

    // CONTAR TOKENS DE SAÍDA

    saida = contarTokens(textoResposta);

    // ATUALIZAR ESTATÍSTICAS

    tokensEntrada.textContent = entrada;

    tokensSaida.textContent = saida;

    tokensTotal.textContent = entrada + saida;

}

// EVENTO DO BOTÃO

botaoEnviar.addEventListener("click", enviarMensagem);

// SIMULADOR DE CUSTOS

botaoCalcular.addEventListener("click", function() {

    const precoEntrada = Number(
        document.querySelector("#precoEntrada").value
    );

    const precoSaida = Number(
        document.querySelector("#precoSaida").value
    );

    if (
        !Number.isFinite(precoEntrada) ||
        !Number.isFinite(precoSaida) ||
        precoEntrada < 0 ||
        precoSaida < 0
    ) {
        custo.textContent = "Informe preços válidos.";
        return;
    }

    const valorEntrada =
        (entrada / 1000000) * precoEntrada;

    const valorSaida =
        (saida / 1000000) * precoSaida;

    const valorTotal = valorEntrada + valorSaida;

    custo.textContent =
        "Custo estimado: R$ " +
        valorTotal.toFixed(6).replace(".", ",");

});
