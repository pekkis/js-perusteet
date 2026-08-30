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
