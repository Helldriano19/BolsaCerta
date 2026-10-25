// ===== PARTE 1: MOSTRAR AS BOLSAS EM DESTAQUE =====

// Vou buscar ao HTML a div onde os cartões vão aparecer
var divDestaques = document.getElementById("destaques");

// Leio todas as bolsas e fico só com as 3 primeiras (slice corta a lista)
var destaques = lerBolsas().slice(0, 3);

if (destaques.length === 0) {                 // se não há bolsas, eu aviso
  divDestaques.innerHTML = "<p>Ainda não há bolsas em destaque.</p>";
} else {
  for (var i = 0; i < destaques.length; i++) {  // repito para cada bolsa
    divDestaques.innerHTML += criarCartao(destaques[i]);   // criarCartao vem do dados.js
  }
}

// ===== QUANDO A API ESTIVER PRONTA =====
// Eu troco a linha "lerBolsas().slice(0, 3)" por um fetch como este:
//
// fetch("http://localhost:3000/api/bolsas?destaque=true&limit=3")
//   .then(function (resposta) { return resposta.json(); })
//   .then(function (dados) { /* aqui mostro os cartões */ });

// ===== PARTE 2: PESQUISA =====

var formulario = document.getElementById("form-pesquisa");

// "submit" acontece quando a pessoa carrega em Pesquisar
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();   // eu impeço a página de recarregar sozinha

  var texto = document.getElementById("q").value;      // o que a pessoa escreveu
  var tipo = document.getElementById("tipo").value;    // interna, externa ou vazio

  // Monto o endereço, por exemplo: catalogo.html?q=mestrado&tipo=externa
  window.location.href = "catalogo.html?q=" + encodeURIComponent(texto) + "&tipo=" + tipo;
});
