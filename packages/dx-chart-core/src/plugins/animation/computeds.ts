import { GetAnimationStyleFn, Point, buildAnimatedStyleGetterFn } from '../../types';

const ANIMATIONS = Symbol('animation');

const addKeyframe = (name: string, def: string): void => {
  if (typeof document === 'undefined') {
    return;
  }
  const head = document.getElementsByTagName('head')[0];
  let style: any = Array.from(head.getElementsByTagName('style'))
  .find((node: any) => node.dataset[ANIMATIONS]);
  if (!style) {
    style = document.createElement('style');
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

const getDefaultPieAnimationOptions = ({ index }: Point) => `${0.7 + index * 0.1}s`;

export const getAreaAnimationStyle: GetAnimationStyleFn = (scales) => {
  const animationStyle = {
    transformOrigin: `0px ${scales.yScale.copy().clamp(true)(0)}px`,
  };
  const options = getDefaultAreaAnimationOptions();
  return {
    animation: `${getAreaAnimationName()} ${options}`,
    ...animationStyle,
  };
};

export const getPieAnimationStyle: GetAnimationStyleFn = (_, point) => {
  const options = getDefaultPieAnimationOptions(point);
  return {
    animation: `${getPieAnimationName()} ${options}`,
  };
};

export const getScatterAnimationStyle = () => {
  const options = getDefaultAreaAnimationOptions();
  return {
    animation: `${getScatterAnimationName()} ${options}`,
  };
};

export const buildAnimatedStyleGetter: buildAnimatedStyleGetterFn = (
  style, getAnimationStyle, scales, point,
) => {
  const animationStyle = getAnimationStyle(scales, point);
  return {
    ...animationStyle,
    ...style,
  };
};
