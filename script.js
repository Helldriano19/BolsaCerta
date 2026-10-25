// ===== PARTE 1: MOSTRAR AS BOLSAS EM DESTAQUE =====
// As bolsas vêm do dados.js (lerBolsas), partilhado com bolsa.html e admin.html.
// "esc" também vem do dados.js.
var divDestaques = document.getElementById("destaques");

// Recebe uma lista de bolsas e cria um cartão para cada uma
function mostrarBolsas(lista) {
  divDestaques.innerHTML = "";

  if (lista.length === 0) {
    divDestaques.innerHTML = "<p>Ainda não há bolsas em destaque.</p>";
    return;
  }

  for (var i = 0; i < lista.length; i++) {
    var b = lista[i];
    divDestaques.innerHTML +=
      '<div class="cartao">' +
      "<h3>" + esc(b.titulo) + "</h3>" +
      '<p class="detalhe">' + esc(b.inst) + "</p>" +
      '<p class="detalhe">' + esc(b.pais) + " · " + esc(b.nivel) + "</p>" +
      '<p class="detalhe"><b>' + esc(b.cobertura) + "</b></p>" +
      '<a class="ver" href="bolsa.html?id=' + encodeURIComponent(b.id) + '">Ver bolsa →</a>' +
      "</div>";
  }
}

// Só as bolsas marcadas como "destaque" no admin, no máximo 3
mostrarBolsas(
  lerBolsas().filter(function (b) { return b.destaque; }).slice(0, 3)
);

// ===== QUANDO A API ESTIVER PRONTA =====
// Apaga a linha "mostrarBolsas(lerBolsas()...)" acima e usa isto no lugar:
//
// divDestaques.innerHTML = "<p>A carregar...</p>";
// fetch("http://localhost:3000/api/bolsas?destaque=true&limit=3")
//   .then(function (resposta) { return resposta.json(); })
//   .then(function (dados) { mostrarBolsas(dados); })
//   .catch(function () {
//     divDestaques.innerHTML = "<p>Não foi possível carregar as bolsas.</p>";
//   });

// ===== PARTE 2: PESQUISA =====
var formulario = document.getElementById("form-pesquisa");

// "submit" acontece quando o utilizador carrega em Pesquisar
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();   // impede a página de recarregar sozinha

  var texto = document.getElementById("q").value;      // o que a pessoa escreveu
  var tipo = document.getElementById("tipo").value;    // interna, externa ou vazio

  // Monta o endereço: catalogo.html?q=mestrado&tipo=externa
  window.location.href = "catalogo.html?q=" + encodeURIComponent(texto) + "&tipo=" + tipo;
});
