import { GetAnimationStyleFn, BuildAnimatedStyleGetterFn, Point } from '../../types';

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

const getAreaAnimationName = (rotated: boolean) => {
  const name = 'animation_transform';
  const attr = rotated ? 'scaleX' : 'scaleY';
  addKeyframe(name, `{ from { transform: ${attr}(0); } }`);
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

const getDefaultScatterAnimationOptions = () => '1.6s';

/** @internal */
export const getAreaAnimationStyle: GetAnimationStyleFn = (rotated, { xScale, yScale }) => {
  const x = rotated ? xScale.copy().clamp!(true)(0) : 0;
  const y = rotated ? 0 : yScale.copy().clamp!(true)(0);
  const animationStyle = {
    transformOrigin: `${x}px ${y}px`,
  };
  const options = getDefaultAreaAnimationOptions();
  return {
    animation: `${getAreaAnimationName(rotated)} ${options}`,
    ...animationStyle,
  };
};

/** @internal */
export const getPieAnimationStyle: GetAnimationStyleFn = (r, s, point) => {
  const options = getDefaultPieAnimationOptions(point!);
  return {
    animation: `${getPieAnimationName()} ${options}`,
  };
};

/** @internal */
export const getScatterAnimationStyle: GetAnimationStyleFn = () => {
  const options = getDefaultScatterAnimationOptions();
  return {
    animation: `${getScatterAnimationName()} ${options}`,
  };
};

/** @internal */
export const buildAnimatedStyleGetter: BuildAnimatedStyleGetterFn = rotated => (
  style, getAnimationStyle, scales, point,
) => {
  const animationStyle = getAnimationStyle(rotated, scales, point);
  return {
    ...animationStyle,
    ...style,
  };
};

/** @internal */
export const buildAnimation = (
  startCoords, { x: endX, y: endY }, scales, rotated, setState, animationID,
) => {
  if (animationID) {
    cancelAnimationFrame(animationID);
  }
  let startX;
  let startY;
  if (!startCoords) {
    startX = rotated ? scales.xScale.copy().clamp!(true)(0) : endX;
    startY = rotated ? endY : scales.yScale.copy().clamp!(true)(0);
  } else {
    startX = startCoords.x;
    startY = startCoords.y;
  }
  const getProgress = ({ elapsed, total }) => Math.min(elapsed / total, 1);
  const time = {
    start: performance.now(),
    total: 1000,
    elapsed: 0,
  };

  const tick = (now) => {
    time.elapsed = now - time.start;
    const progress = getProgress(time);
    const x = progress * (endX - startX);
    const y = progress * (endY - startY);

    setState(startX + x, startY + y);

    if (progress < 1) requestAnimationFrame(tick);
  };

  const animationId = requestAnimationFrame(tick);
  return animationId;
};
