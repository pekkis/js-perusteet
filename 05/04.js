/*
Luo web-sivu, joka näyttää Fake Storen tuotteet. Tutustu Fake Store APIin
(https://fakestoreapi.com/) ja lue dokumentaatio (https://fakestoreapi.com/docs).
Selvitä käytettävissä oleva API-päätepiste, josta saat haettua kaikki tuotteet,
ja tutustu JSON-rakenteeseen.

Luo tarvittavat HTML-, CSS- ja JavaScript-tiedostot ja lataa ja näytä tuotteet.

Kuvat: ex0504a.png (kaikki tuotteet), ex0504b.png (vain naisten vaatteet)
-> kuvien perusteella tuotteet on voitava suodattaa kategorian mukaan.

DOM rakennetaan htl-kirjastolla (https://github.com/observablehq/htl), joka
antaa tagatun template-literaalin ja palauttaa oikeita DOM-solmuja. Kirjasto
ladataan selaimeen esm.run-CDN:stä import mapin kautta ja on asennettu myös
paikallisesti devDependencyksi, jotta editori tuntee sen tyypit. Interpoloidut
arvot escapetetaan automaattisesti sekä tekstissä että attribuuteissa.

  const card = (p) => html`<article class="product">
    <img src=${p.image} alt=${p.title} />
    <h3>${p.title}</h3>
  </article>`;

  container.replaceChildren(html`<div class="grid">${products.map(card)}</div>`);
*/

import { html } from "htl";
import { signal, fetcher } from "../functions.js";

const getProducts = async () => {
  const products = await fetcher("https://fakestoreapi.com/products");
  return products;
};

const currencyFormatter = new Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
});

try {
  const products = await getProducts();
  const allCategories = Array.from(new Set(["all", ...products.map((p) => p.category)]));

  const selectedCategory = signal("all");

  const select = (cat, sel) => html`<label for="categories">Select category: </label
    ><select
      id="categories"
      name="categories"
      value=${sel}
      onchange=${(e) => {
        selectedCategory.set(() => e.target.value);
      }}
    >
      ${cat.map((c) => {
        return html.fragment`<option selected=${c === sel} value=${c}>${c}</option>`;
      })}
    </select>`;

  const card = (p) => html`<article class="product">
    <h3 class="title">${p.title}</h3>

    <div class="body">
      <img class="image" src=${p.image} alt=${p.title} />
      <p class="description">${p.description}</p>
    </div>
    <div class="footer">
      <span class="category">${p.category}</span>
      <span class="meta"
        >price: ${currencyFormatter.format(p.price)}&nbsp;rating: ${p.rating.rate}</span
      >
    </div>
  </article>`;

  const container = document.getElementById("contents");

  const header = document.getElementById("header");

  header.replaceChildren(select(allCategories, "all"));

  selectedCategory.subscribe((sc) => {
    const cards = products
      .filter((p) => {
        if (sc === "all") {
          return true;
        }

        return p.category === sc;
      })
      .map((product) => card(product));

    const productsElm = html`<div class="products">${cards}</div>`;

    container.replaceChildren(productsElm);
  });
} catch (e) {
  console.error(e);
  alert("Tuotteita ei saatu haettua palvelimelta. Game over man, game over.");
}
