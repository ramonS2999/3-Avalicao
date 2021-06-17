// Campo e Tempo
var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

// triggers das funções -- Ativadores
$(function () {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();

  inicializaMarcadores();
  
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
  campo.on("input", function () {
      var conteudo = campo.val();
      var conteudoSemEspaco = conteudo.replace(/\s+/g, '');
      var qtdPalavras = conteudo.split(/\S+/).length - 1;
      $("#contador-palavras").text(qtdPalavras);
      var qtdCaracteres = conteudoSemEspaco.length;
      $("#contador-caracteres").text(qtdCaracteres);
  });
}

// Iniciar os Contadores
function inicializaCronometro() {
  var tempoRestante = $("#tempo-digitacao").text();
  campo.one("focus", function () {
      var cronometroID = setInterval(function () {
          tempoRestante--;
          $("#tempo-digitacao").text(tempoRestante);
          if (tempoRestante < 1) {
              clearInterval(cronometroID);
              finalizaJogo();
          }
      }, 1000);
  });
}
// Finaliza o Jogo
function finalizaJogo() {
  campo.attr("disabled", true);
  campo.toggleClass("campo-desativado");
  inserePlacar();
  $("#botao-reiniciar").attr("disabled", false);
}

// Reiniciar o jogo

function reiniciaJogo() {
  campo.val("");
  campo.attr("disabled", false);
  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#tempo-digitacao").text(tempoInicial);
  
  inicializaCronometro();

  campo.toggleClass("campo-desativado");

  campo.removeClass("borda-vermelha"); 
  campo.removeClass("borda-verde"); 
}

// Inicializa o Marcador
function inicializaMarcadores() {
  var frase = $(".frase").text();
  campo.on("input", function() {
      var digitado = campo.val();
      var comparavel = frase.substr(0 , digitado.length);
      if(digitado == comparavel) {
          campo.removeClass("borda-vermelha");
          campo.addClass("borda-verde");
         } else {
          campo.removeClass("borda-verde");
          campo.addClass("borda-vermelha");
         }
  });
 }

// Placar do jogo

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var usuario = "Matheus e Ramon";
  var numPalavras = $("#contador-palavras").text();
  var linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remover").click(removeLinha);
  corpoTabela.append(linha);
}
    function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>")
        .addClass("small")
        .addClass("materialicons")
        .text("delete");
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    return linha;
    }
    function removeLinha(event) {
    event.preventDefault();
    $(this).parent().parent().remove();
    }
