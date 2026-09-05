/*
Luo web-sivu, joka näyttää viisi suosikkikaupunkiasi (Suomessa) kartalla.
Voit käyttää mitä tahansa karttaratkaisua (Leaflet, Openlayers, ...).

Kuva: ex0601.png

Karttaratkaisuna Leaflet + OpenStreetMapin laatat. Leaflet ladataan
esm.run-CDN:stä import mapin kautta; tyylitiedosto tulee jsDelivristä.
Mitään API-avainta ei tarvita.

Kartan pystytys pähkinänkuoressa:

  const map = L.map("map").setView([62.5, 25.5], 5);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);
  L.marker([61.4991, 23.7871]).addTo(map).bindPopup("Tampere");

HUOM. karttaelementille on annettava korkeus CSS:ssä (01.css), muuten
Leaflet piirtää nollan korkuisen laatikon.
*/

import L from "leaflet";

const myFavouriteCities = [
  {
    name: "Vantaa",
    latitude: 60.2595,
    longitude: 24.850658,
    note: "Iskostie 2, Myyrmäki",
  },
  {
    name: "Helsinki",
    latitude: 60.16662,
    longitude: 24.943541,
  },
  {
    name: "Turku",
    latitude: 60.451593,
    longitude: 22.266999,
  },
  {
    name: "Tampere",
    latitude: 61.497799,
    longitude: 23.761633,
  },
  {
    name: "Jyväskylä",
    latitude: 62.241672,
    longitude: 25.749581,
  },
];

try {
  const map = L.map("map").fitBounds(
    myFavouriteCities.map((c) => [c.latitude, c.longitude]),
    {
      padding: [30, 30],
    },
  );

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  for (const city of myFavouriteCities) {
    L.marker([city.latitude, city.longitude])
      .addTo(map)
      .bindPopup(city.note ? `${city.name} — ${city.note}` : city.name);
  }
} catch (e) {
  console.error(e);
  alert("Jotain meni pahastib pieleenb!");
}
