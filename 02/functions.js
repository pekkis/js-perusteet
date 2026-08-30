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
