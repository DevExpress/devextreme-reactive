import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  NumberArray,
  ViewportOptions,
  ScaleObject,
  Coordinates,
} from '../../types';

const getCorrectRange = (range: NumberArray, name: string): any => {
  return name !== ARGUMENT_DOMAIN ? range.reverse() : range;
};

const zoom = (from: number, to: number, delta: number, sign: number): NumberArray => {
  return [from + delta * sign, to - delta * sign];
};

const pan = (from: number, to: number, delta: number, sign: number): NumberArray => {
  return [from - delta * sign, to - delta * sign];
};

export const getValueScaleName = (viewport?: ViewportOptions) =>
viewport && viewport.scaleName || VALUE_DOMAIN;

/** @internal */
export const adjustBounds = (scale: ScaleObject, range: NumberArray,
  prevBounds: NumberArray, type: string) => {
  const initialBounds = scale.domain();
  const minDelta = (initialBounds[1] - initialBounds[0]) * 0.01;
  const value1 = scale.invert(range[0]);
  const value2 = scale.invert(range[1]);

  if ((value2 - value1 < minDelta) ||
  (type === 'pan' && (value1 < initialBounds[0] || value2 > initialBounds[1]))) {
    return prevBounds;
  }
  return [
    value1 < initialBounds[0] ? initialBounds[0] : value1,
    value2 > initialBounds[1] ? initialBounds[1] : value2,
  ];
};

export const getPrevBounds = (
  name: string,
  scale: ScaleObject,
  viewport?: ViewportOptions,
): any => {
  return viewport ? (name === ARGUMENT_DOMAIN ?
    viewport.argumentBounds :
    viewport.valueBounds) : scale.domain();
};

export const getBounds = (name: string, scales: ScaleObject,
  delta: number, type: string, viewport?: ViewportOptions) => {
  const func = type === 'zoom' ? zoom : pan;
  const scale = scales[name];
  const bounds = getPrevBounds(name, scale, viewport);
  const [from, to] = getCorrectRange([
    scale(bounds![0]),
    scale(bounds![1]),
  ], name);
  const sign = to - from > 0 ? +1 : -1;
  return adjustBounds(
    scale,
    getCorrectRange(func(from, to, delta, sign), name),
    bounds,
    type,
  );
};

export const offsetCoordinates = (coordinates: Coordinates, offset: NumberArray) => {
  return {
    x: coordinates.x - offset[0],
    y: coordinates.y - offset[1],
  };
};

export const getDeltaForTouches = (deltaX: number, deltaY: number) => {
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
};
