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
        "<td>" + esc(b.titulo) + "</td>" +
        "<td>" + rotuloTipo(b.tipo) + "</td>" +
        "<td>" + esc(b.pais) + "</td>" +
        "<td>" + esc(b.nivel) + "</td>" +
        "<td>" + formatarData(prazoDe(b)) + "</td>" +
        // o botão Remover guarda o id da bolsa no atributo data-id
        '<td><button class="remover" data-id="' + esc(b.id) + '">Remover</button></td>' +
      "</tr>";
  }
}

// Cria um id em texto a partir do título (ex.: "Bolsa Nova" -> "bolsa-nova")
function criarId(titulo, lista) {
  var base = titulo.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "bolsa";
  var id = base, n = 2;
  while (lista.some(function (b) { return b.id === id; })) {
    id = base + "-" + n;
    n++;
  }
  return id;
}

// Quando a pessoa carrega em "Adicionar bolsa"
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  var lista = lerBolsas();
  var titulo = document.getElementById("a-titulo").value;
  var nivel = document.getElementById("a-nivel").value;
  var cobertura = document.getElementById("a-cob").value;
  var prazo = document.getElementById("a-prazo").value;
  var hoje = new Date().toISOString().slice(0, 10);

  // Objecto COMPLETO, no mesmo formato do dados.js, para o bolsa.js não crashar
  var novaBolsa = {
    id: criarId(titulo, lista),
    destaque: document.getElementById("a-destaque").checked,
    titulo: titulo,
    tipo: document.getElementById("a-tipo").value,
    inst: document.getElementById("a-inst").value,
    natureza: "A confirmar",
    pais: document.getElementById("a-pais").value,
    nivel: nivel,
    modalidade: "A confirmar",
    financiamento: document.getElementById("a-fin").value,
    cobertura: cobertura,
    resumo: titulo + ": " + cobertura + ".",
    intro: "Cobertura: " + cobertura + ". Confirme os detalhes no edital.",
    inclui: { Cobertura: cobertura },
    requisitos: [["Nível de estudo", nivel, "A confirmar no edital."]],
    docs: DOCS_PADRAO,
    datas: { abertura: hoje, encerramento: prazo, resultados: prazo }
  };

  lista.unshift(novaBolsa);   // põe a bolsa nova no início da lista

  if (guardarBolsas(lista)) {
    formulario.reset();
    mensagem.textContent = "Bolsa adicionada com sucesso.";
  } else {
    mensagem.textContent = "Não foi possível guardar a bolsa.";
  }
  mostrarTabela();
});

// Quando a pessoa carrega em "Remover" numa linha da tabela
corpoTabela.addEventListener("click", function (evento) {
  var botao = evento.target;
  if (!botao.classList.contains("remover")) { return; }
  if (!confirm("Tem a certeza que quer remover esta bolsa?")) { return; }

  var id = botao.getAttribute("data-id");   // agora é texto, sem Number()
  var restantes = lerBolsas().filter(function (b) { return b.id !== id; });

  guardarBolsas(restantes);
  mensagem.textContent = "Bolsa removida.";
  mostrarTabela();
});

mostrarTabela();   // mostro a tabela quando a página abre
