
// Leitura da frase e puxar o seu tamanho
var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

// Campo de digitação
var campo = $(".campo-digitacao");
campo.on("input", function() {
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);

    var conteudo = campo.val(); 
    var conteudoSemEspaco = conteudo.replace(/\s+/g,'');
    var qtdCaracteres = conteudoSemEspaco.length;
    $('#contador-caracteres').text(qtdCaracteres);

});

// Contar o tempo Restante
var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function() {
 var cronometroID = setInterval(function() {
 tempoRestante--;
 $("#tempo-digitacao").text(tempoRestante);
 if (tempoRestante < 1) {
 campo.attr("disabled", true);
 clearInterval(cronometroID);
 }
 }, 1000);
});

// Reiniciar o jogo
$("#botao-reiniciar").click(function(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial); //novo
});
