/*
Tutustu Chuck Norris APIin (https://api.chucknorris.io/) ja luo websivu, joka
näyttää satunnaisen Chuck Norris -faktan, kun painiketta napsautetaan.

Kuva: ex0502.png

Satunnainen fakta: https://api.chucknorris.io/jokes/random
Vastaus on JSON, jossa fakta on kentässä "value".
*/

import { fetcher } from "../functions.js";

async function getJoke() {
  try {
    const joke = await fetcher("https://api.chucknorris.io/jokes/random");
    return joke;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

document.getElementById("chuck").addEventListener("click", async () => {
  try {
    const joke = await getJoke();
    document.getElementById("joke").replaceChildren(joke.value);
  } catch {
    alert("Vitsiä ei saatu haettua. Iso kyynel!");
  }
});
