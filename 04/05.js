/*
Luo web-sivu, jolla käyttäjä voi lisätä tuotteita ostoslistalle.
Tuotetiedot annetaan web-lomakkeella. Tuotteet näytetään omassa
div-elementissä. Tuotteet voidaan poistaa ostoslistalta.

Kuva: ex0405.png
      */

import { signal } from "../functions.js";

/** @typedef {{ name: string, price: number, count: number }} Product */

const products = signal(/** @type {Product[]} */ ([]));

products.subscribe((items) => {
  const elements = items.map((item, i) => {
    const elm = document.createElement("div");
    elm.classList.add("item");
    elm.classList.add("stack");
    elm.classList.add("stack-gap-1");
    elm.classList.add("stack-y");
    elm.dataset.key = String(i);

    const x = document.createElement("div");
    x.classList.add("x");
    x.dataset.action = "delete";
    x.textContent = "x";

    const name = document.createElement("div");
    name.textContent = `Name: ${item.name}`;

    const price = document.createElement("div");
    price.textContent = `Price: ${item.price.toFixed(2)}`;

    const count = document.createElement("div");
    count.textContent = `Count: ${item.count}`;

    elm.replaceChildren(x, name, price, count);

    return elm;
  });

  document.getElementById("items").replaceChildren(...elements);
});

const list = document.getElementById("items");
list.addEventListener("click", (e) => {
  if (e.target.dataset?.action !== "delete") {
    return;
  }

  const item = e.target.closest("div.item");

  if (!item) {
    return;
  }

  const index = parseInt(item.dataset.key, 10);

  products.set((prev) => prev.filter((_, i) => i !== index));
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  const newItem = {
    name: data.get("name"),
    price: parseFloat(data.get("price")),
    count: parseInt(data.get("count"), 10),
  };

  if (!newItem.name) {
    return;
  }

  if (Number.isNaN(newItem.price)) {
    return;
  }

  if (!newItem.count) {
    return;
  }

  form.reset();

  products.set((prev) => {
    return [...prev, newItem];
  });
});
