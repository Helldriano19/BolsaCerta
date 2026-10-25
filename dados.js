// Este ficheiro é partilhado por todas as páginas: eu guardo aqui os dados e as funções comuns.

// Lista inicial: só a uso se ainda não existir nada guardado no navegador
var bolsasIniciais = [
  { id: 1, titulo: "Bolsa de Mérito Académico", instituicao: "IGNABE", tipo: "Interna", pais: "Angola", nivel: "Licenciatura", financiamento: "Integral", cobertura: "100% das propinas", prazo: "2027-11-30" },
  { id: 2, titulo: "Programa Pontes Lusófonas", instituicao: "Fundação Pontes", tipo: "Externa", pais: "Portugal", nivel: "Mestrado", financiamento: "Integral", cobertura: "Propinas + apoio mensal", prazo: "2027-12-15" },
  { id: 3, titulo: "Talentos da Tecnologia", instituicao: "Academia Digital", tipo: "Interna", pais: "Angola", nivel: "Formação técnica", financiamento: "Integral", cobertura: "100% do curso + material", prazo: "2028-01-31" },
  { id: 4, titulo: "Bolsa de Apoio Social", instituicao: "Instituto Futuro", tipo: "Interna", pais: "Angola", nivel: "Licenciatura", financiamento: "Parcial", cobertura: "Até 75% das propinas", prazo: "2027-12-20" }
];

// Leio as bolsas guardadas no navegador (localStorage). Se não houver, uso a lista inicial.
// Isto é só para o MVP: mais tarde as bolsas vêm da API e da base de dados.
function lerBolsas() {
  var texto = localStorage.getItem("bolsas");
  if (texto === null) {
    return bolsasIniciais;
  }
  return JSON.parse(texto);   // converto o texto guardado de volta em lista
}

// Guardo a lista no navegador (a lista tem de virar texto primeiro)
function guardarBolsas(lista) {
  localStorage.setItem("bolsas", JSON.stringify(lista));
}

// Evito que o texto escrito no admin estrague o HTML (troco < e > por símbolos seguros)
function limpar(texto) {
  return String(texto).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Converto 2027-11-30 em 30/11/2027
function formatarData(data) {
  if (!data) { return "A confirmar"; }
  var partes = data.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// Crio o HTML de um cartão de bolsa. Uso esta função na home e no catálogo.
function criarCartao(b) {
  return '<div class="cartao">' +
    '<span class="tag">' + limpar(b.tipo) + "</span> " +
    '<span class="tag cinza-tag">' + limpar(b.financiamento) + "</span>" +
    "<h3>" + limpar(b.titulo) + "</h3>" +
    '<p class="detalhe">' + limpar(b.instituicao) + "</p>" +
    '<p class="detalhe">' + limpar(b.pais) + " · " + limpar(b.nivel) + "</p>" +
    '<p class="detalhe"><b>' + limpar(b.cobertura) + "</b></p>" +
    '<p class="detalhe">Prazo: ' + formatarData(b.prazo) + "</p>" +
    '<a class="ver" href="bolsa.html?id=' + b.id + '">Ver bolsa →</a>' +
  "</div>";
}
