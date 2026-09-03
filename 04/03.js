/*
Luo JavaScriptillä oheisen kuvan mukainen SimpleToDo-sovellus, jonka
ul-elementti (id="lista") on sivun latauksen jälkeen tyhjä. Lisää-painikkeella
listaan voidaan lisätä tekstikenttään kirjoitettuja tehtäviä (li-elementtejä)
ja "Tyhjää lista" -painikkeella listan voi tyhjätä alkutilaansa. Toimintojen
vaikutukset tulee saada aikaan muokkaamalla dokumentin DOM-puuta.

Lisää sovellukseen ominaisuus, jolla myös yksittäisen tehtävän eli listan
alkion voi poistaa listasta klikkaamalla yksinkertaisesti tehtävää listassa.
Klikkaus tehtävän poistamiseksi tulee käsitellä addEventListener-
tapahtumankuuntelijametodilla.

Kuva: h03t01.png
*/

import { signal } from "../functions.js";

const todos = signal(/** @type {string[]} */ ([]));

todos.subscribe((currentTodos) => {
  const elements = currentTodos.map((todo, i) => {
    const elm = document.createElement("li");
    elm.dataset.key = i;

    elm.replaceChildren(todo);

    return elm;
  });

  document.getElementById("lista").replaceChildren(...elements);
});

document.getElementById("clear").addEventListener("click", () => {
  todos.set(() => []);
});

const list = document.getElementById("lista");
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");

  if (!li) {
    return;
  }

  const index = parseInt(li.dataset.key, 10);

  todos.set((prev) => prev.filter((_, i) => i !== index)); // poista tämä todo
});

document.getElementById("todoform").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  const newtodo = data.get("newtodo");

  if (!newtodo) {
    return;
  }

  form.reset();

  todos.set((prev) => {
    return [...prev, newtodo];
  });
});
