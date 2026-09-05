/*
Luo web-sivu, joka näyttää suosikkipaikkojasi kartalla. Tässä harjoituksessa
on käytettävä selaimen Local Storagea.

Kuva: ex0602.png

Vaatimuksia:
- Käyttäjä voi lisätä uuden suosikkipaikan web-lomakkeen avulla
- Suosikkipaikat tallennetaan selaimen Local Storageen
- Kaikki lisätyt suosikkipaikat näytetään, kun web-sivu avataan tai ladataan
  uudelleen. Selain pitää pystyä sulkemaan välissä.

HUOM. Local Storage tallentaa vain merkkijonoja, joten oliot on muunnettava
JSON.stringify-metodilla ja luettava takaisin JSON.parse-metodilla.
Suoraan tallennettuna olio päätyisi muodossa "[object Object]".
*/

import L from "leaflet";

const peksuPlaces = [
  {
    name: "Myyrmäki, Vantaa",
    latitude: 60.261281,
    longitude: 24.852169,
  },
  {
    name: "Finnkino Tennispalatsi, Helsinki",
    latitude: 60.169444,
    longitude: 24.93069,
  },
  {
    name: "Pariisi, Ranska",
    latitude: 48.853495,
    longitude: 2.348391,
  },
  {
    name: "San Francisco, USA",
    latitude: 37.787936,
    longitude: -122.40752,
  },
  {
    name: "Krakova, Puola",
    latitude: 50.061947,
    longitude: 19.936856,
  },
  {
    name: "Berliini, Saksa",
    latitude: 52.517389,
    longitude: 13.395131,
  },
];

/*
example test data, you can add these:

{
  name: "Jakarta, Indonesia",
  latitude: -6.175405,
  longitude: 106.827168,
},
{
  name: "Tukholma, Ruotsi",
  latitude: 59.325117,
  longitude: 18.071093,
},
{
  name: "Kakskerta, Turku",
  latitude: 60.358929,
  longitude: 22.226249,
}
*/

const createPlaceService = (defaultPlaces) => {
  const getInitial = () => {
    const places = localStorage.getItem("places");
    if (!places) {
      return defaultPlaces;
    }

    try {
      const jsonPlaces = JSON.parse(places);
      if (!jsonPlaces) {
        return defaultPlaces;
      }

      return jsonPlaces;
    } catch {
      return defaultPlaces;
    }
  };

  let places = getInitial();

  const get = () => {
    return places;
  };

  const add = (place) => {
    places = [...places, place];
    localStorage.setItem("places", JSON.stringify(places));
  };

  return {
    add,
    get,
  };
};

const places = createPlaceService(peksuPlaces);

try {
  const map = L.map("map").fitBounds(
    [
      [46, -2],
      [63, 30],
    ],
    {
      padding: [5, 5],
    },
  );

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  for (const place of places.get()) {
    L.marker([place.latitude, place.longitude]).addTo(map).bindPopup(place.name);
  }

  document.getElementById("add").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);

      const name = data.get("name");
      const latitude = data.get("latitude");
      const longitude = data.get("longitude");

      if (!name || !latitude || !longitude) {
        return;
      }

      const place = {
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };

      if (Number.isNaN(place.latitude) || Number.isNaN(place.longitude)) {
        return;
      }

      L.marker([place.latitude, place.longitude]).addTo(map).bindPopup(place.name);
      places.add(place);

      e.target.reset();
    } catch (e) {
      console.error(e);
      alert("Jotain aivan kauheaa tapahtui paikan tallennuksessa!");
    }
  });
} catch (e) {
  console.error(e);
  alert("Iik iik! Joku meni vikaan!!1!");
}
