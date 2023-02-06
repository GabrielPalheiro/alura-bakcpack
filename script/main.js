const form = document.getElementById("novoItem");
const list = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((element) => {
  createElement(element);
});

//fazendo evento do formulario
form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  const existe = itens.find((element) => element.nome === nome.value);

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) {
    itemAtual.id = itens.length;

    updateElement(itemAtual);

    itens[itens.findIndex((element) => element.id === existe.id)] = itemAtual;
  } else {
    itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
    createElement(itemAtual);

    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = "";
  quantidade.value = "";
});

function createElement(item) {
  const newItem = document.createElement("li");
  newItem.classList.add("item");

  const itemNumber = document.createElement("strong");
  itemNumber.innerHTML = item.quantidade;
  itemNumber.dataset.id = item.id;

  newItem.appendChild(itemNumber);
  newItem.innerHTML += item.nome;

  newItem.appendChild(deleteButton(item.id));

  list.appendChild(newItem);
}

function updateElement(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}

function deleteButton(id) {
  const buttonElement = document.createElement("button");
  buttonElement.innerText = "X";

  buttonElement.addEventListener("click", function () {
    deleteElement(this.parentNode, id);
  });

  return buttonElement;
}

function deleteElement(element, id) {
  element.remove();

  itens.splice(
    itens.findIndex((element) => element.id === id),
    1
  );
  localStorage.setItem("itens", JSON.stringify(itens));
}
