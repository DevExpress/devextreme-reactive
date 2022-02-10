/* globals document:true */

const cache = {};
let sandboxElement = null;

const getBrowserStyles = () => {
  sandboxElement = sandboxElement || document.createElement('test');

  return sandboxElement.style;
};

const findOutValidPropertyValue = (property, value) => {
  const prop = `${property}:`;
  const style = getBrowserStyles();

  style.cssText = `${prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join(`${value};${prop}`) + value};`;

  return style[property];
};

const getValidPropertyValue = (property, value) => {
  const isServerRender = typeof document === 'undefined';

  if (isServerRender) {
    return undefined;
  }

  if (!(value in cache)) {
    cache[value] = findOutValidPropertyValue(property, value);
  }

  return cache[value];
};

export const getStickyPosition = () => getValidPropertyValue('position', 'sticky');

export const getStickyStyles = ({ stickyPosition, backgroundColor }) => ({
  position: stickyPosition,
  backgroundColor,
  zIndex: 500,
});
