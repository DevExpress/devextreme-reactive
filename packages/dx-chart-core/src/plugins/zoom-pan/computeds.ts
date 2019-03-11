import {
  ARGUMENT_DOMAIN,
} from '@devexpress/dx-chart-core';

const getCorrectRange = (range, name) => {
  return name !== ARGUMENT_DOMAIN ? range.reverse() : range;
};

export const adjustBounds = (scale, range, prevBounds) => {
  const initialBounds = (scale as any).domain();
  const minDelta = (initialBounds[1] - initialBounds[0]) * 0.01;
  const value1 = scale.invert(range[0]);
  const value2 = scale.invert(range[1]);
  if (value2 - value1 < minDelta) {
    return prevBounds;
  }
  return [
    value1 < initialBounds[0] ? initialBounds[0] : value1,
    value2 > initialBounds[1] ? initialBounds[1] : value2,
  ];
};

export const zoom = (from, to, delta, sign) => {
  return [from + delta * sign, to - delta * sign];
};

export const pan = (from, to, delta, sign) => {
  return [from - delta * sign, to - delta * sign];
};

export const getPrevBounds = (name, viewport, scale) => {
  return viewport ? (name === ARGUMENT_DOMAIN ?
    viewport.argumentBounds :
    viewport.valueBounds) : scale.domain();
};

export const getBounds = (name, scales, viewport, delta, func) => {
  const scale = scales[name];
  const bounds = getPrevBounds(name, viewport, scale);
  const [from, to] = getCorrectRange([
    scale(bounds![0]),
    scale(bounds![1]),
  ], name);
  const sign = to - from > 0 ? +1 : -1;
  return adjustBounds(
    scale,
    getCorrectRange(func(from, to, delta, sign), name),
    bounds,
  );
};

export const isCoords = (coords) => {
  if (!coords) {
    return false;
  }
  return true;
};

export const offsetCoordinates = (coordinates, offset) => {
  return {
    x: coordinates.x - offset[0],
    y: coordinates.y - offset[1],
  };
};

export const getDeltaForTouches = (deltaX, deltaY) => {
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
};
