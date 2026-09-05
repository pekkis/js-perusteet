/*
Luo web-sivu, joka hakee Bitcoinin arvon CryptoComparesta.

Kuva: ex0503.png

URL:
https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=EUR

Palvelin lähettää datan JSON-muodossa:
{
  "BTC": {
    "EUR": 89476.11
  }
}

OBS! Opettajan antama rajapinta ei toimi enää, vaatii api-avaimen, joten
korvasin sen toisella vastaavalla.

*/

import { fetcher } from "../functions.js";

const currencyFormatter = new Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
});

const dateFormatter = new Intl.DateTimeFormat("fi-FI", {
  dateStyle: "medium",
});

async function getBitcoinValue() {
  const result = await fetcher("https://api.coinbase.com/v2/prices/BTC-EUR/spot");

  return result.data.amount;
}

document.getElementById("fetch").addEventListener("click", async () => {
  try {
    const todaysBitcoinValue = await getBitcoinValue();
    const formattedCurrency = currencyFormatter.format(todaysBitcoinValue);

    const now = Date.now();
    const formattedNow = dateFormatter.format(now);

    document.getElementById("result").replaceChildren(formattedNow, ": ", formattedCurrency);
  } catch (e) {
    console.error(e);
    alert("Jotain meni pahasti vikaan!");
  }
});
