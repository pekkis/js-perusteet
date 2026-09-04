/*
Luo web-sivu, joka animoi liikkuvia palloja. Luei ensin animaation
tuottamisen perusteet JavaScriptin ja DOM:n avulla alla olevilta sivuilta:

JavaScript HTML DOM Animation.
JavaScript animations
Vaatimukset

Luo Ball-luokka, joka pitää sisällään pallon ominaisuudet ja liikkuvan pallon.
Luo ensin sovellus, joka siirtää yhtä palloa:

Luo lopuksi useita (esimerkiksi 100) palloja liikkumaan näytölle oheisen videon mukaisesti:

*/

class Ball {
  #position = {
    x: 0,
    y: 0,
  };

  #delta = {
    x: 0.4,
    y: 0.4,
  };

  #size;

  #elm;

  constructor(container, x, y) {
    this.#position = {
      x,
      y,
    };

    const speed = 0.1 + Math.random() * 0.4;
    const angle = Math.random() * 2 * Math.PI;

    this.#delta = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };

    this.#elm = document.createElement("div");
    this.#elm.classList.add("ball");

    const hue = Math.floor(Math.random() * 360);
    this.#elm.style.backgroundColor = `hsl(${hue} 70% 45%)`;
    this.#elm.style.transform = `translate(${this.#position.x}px, ${this.#position.y}px)`;

    container.appendChild(this.#elm);

    this.#size = this.#elm.offsetWidth;
  }

  advance(millis, bounds) {
    let x = this.#position.x + millis * this.#delta.x;
    let y = this.#position.y + millis * this.#delta.y;

    const maxX = bounds.width - this.#size;
    const maxY = bounds.height - this.#size;

    if (x < 0) {
      x = 0;
      this.#delta = { ...this.#delta, x: -this.#delta.x };
    } else if (x > maxX) {
      x = maxX;
      this.#delta = { ...this.#delta, x: -this.#delta.x };
    }

    if (y < 0) {
      y = 0;
      this.#delta = { ...this.#delta, y: -this.#delta.y };
    } else if (y > maxY) {
      y = maxY;
      this.#delta = { ...this.#delta, y: -this.#delta.y };
    }

    this.#position = { x, y };

    this.#elm.style.transform = `translate(${this.#position.x}px, ${this.#position.y}px)`;
  }
}

const container = document.getElementById("container");

const numberOfBalleros = 100;
const balleros = [];

for (let x = 1; x <= numberOfBalleros; x = x + 1) {
  const coordX = Math.random() * container.clientWidth;
  const coordY = Math.random() * container.clientHeight;

  const bolle = new Ball(container, coordX, coordY);
  balleros.push(bolle);
}

let previous = null;

const frame = (timestamp) => {
  if (previous !== null) {
    const millis = timestamp - previous;
    const bounds = { width: container.clientWidth, height: container.clientHeight };

    balleros.forEach((ballero) => {
      ballero.advance(Math.min(millis, 32), bounds);
    });
  }
  previous = timestamp;
  requestAnimationFrame(frame);
};
requestAnimationFrame(frame);
