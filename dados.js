// Dados de exemplo. Cada bolsa é identificada por "id" (bolsa.html?id=merito-academico).
// Quando houver backend, esta lista passa a ser um fetch() com o mesmo formato.
const DOCS_PADRAO = [
  ["Bilhete de Identidade", "Cópia legível de um documento válido."],
  ["Certificado de habilitações", "Com notas discriminadas e média final."],
  ["Carta de motivação", "Percurso académico e objectivos de estudo."],
];
const BOLSAS_PADRAO = [
  {
    id: "merito-academico",
    destaque: true,
    titulo: "Bolsa de Mérito Académico",
    tipo: "interna",
    inst: "Universidade Horizonte",
    natureza: "Privada",
    pais: "Angola",
    nivel: "Licenciatura",
    modalidade: "Mérito académico",
    financiamento: "Integral",
    cobertura: "100% das propinas",
    resumo:
      "Apoio por mérito para estudantes angolanos, com cobertura de 100% das propinas de Licenciatura.",
    intro:
      "Apoio ao acesso à Licenciatura em Angola. O financiamento cobre integralmente as propinas, mas não todas as despesas de estudo.",
    inclui: {
      Propinas: "100% incluídas",
      Alojamento: null,
      "Seguro de saúde": null,
      Alimentação: null,
    },
    requisitos: [
      ["Nacionalidade", "Angolana", "Comprovada por documento de identificação."],
      ["Média mínima", "14 valores", "Na escala de 0 a 20 valores."],
      ["Nível de estudo", "Licenciatura", "Admissão ou matrícula na instituição."],
    ],
    docs: [
      DOCS_PADRAO[0],
      DOCS_PADRAO[1],
      ["Comprovativo de admissão ou matrícula", "Relativo à Licenciatura na instituição."],
      DOCS_PADRAO[2],
    ],
    datas: { abertura: "2027-10-01", encerramento: "2027-11-30", resultados: "2027-12-15" },
  },
  {
    id: "apoio-social",
    titulo: "Bolsa de Apoio Social",
    tipo: "interna",
    inst: "Instituto Futuro",
    natureza: "Pública",
    pais: "Angola",
    nivel: "Licenciatura",
    modalidade: "Apoio social",
    financiamento: "Parcial",
    cobertura: "Até 75% das propinas",
    resumo: "Apoio a estudantes com necessidade financeira, com cobertura até 75% das propinas.",
    intro: "Apoio parcial às propinas para quem demonstra necessidade financeira.",
    inclui: { Propinas: "Até 75%", Alojamento: null, "Seguro de saúde": null, Alimentação: null },
    requisitos: [
      ["Situação", "Necessidade financeira", "Comprovada por declaração."],
      ["Nível de estudo", "Licenciatura", "Matrícula na instituição."],
    ],
    docs: [DOCS_PADRAO[0], ["Declaração de rendimentos", "Do agregado familiar."], DOCS_PADRAO[2]],
    datas: { abertura: "2027-10-15", encerramento: "2027-12-20", resultados: "2028-01-15" },
  },
  {
    id: "pontes-lusofonas",
    destaque: true,
    titulo: "Programa Pontes Lusófonas",
    tipo: "externa",
    inst: "Fundação Pontes",
    natureza: "Fundação",
    pais: "Portugal",
    nivel: "Mestrado",
    modalidade: "Cooperação",
    financiamento: "Integral",
    cobertura: "Propinas + apoio mensal",
    resumo: "Mestrado em Portugal para licenciados de países de língua portuguesa.",
    intro: "Programa de cooperação que cobre propinas e um apoio mensal.",
    inclui: {
      Propinas: "Incluídas",
      "Apoio mensal": "Incluído",
      Alojamento: null,
      "Seguro de saúde": null,
    },
    requisitos: [
      ["Formação", "Licenciatura concluída", "País de língua portuguesa."],
      ["Nível de estudo", "Mestrado", "Admissão na universidade de destino."],
    ],
    docs: [DOCS_PADRAO[0], DOCS_PADRAO[1], DOCS_PADRAO[2]],
    datas: { abertura: "2027-09-15", encerramento: "2027-12-15", resultados: "2028-02-10" },
  },
  {
    id: "ciencia-sem-fronteiras",
    titulo: "Ciência sem Fronteiras — Pesquisa",
    tipo: "externa",
    inst: "Centro de Ciência Global",
    natureza: "Privada",
    pais: "Brasil",
    nivel: "Doutoramento",
    modalidade: "Investigação",
    financiamento: "Integral",
    cobertura: "Propinas + alojamento + viagem",
    resumo: "Doutoramento no Brasil para mestres com projecto de investigação.",
    intro: "Financia propinas, alojamento e viagem para investigação de doutoramento.",
    inclui: {
      Propinas: "Incluídas",
      Alojamento: "Incluído",
      Viagem: "Incluída",
      Alimentação: null,
    },
    requisitos: [
      ["Formação", "Mestrado concluído", "Na área do projecto."],
      ["Projecto", "Investigação", "Proposta de investigação."],
    ],
    docs: [DOCS_PADRAO[0], DOCS_PADRAO[1], ["Projecto de investigação", "Resumo da proposta."]],
    datas: { abertura: "2027-10-01", encerramento: "2028-01-10", resultados: "2028-03-01" },
  },
  {
    id: "talentos-tecnologia",
    destaque: true,
    titulo: "Talentos da Tecnologia",
    tipo: "interna",
    inst: "Academia Digital",
    natureza: "Privada",
    pais: "Angola",
    nivel: "Formação técnica",
    modalidade: "Formação profissional",
    financiamento: "Integral",
    cobertura: "100% do curso + material",
    resumo: "Formação técnica para jovens dos 18 aos 25 anos com ensino médio.",
    intro: "Curso técnico em tecnologia, com material incluído.",
    inclui: { Curso: "100% incluído", Material: "Incluído", Alojamento: null, Alimentação: null },
    requisitos: [
      ["Idade", "18 a 25 anos", "Comprovada por documento."],
      ["Habilitações", "Ensino médio", "Concluído."],
    ],
    docs: [DOCS_PADRAO[0], DOCS_PADRAO[1], DOCS_PADRAO[2]],
    datas: { abertura: "2027-11-01", encerramento: "2028-01-31", resultados: "2028-02-15" },
  },
  {
    id: "novos-horizontes",
    titulo: "Intercâmbio Novos Horizontes",
    tipo: "externa",
    inst: "Rede Campus",
    natureza: "Rede universitária",
    pais: "África do Sul",
    nivel: "Mobilidade",
    modalidade: "Mobilidade académica",
    financiamento: "Parcial",
    cobertura: "Apoio mensal + seguro",
    resumo: "Intercâmbio na África do Sul para estudantes de licenciatura com inglês B2.",
    intro: "Mobilidade académica com apoio mensal e seguro de saúde.",
    inclui: {
      "Apoio mensal": "Incluído",
      "Seguro de saúde": "Incluído",
      Propinas: null,
      Alojamento: null,
    },
    requisitos: [
      ["Nível de estudo", "Licenciatura", "Matrícula activa."],
      ["Inglês", "Nível B2", "Certificado reconhecido."],
    ],
    docs: [DOCS_PADRAO[0], DOCS_PADRAO[1], ["Certificado de inglês", "Nível B2 ou superior."]],
    datas: { abertura: "2027-11-15", encerramento: "2028-02-15", resultados: "2028-03-20" },
  },
];

// ===== ARMAZENAMENTO =====
// Por agora as bolsas vivem no localStorage do navegador (o admin grava aqui).
// Quando a API existir, só estas duas funções mudam (ver explicação no admin.js).
const CHAVE_BOLSAS = "bolsacerta:bolsas";

function carregarBolsas() {
  try {
    const guardadas = JSON.parse(localStorage.getItem(CHAVE_BOLSAS));
    if (Array.isArray(guardadas)) return guardadas;
  } catch (e) {}
  return JSON.parse(JSON.stringify(BOLSAS_PADRAO));
}

function guardarBolsas(lista) {
  try {
    localStorage.setItem(CHAVE_BOLSAS, JSON.stringify(lista));
    return true;
  } catch (e) {
    return false;
  }
}

const BOLSAS = carregarBolsas();
// Nome usado pelo script.js do index (e, mais tarde, pelo catálogo)
function lerBolsas() {
  return carregarBolsas();
}


// ===== FUNÇÕES COMUNS (usadas em todas as páginas) =====

// Impede que texto escrito no admin seja interpretado como HTML
function esc(texto) {
  return String(texto).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function limpar(texto) { return esc(texto); }   // nome antigo, para não partir nada

// 2027-11-30 -> 30/11/2027
function formatarData(data) {
  if (!data) { return "A confirmar"; }
  var partes = data.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// O prazo agora vive em b.datas.encerramento
function prazoDe(b) {
  return b.datas ? b.datas.encerramento : b.prazo;
}

function rotuloTipo(tipo) {
  return tipo === "interna" ? "Interna" : "Externa";
}

// Cartão usado no catálogo
function criarCartao(b) {
  return '<div class="cartao">' +
    '<span class="tag">' + rotuloTipo(b.tipo) + "</span> " +
    '<span class="tag cinza-tag">' + esc(b.financiamento) + "</span>" +
    "<h3>" + esc(b.titulo) + "</h3>" +
    '<p class="detalhe">' + esc(b.inst) + "</p>" +
    '<p class="detalhe">' + esc(b.pais) + " · " + esc(b.nivel) + "</p>" +
    '<p class="detalhe"><b>' + esc(b.cobertura) + "</b></p>" +
    '<p class="detalhe">Prazo: ' + formatarData(prazoDe(b)) + "</p>" +
    '<a class="ver" href="bolsa.html?id=' + encodeURIComponent(b.id) + '">Ver bolsa →</a>' +
  "</div>";
}
