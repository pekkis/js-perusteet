/*
Luo oheisen mallin ja ohjeistuksen mukainen web-sovellus kiinteistöjen
myynti-ilmoitusten esittelemiseksi HTML:n, CSS:n, JavaScriptin ja Fetch APIn
avulla. Ilmoitusten tekstidata tulee olla JSON-muodossa. Ohjelma lataa Fetch
APIn avulla JSON-datan ja muodostaa siitä DOMia muokkaamalla vaaditun näkymän.

Kuva: h04t01.png

HUOM. tehtävänanto on ristiriitainen id:n suhteen: kohta 3 sanoo div-elementin
id:n olevan "talot", mutta kohdan 4 tyylit ja kohdan 7 esimerkkikoodi
käyttävät "houses". Valitsin "houses", koska kaksi kolmesta kohdasta ja
annettu koodi käyttävät sitä.

Vaadittu rakenne:
- JSON-tiedostossa taulukko on ylin objekti (talot.json, valmiina)
- talo-objekti: "image", "address", "size", "price", "text"
- getHouses()   lataa JSON-tiedoston palvelimelta
- renderHouses() muodostaa näkymän DOMia muokkaamalla ja käyttää getHouses():ia

Tyylit (kohta 4) ovat tiedostossa 01.css. Ne on toteutettu flexboxilla
kiinteiden pikselimittojen sijaan, ja ne odottavat että p-elementit
kääritään div.houseInfo -elementtiin kuvan viereen:

  div.houseContainer
    img.houseImage
    div.houseInfo
      p.header / p / p.text / p
Hinnan muotoilu: new Intl.NumberFormat("fi-FI").format(house.price)


Tehtävänannossa annettu renderHouses()-runko. Kaksi kohtaa on jätetty
opiskelijan tehtäväksi (ks. kommentit).
*/

import { fetcher } from "../functions.js";

async function getHouses() {
  const houses = await fetcher("./talot.json");

  return houses;
}

const formatter = new Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
  currencyDisplay: "name",
  maximumFractionDigits: 0,
});

async function renderHouses() {
  const houses = await getHouses();
  const housediv = document.getElementById("houses");

  houses.forEach((house) => {
    const housecontainer = document.createElement("div");
    housecontainer.classList.add("houseContainer");

    const image = document.createElement("img");
    image.src = house.image;
    image.classList.add("houseImage");

    const hinfo = document.createElement("div");
    hinfo.classList.add("houseInfo");

    const header = document.createElement("p");
    header.classList.add("header");
    header.textContent = house.address;

    const size = document.createElement("p");
    size.replaceChildren(house.size, " m2");

    const price = document.createElement("p");
    price.replaceChildren(formatter.format(house.price));

    const text = document.createElement("p");
    text.classList.add("text");
    text.textContent = house.text;

    hinfo.appendChild(header);
    hinfo.appendChild(size);

    hinfo.appendChild(text);
    hinfo.appendChild(price);

    housecontainer.appendChild(image);
    housecontainer.appendChild(hinfo);

    housediv.appendChild(housecontainer);
  });
}

renderHouses();
