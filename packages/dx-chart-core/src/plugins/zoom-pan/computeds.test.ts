import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import { adjustBounds, getPrevBounds, getBounds, getValueScaleName,
  offsetCoordinates, getDeltaForTouches } from './computeds';

describe('Zoom and Pan', () => {

  const singleScale = jest.fn(value => value);
  (singleScale as any).invert = jest.fn(value => value);
  (singleScale as any).domain = jest.fn(() => [5, 30]);
  const scales = { [ARGUMENT_DOMAIN]: singleScale, [VALUE_DOMAIN]: singleScale };
  const viewport = { argumentBounds: [10, 15], valueBounds: [20, 25] };

  it('should return prev bounds, viewport is undefined', () => {
    expect(getPrevBounds(ARGUMENT_DOMAIN, undefined, { domain: jest.fn(() => 5) } as any)).toBe(5);
  });

  it('should return prev bounds, viewport is defined', () => {
    expect(getPrevBounds(ARGUMENT_DOMAIN,
      viewport as any,
      { domain: jest.fn(() => [5, 10]) } as any))
      .toEqual([10, 15]);
  });

  it('should return prev bounds, is not argument domain', () => {
    expect(getPrevBounds('scale name',
    viewport as any,
      { domain: jest.fn(() => [5, 10]) } as any))
      .toEqual([20, 25]);
  });

  it('should return coordinates with offset', () => {
    expect(offsetCoordinates({ x: 10, y: 15 }, [2, 4])).toEqual({ x: 8, y: 11 });
  });

  it('should return delta for touches', () => {
    expect(getDeltaForTouches(4, 5)).toBeCloseTo(6.4);
  });

  it('should return bounds on zoom, argument scale', () => {
    expect(getBounds(ARGUMENT_DOMAIN, scales as any, 2, 'zoom', viewport as any)).toEqual([12, 13]);
  });

  it('should return bounds on pan, argument scale', () => {
    expect(getBounds(ARGUMENT_DOMAIN, scales as any, 2, 'pan', viewport as any)).toEqual([8, 13]);
  });

  it('should return bounds on zoom, value scale', () => {
    expect(getBounds(VALUE_DOMAIN, scales as any, 2, 'zoom', viewport as any)).toEqual([22, 23]);
  });

  it('should return scale bounds, viewport min and max > scale domain', () => {
    expect(adjustBounds(singleScale as any, [1, 35], [15, 25], 'zoom')).toEqual([5, 30]);
  });

  it('should return prev bounds, viewport is too small', () => {
    expect(adjustBounds(singleScale as any, [10, 10.1], [15, 25], 'zoom')).toEqual([15, 25]);
  });

  it('should return prev bounds, viewport is outwhen user scrolling', () => {
    expect(adjustBounds(singleScale as any, [4, 12], [15, 25], 'pan')).toEqual([15, 25]);
  });

  it('should return scale name for value axis, scale name is specify', () => {
    expect(getValueScaleName({ scaleName: 'custom scale' })).toBe('custom scale');
  });

  it('should return scale name for value axis, scale name is not specify', () => {
    expect(getValueScaleName({ })).toBe(VALUE_DOMAIN);
  });
});
