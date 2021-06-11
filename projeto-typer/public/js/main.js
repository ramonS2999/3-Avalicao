// Campo e Tempo
var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();


// triggers das funções -- Ativadores
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
});
   
// Leitura dos campos
function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

// Campo de digitação 
function inicializaContadores() {
    campo.on("input", function() {
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);
    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
    });
}
// Iniciar os Contadores
function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
    var cronometroID = setInterval(function() {
    tempoRestante--;
    $("#tempo-digitacao").text(tempoRestante);
    if (tempoRestante < 1) {
    campo.attr("disabled", true);
    clearInterval(cronometroID);
    campo.toggleClass("campo-desativado");
    }
    }, 1000);
    });
}
// Reiniciar o jogo

function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
}


