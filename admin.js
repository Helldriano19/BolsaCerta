var corpoTabela = document.getElementById("corpo-tabela");
var mensagem = document.getElementById("mensagem");
var formulario = document.getElementById("form-admin");

// Mostro todas as bolsas na tabela, uma linha por bolsa
function mostrarTabela() {
  var lista = lerBolsas();
  corpoTabela.innerHTML = "";

  if (lista.length === 0) {
    corpoTabela.innerHTML = '<tr><td colspan="6">Ainda não há bolsas.</td></tr>';
    return;
  }

  for (var i = 0; i < lista.length; i++) {
    var b = lista[i];
    corpoTabela.innerHTML +=
      "<tr>" +
        "<td>" + limpar(b.titulo) + "</td>" +
        "<td>" + limpar(b.tipo) + "</td>" +
        "<td>" + limpar(b.pais) + "</td>" +
        "<td>" + limpar(b.nivel) + "</td>" +
        "<td>" + formatarData(b.prazo) + "</td>" +
        // o botão Remover guarda o id da bolsa no atributo data-id
        '<td><button class="remover" data-id="' + b.id + '">Remover</button></td>' +
      "</tr>";
  }
}

// Quando a pessoa carrega em "Adicionar bolsa"
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();   // impeço a página de recarregar

  var lista = lerBolsas();

  // Crio um id novo: uso a hora atual em milissegundos, que nunca se repete
  var novaBolsa = {
    id: Date.now(),
    titulo: document.getElementById("a-titulo").value,
    instituicao: document.getElementById("a-inst").value,
    tipo: document.getElementById("a-tipo").value,
    pais: document.getElementById("a-pais").value,
    nivel: document.getElementById("a-nivel").value,
    financiamento: document.getElementById("a-fin").value,
    cobertura: document.getElementById("a-cob").value,
    prazo: document.getElementById("a-prazo").value
  };

  lista.unshift(novaBolsa);   // unshift põe a bolsa nova no início da lista
  guardarBolsas(lista);

  formulario.reset();         // limpo o formulário
  mensagem.innerHTML = "Bolsa adicionada com sucesso.";
  mostrarTabela();
});

// Quando a pessoa carrega em "Remover" numa linha da tabela
corpoTabela.addEventListener("click", function (evento) {
  var botao = evento.target;
  if (!botao.classList.contains("remover")) { return; }   // ignoro cliques noutros sítios

  if (!confirm("Tem a certeza que quer remover esta bolsa?")) { return; }

  var id = Number(botao.getAttribute("data-id"));
  var lista = lerBolsas();
  var restantes = [];

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id !== id) {      // guardo todas menos a que quero remover
      restantes.push(lista[i]);
    }
  }

  guardarBolsas(restantes);
  mensagem.innerHTML = "Bolsa removida.";
  mostrarTabela();
});

mostrarTabela();   // mostro a tabela quando a página abre
