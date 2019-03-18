import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import { adjustBounds, getBounds, getValueScaleName,
  offsetCoordinates, getDeltaForTouches } from './computeds';

describe('Zoom and Pan', () => {

  const singleScale = jest.fn(value => value);
  (singleScale as any).invert = jest.fn(value => value);
  (singleScale as any).domain = jest.fn(() => [5, 30]);
  const scales = { [ARGUMENT_DOMAIN]: singleScale, [VALUE_DOMAIN]: singleScale };
  const viewport = { argumentBounds: [10, 15], valueBounds: [20, 25] };

  it('should return coordinates with offset', () => {
    expect(offsetCoordinates({ x: 10, y: 15 }, [2, 4])).toEqual({ x: 8, y: 11 });
  });

  it('should return delta for touches', () => {
    expect(getDeltaForTouches(4, 5)).toBeCloseTo(6.4);
  });

  it('should return scale name for value axis, scale name is specify', () => {
    expect(getValueScaleName({ scaleName: 'custom scale' })).toBe('custom scale');
  });

  it('should return scale name for value axis, scale name is not specify', () => {
    expect(getValueScaleName({ })).toBe(VALUE_DOMAIN);
  });

  it('should return bounds on zoom, argument scale', () => {
    expect(getBounds(singleScale as any, [33, 44], 2, ARGUMENT_DOMAIN, 'zoom')).toEqual([35, 42]);
  });

  it('should return bounds on pan, argument scale', () => {
    expect(getBounds(singleScale as any, [33, 44], 2, ARGUMENT_DOMAIN, 'pan')).toEqual([31, 42]);
  });

  it('should return bounds on zoom, value scale', () => {
    expect(getBounds(singleScale as any,  [44, 33], 2, VALUE_DOMAIN, 'zoom')).toEqual([42, 35]);
  });

  it('should return prev bounds, viewport is undefined', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, false, 'zoom', jest.fn(), 0))
    .toEqual([5, 30]);
  });

  it('should return prev bounds, viewport is defined, argument scale', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, false, 'zoom', jest.fn(), 0, viewport))
    .toEqual([10, 15]);
  });

  it('should return prev bounds, viewport is defined, value scale', () => {
    expect(adjustBounds(VALUE_DOMAIN, scales as any, false, 'zoom', jest.fn(), 0, viewport))
    .toEqual([20, 25]);
  });

  it('should return current bounds', () => {
    const mock = jest.fn(() => [6, 11]);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, true, 'zoom',
      mock, 2, { argumentBounds: [10, 20] })).toEqual([6, 11]);

    expect(mock).toBeCalledWith(scales[ARGUMENT_DOMAIN], [10, 20], 2, ARGUMENT_DOMAIN, 'zoom');
  });

  it('should return initial scale bounds, current bounds > scale domain', () => {
    const mock = jest.fn(() => [0, 35]);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, true, 'zoom',
      mock, 2, { argumentBounds: [10, 20] })).toEqual([5, 30]);

    expect(mock).toBeCalledWith(scales[ARGUMENT_DOMAIN], [10, 20], 2, ARGUMENT_DOMAIN, 'zoom');
  });

  it('should return prev bounds, current bounds is too small', () => {
    const mock = jest.fn(() => [10, 10.1]);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, true, 'zoom',
      mock, 2, { argumentBounds: [10, 20] })).toEqual([10, 20]);

    expect(mock).toBeCalledWith(scales[ARGUMENT_DOMAIN], [10, 20], 2, ARGUMENT_DOMAIN, 'zoom');
  });

  it('should return prev bounds, current bounds is out when user scrolling', () => {
    const mock = jest.fn(() => [25, 50]);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, true, 'pan',
      mock, 2, { argumentBounds: [10, 20] })).toEqual([10, 20]);

    expect(mock).toBeCalledWith(scales[ARGUMENT_DOMAIN], [10, 20], 2, ARGUMENT_DOMAIN, 'pan');
  });
});

describe('Zoom and Pan for categories', () => {
  const singleScale = jest.fn(value => value);
  (singleScale as any).domain = jest.fn(() => ['cat1', 'cat2', 'cat3', 'cat4', 'cat5']);
  (singleScale as any).bandwidth = jest.fn();
  const scales = { [ARGUMENT_DOMAIN]: singleScale, [VALUE_DOMAIN]: singleScale };
  const viewport = { argumentBounds: [10, 15], valueBounds: [20, 25] };

  it('should return bounds, zoom', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, true, 'zoom',
    jest.fn(), 32)).toEqual(['cat2', 'cat4']);
  });

  it('should return prev bounds if one categories, zoom', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, true, 'zoom',
    jest.fn(), 32, { argumentBounds: ['cat2', 'cat2'] })).toEqual(['cat2', 'cat2']);
  });

  it('should return bounds if one categories, unzoom', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, true, 'zoom',
    jest.fn(), -32, { argumentBounds: ['cat2', 'cat2'] })).toEqual(['cat1', 'cat3']);
  });

  it('should return initial bounds, unzoom', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, true, 'zoom',
      jest.fn(), -32)).toEqual(['cat1', 'cat5']);
  });

  it('should return bounds, pan', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, true, 'pan',
      jest.fn(), 32, { argumentBounds: ['cat2', 'cat4'] })).toEqual(['cat1', 'cat3']);
  });

  it('should return prev bounds if bounds is out, pan', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, true, 'pan',
      jest.fn(), 32, { argumentBounds: ['cat1', 'cat2'] })).toEqual(['cat1', 'cat2']);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, true, 'pan',
      jest.fn(), -32, { argumentBounds: ['cat3', 'cat5'] })).toEqual(['cat3', 'cat5']);
  });
});
