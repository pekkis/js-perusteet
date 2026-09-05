/*
Toteuta oheisen kuvasarjan mukaiset toiminnot HTML:llä, CSS:llä,
JavaScriptillä ja Fetch APIlla.

Kuva: h04t03.png

Toiminnallisuus:

1. Käyttäjä voi etsiä nimen ALKUOSAN perusteella JSON-tiedostoon tallennettua
   nimeä.
2. Käyttäjän jokaisen näppäinpainalluksen jälkeen (onkeyup) haetaan Fetch APIa
   käyttäen JSON-tiedoston sisältö (etunimiä) ja näytetään hakukentän
   alapuolella vain ne nimet, joiden alkuosa vastaa hakukentän tekstiä.
   Merkkikoon merkitsevyyden saa päättää itse. Esim. "aa" -> Aava ja Aamu.
3. Hakutulosten ollessa näkyvillä nimiä on voitava selata nuoli alas ja
   nuoli ylös -näppäimin. Valittu kohta tulee olla korostettuna.
4. ENTER kopioi valitun hakutuloksen hakukenttään ja tyhjentää listan. Jos
   valittua tulosta ei ole, hakukenttä tyhjätään.
5. ESC palauttaa hakukentän alkutilaansa ja tyhjentää listan.

Ulkoasu ja tulosten elementti (div, ul, ...) ovat vapaita.

Nimet ovat tiedostossa nimet.json (valmiina, sisältö tehtävänannon mukainen).
*/

import { html } from "htl";
import { signal, fetcher } from "../functions.js";

const queryNames = async (query) => {
  const rawNames = await fetcher("./nimet.json");

  if (!query) {
    return [];
  }

  return rawNames.filter((name) => {
    return name.toLowerCase().startsWith(query.toLowerCase());
  });
};

try {
  /** @typedef {{ query: string, highlighted: number, names: string[] }} SearchState */

  const state = signal(/** @type {SearchState} */ ({ query: "", highlighted: -1, names: [] }));

  const contentsElement = document.getElementById("contents");

  const createInput = (state) => html`<div class="field">
    <input
      id="search"
      name="search"
      oninput=${async (e) => {
        const names = await queryNames(e.target.value);

        state.set((prev) => {
          return {
            ...prev,
            query: e.target.value,
            highlighted: -1,
            names,
          };
        });
      }}
    />
  </div>`;

  const renderResults = (current) => {
    const results = html`<ul class="names">
      ${current.names.map((qn, i) => {
        return html.fragment`<li class="name ${current.highlighted === i ? "highlighted" : ""}">
          ${qn}
        </li>`;
      })}
    </ul>`;

    contentsElement.replaceChildren(results);
  };

  const header = document.getElementById("header");
  header.replaceChildren(createInput(state));

  const searchInput = header.querySelector("#search");
  state.subscribe((current) => {
    if (searchInput.value !== current.query) {
      searchInput.value = current.query;
    }

    renderResults(current);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      state.set((prev) => {
        if (prev.highlighted === -1) {
          return prev;
        }

        return {
          ...prev,
          highlighted: Math.max(0, prev.highlighted - 1),
        };
      });
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      state.set((prev) => {
        return {
          ...prev,
          highlighted: Math.min(prev.names.length - 1, prev.highlighted + 1),
        };
      });
    }

    if (e.key === "Enter") {
      state.set((prev) => {
        if (prev.highlighted === -1) {
          return {
            ...prev,
            query: "",
            highlighted: -1,
            names: [],
          };
        }

        const highlightedName = prev.names[prev.highlighted];

        return {
          ...prev,
          query: highlightedName,
          highlighted: -1,
          names: [],
        };
      });
    }

    if (e.key === "Escape") {
      state.set((prev) => {
        return {
          ...prev,
          query: "",
          highlighted: -1,
          names: [],
        };
      });
    }
  });
} catch (e) {
  console.error(e);
  alert("Jotain meni pahasti vikaan. Pahoittelumme.");
}
