/**
 * Luo elementin turvallisesti: merkkijonot menevät tekstisolmuiksi, eivät HTML:ksi.
 *
 * @param {string} type
 * @param {{ className?: string }} [options]
 * @returns {(...nodes: (Node | string | number)[]) => HTMLElement}
 */
export const elm = (type, options = {}) => {
  return (...nodes) => {
    const element = document.createElement(type);

    if (options.className) {
      element.className = options.className;
    }

    element.append(...nodes);
    return element;
  };
};

export const temporalGate = () => {
  // Tämän luvun tehtävät käyttävät Temporal-APIa, eivät Date-rajapintaa.
  if (typeof Temporal === "undefined") {
    alert("⚠️ Tämä selain ei tue Temporal-APIa - tehtävä ei toimi.");
  }
};

/**
 * Yksinkertainen signaali: arvo, jota voi kuunnella.
 *
 * `set` ottaa vastaan funktion, joka saa nykyisen arvon ja palauttaa uuden.
 * Näin päivitys on aina puhdas eikä paikallaan muokkaamiselle jää tilaa:
 *
 *     todos.set((current) => [...current, uusi]);
 *
 * Muutos tunnistetaan viite-identiteetillä (Object.is), joten uuden arvon on
 * oltava uusi viite. Sama viite takaisin palautettuna ei ilmoita kenellekään -
 * se on tapa perua päivitys.
 *
 * @template T
 * @param {T} initialValue
 * @returns {{
 *   get: () => T,
 *   set: (updater: (current: T) => T) => void,
 *   subscribe: (fn: (value: T) => void) => () => void,
 * }}
 */
export const signal = (initialValue) => {
  let value = initialValue;
  const listeners = new Set();

  return {
    get() {
      return value;
    },
    set(updater) {
      const newValue = updater(value);

      if (!Object.is(value, newValue)) {
        value = newValue;
        listeners.forEach((fn) => fn(value));
      }
    },
    subscribe(fn) {
      listeners.add(fn);
      fn(value);
      return () => listeners.delete(fn);
    },
  };
};
