const ANIMATIONS = Symbol('animation');

const addKeyframe = (name, def) => {
  if (typeof document === 'undefined') {
    return;
  }
  const head = document.getElementsByTagName('head')[0]; // eslint-disable-line no-undef
  let style = Array.from(head.getElementsByTagName('style'))
    .find(node => node.dataset[ANIMATIONS]);
  if (!style) {
    style = document.createElement('style'); // eslint-disable-line no-undef
    style.type = 'text/css';
    style.dataset[ANIMATIONS] = true;
    head.appendChild(style);
  }
  const content = style.textContent;
  if (!content.includes(name)) {
    style.textContent += `\n@keyframes ${name} ${def}\n`;
  }
};

const getAreaAnimationName = () => {
  const name = 'animation_transform';
  addKeyframe(name, '{ from { transform: scaleY(0); } }');
  return name;
};

const getScatterAnimationName = () => {
  const name = 'animation_scatter';
  addKeyframe(name, '{ 0% { opacity: 0; } 50% { opacity: 0; } 100% { opacity: 1 } }');
  return name;
};

const getPieAnimationName = () => {
  const name = 'animation_pie';
  addKeyframe(name, '{ from { transform: scale(0); } }');
  return name;
};

const getDefaultAreaAnimationOptions = () => '1s';

const getDefaultPieAnimationOptions = ({ index }) => `${(index + 1) * 0.2}s`;

export const getAreaAnimationStyle = (scales, getCustomAnimationOptions, point, seriesName) => {
  const animationStyle = {
    transformOrigin: `0px ${scales.yScale.copy().clamp(true)(0)}px`,
  };
  const options = (getCustomAnimationOptions || getDefaultAreaAnimationOptions)(point, seriesName);
  return {
    animation: `${getAreaAnimationName()} ${options}`,
    ...animationStyle,
  };
};

export const getPieAnimationStyle = (scales, getCustomAnimationOptions, point, seriesName) => {
  const options = (getCustomAnimationOptions || getDefaultPieAnimationOptions)(point, seriesName);
  return {
    animation: `${getPieAnimationName()} ${options}`,
  };
};

export const getScatterAnimationStyle = (scales, getCustomAnimationOptions, point, seriesName) => {
  const options = (getCustomAnimationOptions || getDefaultAreaAnimationOptions)(point, seriesName);
  return {
    animation: `${getScatterAnimationName()} ${options}`,
  };
};

export const buildAnimatedStyleGetter = getCustomAnimationOptions => (
  style, getAnimationStyle, scales, point, seriesName,
) => {
  const animationStyle = getAnimationStyle(scales, getCustomAnimationOptions, point, seriesName);
  return {
    ...style,
    ...animationStyle,
  };
};
