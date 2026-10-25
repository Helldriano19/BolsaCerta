// Guardo os elementos da página em variáveis para não os procurar sempre
var campoQ = document.getElementById("f-q");
var campoTipo = document.getElementById("f-tipo");
var campoNivel = document.getElementById("f-nivel");
var campoFin = document.getElementById("f-fin");
var divResultados = document.getElementById("resultados");
var contador = document.getElementById("contador");

var todas = lerBolsas();   // leio todas as bolsas uma vez

// Esta função aplica os filtros e mostra só as bolsas que passam em todos
function filtrar() {
  var q = campoQ.value.toLowerCase();       // passo tudo a minúsculas para comparar bem
  var tipo = campoTipo.value;
  var nivel = campoNivel.value;
  var fin = campoFin.value;

  var encontradas = [];                     // lista vazia onde junto as bolsas que servem

  for (var i = 0; i < todas.length; i++) {
    var b = todas[i];

    // Junto os textos da bolsa numa só frase para procurar a palavra lá dentro
    var texto = (b.titulo + " " + b.inst + " " + b.pais + " " + b.nivel + " " + b.cobertura).toLowerCase();

    // A bolsa só entra se passar em TODAS as condições
    var passaTexto = (q === "" || texto.indexOf(q) !== -1);
    var passaTipo = (tipo === "" || b.tipo.toLowerCase() === tipo);
    var passaNivel = (nivel === "" || b.nivel === nivel);
    var passaFin = (fin === "" || b.financiamento === fin);

    if (passaTexto && passaTipo && passaNivel && passaFin) {
      encontradas.push(b);                  // push = acrescenta à lista
    }
  }

  mostrar(encontradas);
}

// Mostro a lista de bolsas encontradas (ou uma mensagem se não houver nenhuma)
function mostrar(lista) {
  contador.innerHTML = lista.length + " bolsa(s) encontrada(s)";
  divResultados.innerHTML = "";

  if (lista.length === 0) {
    divResultados.innerHTML = "<p>Nenhuma bolsa corresponde à pesquisa. Tente limpar os filtros.</p>";
    return;
  }
  for (var i = 0; i < lista.length; i++) {
    divResultados.innerHTML += criarCartao(lista[i]);
  }
}

// Sempre que a pessoa escreve ou muda um filtro, eu volto a filtrar
campoQ.addEventListener("input", filtrar);
campoTipo.addEventListener("change", filtrar);
campoNivel.addEventListener("change", filtrar);
campoFin.addEventListener("change", filtrar);

// O botão Limpar volta a pôr tudo vazio
document.getElementById("limpar").addEventListener("click", function () {
  campoQ.value = "";
  campoTipo.value = "";
  campoNivel.value = "";
  campoFin.value = "";
  filtrar();
});

// Quando a página abre, eu leio o que veio na pesquisa da página inicial (?q=...&tipo=...)
var parametros = new URLSearchParams(window.location.search);
campoQ.value = parametros.get("q") || "";         // se não existir, fica vazio
campoTipo.value = parametros.get("tipo") || "";

filtrar();   // e mostro os resultados logo
