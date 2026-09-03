/*
      Luo JavaScriptillä oheisen kuvan mukainen sovellus. Toimintoja ovat:

      - Valinnan vaihtaminen pudotusvalikossa tulostaa valitun värikoodin
        tulosalueelle, mutta EI muuta tulosalueen taustaväriä.
      - "Mikä juhla" -tekstilaatikkoon kirjoitettu teksti päivittyy reaaliajassa
        kirjoittamisen edetessä tulosalueen alimmalle riville. Tekstin
        syöttökenttään EI hyväksytä syötteeksi numeroita.
      - Pudotusvalikosta valittu taustaväri vaihdetaan tulosalueen taustaväriksi
        klikkaamalla "Vaihda valittu taustaväri" -painiketta.
      - Luo itse sopivat funktiot ja tapahtumakuuntelijat toivottujen toimintojen
        aikaansaamiseksi.

      Kuva: h03t06.png
            */

const colors = [
  {
    value: "",
    option: "Valitse väri",
    bg: "rgb(255 255 255)",
    fg: "rgb(0 0 0)",
  },
  {
    value: "Keltainen",
    option: "Keltainen",
    bg: "rgb(255 255 0)",
    fg: "rgb(0 0 0)",
  },
  {
    value: "Punainen",
    option: "Punainen",
    bg: "rgb(255 0 0)",
    fg: "rgb(255 255 255)",
  },
  {
    value: "Musta",
    option: "Musta",
    bg: "rgb(0 0 0)",
    fg: "rgb(255 255 255)",
  },
];

const options = colors.map((c) => {
  const element = document.createElement("option");
  element.value = c.value;
  element.textContent = c.option;

  return element;
});
document.getElementById("color").replaceChildren(...options);

document.getElementById("color").addEventListener("change", (e) => {
  const theColor = colors.find((color) => color.value === e.target.value);

  document.getElementById("colorVal").textContent = theColor.bg;
});

const input = document.getElementById("name");

input.addEventListener("beforeinput", (e) => {
  if (e.data && /\d/.test(e.data)) {
    e.preventDefault();
  }
});

input.addEventListener(
  "input",
  (e) => (document.getElementById("nameVal").textContent = e.target.value),
);

document.getElementById("apply").addEventListener("click", () => {
  const colorElmValue = document.getElementById("color").value;

  const theColor = colors.find((color) => color.value === colorElmValue);

  document.getElementById("box").style.color = theColor.fg;
  document.getElementById("box").style.backgroundColor = theColor.bg;
});
