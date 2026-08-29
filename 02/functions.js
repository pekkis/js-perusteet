export const elm = (type) => {
  return (...nodes) => {
    const element = document.createElement(type);
    element.append(...nodes);
    return element;
  };
};
