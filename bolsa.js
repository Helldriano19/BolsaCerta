(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );
  const fmt = (iso) =>
    new Date(iso + "T00:00:00")
      .toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" })
      .replace(/\./g, "");
  const toast = (msg) => {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.classList.remove("show"), 2600);
  };

  const KEY = "bolsacerta:guardadas";
  const lerGuardadas = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  };
  const gravar = (l) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(l));
    } catch {}
  };

  const id = new URLSearchParams(location.search).get("id") || BOLSAS[0]?.id;
  const b = BOLSAS.find((x) => x.id === id);
  const app = $("#app");

  if (!b) {
    document.title = "Bolsa não encontrada · BolsaCerta";
    app.innerHTML = `<section class="state"><h1>Bolsa não encontrada</h1><p>O endereço não corresponde a nenhuma bolsa. Volte à lista e escolha uma.</p><a class="btn" href="index.html#bolsas">Ver todas as bolsas</a></section>`;
    return;
  }
  document.title = `${b.titulo} · BolsaCerta`;

  const dias = Math.ceil((new Date(b.datas.encerramento + "T23:59:59") - new Date()) / 864e5);
  const prazoTxt = dias > 0 ? `Faltam ${dias} dias.` : "Prazo ilustrativo já terminado.";
  const lista = b.tipo === "interna" ? "Bolsas internas" : "Bolsas externas";

  const inclui = Object.entries(b.inclui)
    .map(
      ([k, v]) =>
        `<li class="${v ? "yes" : ""}"><span>${esc(k)}</span><strong>${v ? esc(v) : "Não incluído"}</strong></li>`,
    )
    .join("");
  const reqs = b.requisitos
    .map(
      ([k, v, d]) =>
        `<div class="req"><div><b>${esc(k)}</b><small>${esc(d)}</small></div><span>${esc(v)}</span></div>`,
    )
    .join("");
  const docs = b.docs.map(([k, d]) => `<li><b>${esc(k)}</b><small>${esc(d)}</small></li>`).join("");
  const passos = [
    [
      "Verificar elegibilidade",
      `Leia o edital e compare ${b.requisitos.map((r) => r[0].toLowerCase()).join(", ")} com o seu perfil.`,
      "Tenha uma lista de critérios confirmados.",
      "Interpretar os critérios e organizar as dúvidas a esclarecer com a instituição.",
    ],
    [
      "Reunir documentos",
      "Prepare os documentos pedidos. Confirme formatos e validade.",
      "Organize uma pasta com ficheiros identificados.",
      "Criar uma checklist e identificar documentos em falta ou cópias pouco legíveis.",
    ],
    [
      "Preparar carta de motivação",
      "Apresente o seu percurso e a relação entre a formação e os seus planos. Use exemplos concretos.",
      "Reveja uma carta escrita por si.",
      "Orientar a estrutura e dar feedback sobre clareza, mantendo a sua própria voz.",
    ],
    [
      "Rever e submeter no portal da instituição",
      "Confira dados e anexos, confirme o prazo e envie pelo canal oficial. Guarde o comprovativo.",
      "Guarde uma cópia de tudo o que enviar.",
      "Percorrer uma checklist final. A submissão e o acesso à conta são da sua responsabilidade.",
    ],
  ]
    .map(
      (p, i) =>
        `<li><span class="n">${i + 1}</span><div><h3>${p[0]}</h3><p>${esc(p[1])}</p><small>${p[2]}</small></div><p class="ajuda"><b>Com orientação</b>${p[3]}</p></li>`,
    )
    .join("");
  const timeline = [
    ["abertura", "Abertura", "Início da recepção"],
    ["encerramento", "Encerramento", "Último dia de envio"],
    ["resultados", "Resultados", "Divulgação prevista"],
  ]
    .map(
      ([k, t, d]) =>
        `<li class="${k === "encerramento" ? "key" : ""}"><time datetime="${b.datas[k]}">${fmt(b.datas[k])}</time><b>${t}</b><small>${d}</small></li>`,
    )
    .join("");

  app.innerHTML = `
  <nav class="crumbs" aria-label="Localização"><a href="index.html">Início</a> / <a href="index.html#bolsas">${lista}</a> / <span>${esc(b.titulo)}</span></nav>
  <p class="notice"><b>Dados de exemplo.</b> Bolsa, instituição, natureza e datas ilustrativas. Não é uma oportunidade verificada.</p>
  <section class="hero">
    <div>
      <p class="tags"><span class="tag red">${b.tipo === "interna" ? "Interna" : "Externa"}</span><span class="tag">${esc(b.nivel)}</span><span class="tag">${esc(b.natureza)} · Exemplo</span></p>
      <h1>${esc(b.titulo)}</h1>
      <p class="inst">${esc(b.inst)} · Exemplo</p>
      <p class="lead">${esc(b.resumo)}</p>
    </div>
    <aside class="deadline">
      <small>PRAZO ILUSTRATIVO</small>
      <strong>${fmt(b.datas.encerramento)}</strong>
      <p>${prazoTxt} Hora-limite a confirmar no edital.</p>
      <button class="btn demo" type="button">Iniciar candidatura</button>
      <button class="btn ghost demo" type="button">Ver edital oficial</button>
      <p class="fine">Proposta visual: sem ligação oficial de edital ou candidatura associada.</p>
    </aside>
    <p class="strip"><span>${esc(b.pais)} · ${b.tipo === "interna" ? "Bolsa interna" : "Bolsa externa"}</span><span>${esc(b.modalidade)}</span><span class="ok">${esc(b.cobertura)}</span>
      <button id="save" class="btn ghost" type="button" aria-pressed="false">Guardar bolsa</button></p>
  </section>

  <div class="layout">
    <nav class="side" aria-label="Nesta oportunidade">
      <p>Nesta oportunidade</p>
      <a href="#visao">Visão geral</a><a href="#requisitos">Requisitos</a><a href="#documentos">Documentos</a><a href="#datas">Datas importantes</a><a href="#como">Como candidatar-se</a><a href="#mentoria">Mentoria</a>
      <blockquote>Primeiro, conheça a bolsa. Depois, prepare o seu caminho.<small>Leia o edital antes de partilhar documentos ou iniciar qualquer candidatura.</small></blockquote>
    </nav>
    <div class="content">
      <section id="visao"><h2>Uma bolsa para valorizar o seu mérito.</h2><p>${esc(b.intro)}</p>
        <ul class="cover">${inclui}</ul><p class="fine">Coberturas e exclusões deste exemplo. Duração, cursos abrangidos e condições de renovação a confirmar no edital.</p></section>
      <div class="two">
        <section id="requisitos"><h2>É uma bolsa para si?</h2>${reqs}<p class="fine">Critérios ilustrativos. Cumprir os requisitos não garante a atribuição da bolsa; a selecção depende do edital.</p></section>
        <section id="documentos"><h2>Prepare a sua pasta.</h2><ul class="docs">${docs}</ul><p class="fine">Checklist de exemplo. Confirme a lista final, os formatos e os limites dos ficheiros no edital.</p></section>
      </div>
      <section id="datas"><h2>Organize-se com antecedência.</h2><ol class="time">${timeline}</ol><p class="fine">Datas de exemplo. Hora-limite e calendário definitivo a confirmar no edital.</p></section>
    </div>
  </div>

  <section id="como" class="band"><div class="head"><div><h2>Do primeiro requisito ao último anexo.</h2><p>Quatro etapas para preparar a candidatura com mais clareza. Pode avançar de forma autónoma ou pedir orientação.</p></div><a class="btn ghost" href="#mentoria">Pedir mentoria</a></div>
    <ol class="steps">${passos}</ol>
    <p class="fine">A candidatura é feita no portal da instituição, não na BolsaCerta. Neste exemplo, as acções são apenas demonstrativas.</p></section>

  <section id="mentoria" class="mentoria"><h2>O próximo passo pode ser acompanhado.</h2>
    <p>Nem sempre é fácil transformar um edital num plano. Esta proposta de mentoria ajuda a organizar documentos, desenvolver a carta de motivação e rever a candidatura antes do envio.</p>
    <p class="notice">Oferta conceptual, ainda não disponível para contratação. Não garante aprovação, não representa a instituição e não substitui a leitura do edital.</p>
    <button class="btn demo" type="button">Pedir mentoria</button>
    <ol class="three"><li><b>Conte-nos em que fase está</b>Indique a bolsa e a principal dúvida. Não precisa de partilhar documentos pessoais.</li><li><b>Defina o foco do apoio</b>Critérios, documentos, carta ou revisão final.</li><li><b>Mantenha o controlo</b>A carta, a conta e a submissão são suas. Nunca partilhe palavras-passe ou códigos de acesso.</li></ol>
    <p class="safe"><b>A sua segurança vem primeiro.</b> Desconfie de promessas de aprovação garantida. Confirme qualquer pedido de pagamento directamente com a instituição e não envie documentos a contactos não verificados.</p></section>`;

  // Guardar bolsa (persistente)
  const save = $("#save");
  const pintar = () => {
    const on = lerGuardadas().includes(b.id);
    save.setAttribute("aria-pressed", on);
    save.textContent = on ? "Bolsa guardada" : "Guardar bolsa";
  };
  save.addEventListener("click", () => {
    let l = lerGuardadas();
    const on = l.includes(b.id);
    l = on ? l.filter((x) => x !== b.id) : [...l, b.id];
    gravar(l);
    pintar();
    toast(on ? "Bolsa removida das guardadas." : "Bolsa guardada.");
  });
  pintar();

  // Acções demonstrativas
  document
    .querySelectorAll(".demo")
    .forEach((el) =>
      el.addEventListener("click", () =>
        toast("Acção demonstrativa: sem ligação oficial neste protótipo."),
      ),
    );

  // Destaque do índice lateral conforme o scroll
  const links = [...document.querySelectorAll(".side a")];
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting)
          links.forEach((a) => a.classList.toggle("on", a.hash === "#" + e.target.id));
      }),
    { rootMargin: "-30% 0px -60% 0px" },
  );
  links.forEach((a) => {
    const s = $(a.hash);
    if (s) io.observe(s);
  });
})();
