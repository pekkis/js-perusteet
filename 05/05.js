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

// TODO
