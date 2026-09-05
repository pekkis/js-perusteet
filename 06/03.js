/*
Luo web-sivu, joka näyttää golfkenttiä kartalla.

Kuvat: ex0603a.png (kaikki markkerit), ex0603b.png (klusterit)

Vaatimuksia:
- Golfkenttien tiedot ladataan JSON-tiedostosta courses.json (valmiina,
  haettu tehtävänannon linkistä). 49 kenttää.
- Klikattaessa kentän markkeria näytetään kentän tietoja kuvaruutukaappausten
  mukaisesti: nimi, osoite, puhelin, sähköposti, verkkosivu ja kuvausteksti.
- Markkerit tulee ryhmitellä klustereiksi, koska kaikki kerralla näkyvissä
  tekee kartasta sotkuisen.

JSON-rakenne (yksi kenttä):

  {
    "type": "Kulta",
    "lat": 62.2653926,
    "lng": 22.6415612,
    "course": "Alastaro Golf",
    "address": "Golfkentäntie 195, 32560 Virttaa",
    "phone": "(02) 724 7824",
    "email": "minna.nenonen@alastarogolf.fi",
    "web": "http://alastarogolf.fi/",
    "image": "kuvat/kulta.jpg",
    "text": "Alastaro Golfin ..."
  }

HUOM. image-kentät viittaavat kuviin joita tehtävänannossa ei jaeta.
Popupissa voi näyttää muut kentät ja jättää kuvan pois, tai käyttää omia.

Klusterointi tulee leaflet.markercluster-kirjastosta, joka on jo kytketty
import mapiin ja jonka tyylit ladataan HTML:ssä:

  import "leaflet.markercluster";           // laajentaa L-oliota
  const cluster = L.markerClusterGroup();
  cluster.addLayer(L.marker([c.lat, c.lng]).bindPopup(...));
  map.addLayer(cluster);

Popupin sisällön voi rakentaa htl:llä (bindPopup ottaa vastaan DOM-solmun).
*/

import L from "leaflet";
import "leaflet.markercluster";
import { html } from "htl";

// TODO
