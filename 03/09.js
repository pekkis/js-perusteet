class Elevator {
  #listeners = [];

  #floor = 1;

  #display = "";

  #maxFloor = 100;

  #error = null;

  #errorTimeout = null;

  #status = {};

  constructor(floor, maxFloor) {
    this.#floor = floor;
    this.#maxFloor = maxFloor;

    this.#status = {
      kind: "static",
      floor: this.#floor,
    };
  }

  get info() {
    if (this.#status.kind === "static") {
      return `Elevator is now in floor: ${this.#floor}`;
    }

    return `Elevator is now going to floor: ${this.#status.destination}`;
  }

  error(msg) {
    clearTimeout(this.#errorTimeout);
    this.#error = msg;
    this.#update();

    this.#errorTimeout = setTimeout(() => {
      this.#error = null;
      this.#update();
    }, 2000);
  }

  go() {
    if (this.#status.kind === "moving") {
      this.error("Elevator is moving");
      return;
    }

    if (!this.#display) {
      return;
    }

    const destination = parseInt(this.#display, 10);

    if (destination === this.#floor) {
      this.#display = "";
      this.#update();
      return;
    }

    if (destination > this.#maxFloor) {
      this.error(`Can not go to floor ${destination}`);
      return;
    }

    this.#display = "";
    this.#error = "";
    this.#status = {
      kind: "moving",
      destination,
    };
    this.#update();

    setTimeout(() => {
      this.#floor = destination;
      this.#status = {
        kind: "static",
        floor: destination,
      };
      this.#error = null;
      this.#update();
    }, 5000);
  }

  #update() {
    const state = {
      error: this.#error,
      floor: this.#floor,
      status: this.#status,
      display: this.#display,
      info: this.info,
    };

    this.#listeners.forEach((listener) => {
      listener(state);
    });
  }

  subscribe(fn) {
    this.#listeners.push(fn);
    this.#update();
  }

  clearDisplay() {
    this.#display = "";
    this.#update();
  }

  addToDisplay(number) {
    if (this.#display.length >= 10) {
      return;
    }

    if (number === "0" && this.#display === "") {
      return;
    }

    this.#display += number;

    this.#update();
  }
}

const elevator = new Elevator(1, 100);

elevator.subscribe((state) => {
  const display = document.getElementById("display");

  const isError = state.error;

  display.classList.toggle("display-error", isError);

  const contents = isError ? state.error : state.display;

  display.replaceChildren(contents ? contents : "\u00A0");

  const info = document.getElementById("info");
  info.replaceChildren(state.info);
});

document.querySelectorAll("button[data-number]").forEach((element) => {
  element.addEventListener("click", (e) => {
    const target = e.target;
    const number = target.dataset.number;
    elevator.addToDisplay(number);
  });
});

document.querySelector("button[data-action=clear]").addEventListener("click", () => {
  elevator.clearDisplay();
});

document.querySelector("button[data-action=go]").addEventListener("click", () => {
  elevator.go();
});
