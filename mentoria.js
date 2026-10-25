// Formulário de pedido de mentoria.
// Por agora o pedido fica no localStorage. Quando houver API, troca-se só a função guardarPedido.

var formulario = document.getElementById("form-pedido");
var mensagem = document.getElementById("mensagem");

var CHAVE_PEDIDOS = "bolsacerta:pedidos";

// Leio os pedidos que já existem (se não houver nenhum, começo com uma lista vazia)
function lerPedidos() {
  try {
    var lista = JSON.parse(localStorage.getItem(CHAVE_PEDIDOS));
    if (Array.isArray(lista)) { return lista; }
  } catch (e) {}
  return [];
}

// Guardo o pedido novo. Devolve true se correu bem.
function guardarPedido(pedido) {
  var lista = lerPedidos();
  lista.unshift(pedido);
  try {
    localStorage.setItem(CHAVE_PEDIDOS, JSON.stringify(lista));
    return true;
  } catch (e) {
    return false;
  }
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();   // impeço a página de recarregar

  var pedido = {
    id: Date.now(),
    data: new Date().toISOString().slice(0, 10),
    nome: document.getElementById("p-nome").value,
    contacto: document.getElementById("p-contacto").value,
    bolsa: document.getElementById("p-bolsa").value,
    pais: document.getElementById("p-pais").value,
    fase: document.getElementById("p-fase").value,
    duvida: document.getElementById("p-duvida").value
  };

  if (guardarPedido(pedido)) {
    formulario.reset();
    mensagem.textContent = "Pedido guardado. Obrigado, " + pedido.nome + "!";
  } else {
    mensagem.textContent = "Não foi possível guardar o pedido.";
  }
});