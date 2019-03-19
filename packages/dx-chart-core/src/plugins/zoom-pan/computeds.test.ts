import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  getValueDomainName, makeScale, scaleBounds,
} from '../../utils/scale';
import { adjustBounds, getBounds, getValueScaleName, checkDragToZoom,
  offsetCoordinates, getDeltaForTouches, adjustLayout } from './computeds';

jest.mock('../../utils/scale', () => ({
  getValueDomainName: jest.fn(),
  makeScale: jest.fn(),
  scaleBounds: jest.fn(),
}));

describe('Viewport', () => {
  const matchFloat = expected => ({
    $$typeof: Symbol.for('jest.asymmetricMatcher'),

    asymmetricMatch: actual => Math.abs(actual - expected) < 0.01,

    toAsymmetricMatcher: () => `~${expected}`,
  });

  describe('adjustLayout', () => {
    afterEach(jest.clearAllMocks);

    it('should return original ranges', () => {
      const ranges = { tag: 'test-ranges' };

      const result = adjustLayout('test-domains' as any, ranges as any, {});

      expect(result).toBe(ranges);
    });

    it('should change only argument range', () => {
      (makeScale as jest.Mock).mockReturnValueOnce('test-scale');
      (scaleBounds as jest.Mock).mockReturnValueOnce([20, 50]);

      const result = adjustLayout({
        [ARGUMENT_DOMAIN]: 'test-domain',
      } as any, {
        [ARGUMENT_DOMAIN]: [0, 100],
        [VALUE_DOMAIN]: 'test-range',
      } as any, {
        argumentStart: 'test-start-arg',
        argumentEnd: 'test-end-arg',
      } as any);

      expect(result).toEqual({
        [ARGUMENT_DOMAIN]: [matchFloat(-66.67), matchFloat(266.67)],
        [VALUE_DOMAIN]: 'test-range',
      });
      expect(makeScale).toBeCalledWith('test-domain', [0, 100]);
      expect(scaleBounds).toBeCalledWith('test-scale', ['test-start-arg', 'test-end-arg']);
    });

    it('should change only value range', () => {
      (makeScale as jest.Mock).mockReturnValueOnce('test-scale');
      (scaleBounds as jest.Mock).mockReturnValueOnce([20, 50]);
      (getValueDomainName as jest.Mock).mockReturnValueOnce('domain-1');

      const result = adjustLayout({
        'domain-1': 'test-domain',
      } as any, {
        [ARGUMENT_DOMAIN]: 'test-range',
        [VALUE_DOMAIN]: [0, 100],
      } as any, {
        scaleName: 'scale-1',
        valueStart: 'test-start-val',
        valueEnd: 'test-end-val',
      } as any);

      expect(result).toEqual({
        [ARGUMENT_DOMAIN]: 'test-range',
        [VALUE_DOMAIN]: [matchFloat(-66.67), matchFloat(266.67)],
      });
      expect(makeScale).toBeCalledWith('test-domain', [0, 100]);
      expect(scaleBounds).toBeCalledWith('test-scale', ['test-start-val', 'test-end-val']);
      expect(getValueDomainName).toBeCalledWith('scale-1');
    });

    it('should change both ranges', () => {
      (makeScale as jest.Mock).mockReturnValueOnce('test-arg-scale');
      (makeScale as jest.Mock).mockReturnValueOnce('test-val-scale');
      (scaleBounds as jest.Mock).mockReturnValueOnce([250, 350]);
      (scaleBounds as jest.Mock).mockReturnValueOnce([70, 120]);
      (getValueDomainName as jest.Mock).mockReturnValueOnce('domain-1');

      const result = adjustLayout({
        [ARGUMENT_DOMAIN]: 'test-arg-domain',
        'domain-1': 'test-val-domain',
      } as any, {
        [ARGUMENT_DOMAIN]: [200, 400],
        [VALUE_DOMAIN]: [50, 150],
      } as any, {
        argumentStart: 'test-start-arg',
        argumentEnd: 'test-end-arg',
        scaleName: 'scale-1',
        valueStart: 'test-start-val',
        valueEnd: 'test-end-val',
      } as any);

      expect(result).toEqual({
        [ARGUMENT_DOMAIN]: [matchFloat(100), matchFloat(500)],
        [VALUE_DOMAIN]: [matchFloat(10), matchFloat(210)],
      });
      expect((makeScale as jest.Mock).mock.calls).toEqual([
        ['test-arg-domain', [200, 400]],
        ['test-val-domain', [50, 150]],
      ]);
      expect((scaleBounds as jest.Mock).mock.calls).toEqual([
        ['test-arg-scale', ['test-start-arg', 'test-end-arg']],
        ['test-val-scale', ['test-start-val', 'test-end-val']],
      ]);
      expect(getValueDomainName).toBeCalledWith('scale-1');
    });

    it('should not change range if it is not actually changed', () => {
      (makeScale as jest.Mock).mockReturnValueOnce('test-scale');
      (scaleBounds as jest.Mock).mockReturnValueOnce([0, 100]);
      const ranges = {
        [ARGUMENT_DOMAIN]: [0, 100],
        [VALUE_DOMAIN]: 'test-range',
      };

      const result = adjustLayout({
        [ARGUMENT_DOMAIN]: 'test-domain',
      } as any, ranges as any, {
        argumentStart: 'test-start-arg',
        argumentEnd: 'test-end-arg',
      } as any);

      expect(result).toBe(ranges);
      expect(makeScale).toBeCalledWith('test-domain', [0, 100]);
      expect(scaleBounds).toBeCalledWith('test-scale', ['test-start-arg', 'test-end-arg']);
    });
  });
});

describe('Zoom and Pan', () => {
  const singleScale = jest.fn(value => value);
  (singleScale as any).invert = jest.fn(value => value);
  (singleScale as any).domain = jest.fn(() => [5, 30]);
  const scales = { [ARGUMENT_DOMAIN]: singleScale, [VALUE_DOMAIN]: singleScale };
  const viewport = {
    argumentStart: 10, argumentEnd: 15,
    valueStart: 20, valueEnd: 25,
  };

  it('should return coordinates with offset', () => {
    expect(offsetCoordinates({ x: 10, y: 15 }, [2, 4])).toEqual({ x: 8, y: 11 });
  });

  it('should return delta for touches', () => {
    expect(getDeltaForTouches([{ pageX: 20, pageY: 120 }, { pageX: 10, pageY: 110 }] as any[]))
    .toBeCloseTo(14.14);
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

  it('should return prev bounds, viewport is undefined, interaction is none', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'none', 'zoom', jest.fn(), 0))
    .toEqual([5, 30]);
  });

  it('should return prev bounds, viewport is defined, interaction is none or pan', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'none', 'zoom', jest.fn(), 0, viewport))
    .toEqual([10, 15]);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'pan', 'zoom', jest.fn(), 0, viewport))
    .toEqual([10, 15]);
  });

  it('should return prev bounds, viewport is defined, value scale', () => {
    expect(adjustBounds(VALUE_DOMAIN, scales as any, 'none', 'zoom', jest.fn(), 0, viewport))
    .toEqual([20, 25]);
  });

  it('should return current bounds, interaction is zoom', () => {
    const mock = jest.fn(() => [6, 11]);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'zoom', 'zoom',
      mock, 2, { argumentStart: 10, argumentEnd: 20 })).toEqual([6, 11]);

    expect(mock).toBeCalledWith(scales[ARGUMENT_DOMAIN], [10, 20], 2, ARGUMENT_DOMAIN, 'zoom');
  });

  it('should return current bounds, interaction is both', () => {
    const mock = jest.fn(() => [6, 11]);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'both', 'zoom',
      mock, 2, { argumentStart: 10, argumentEnd: 20 })).toEqual([6, 11]);

    expect(mock).toBeCalledWith(scales[ARGUMENT_DOMAIN], [10, 20], 2, ARGUMENT_DOMAIN, 'zoom');
  });

  it('should return initial scale bounds, current bounds > scale domain', () => {
    const mock = jest.fn(() => [0, 35]);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'zoom', 'zoom',
      mock, 2, { argumentStart: 10, argumentEnd: 20 })).toEqual([5, 30]);

    expect(mock).toBeCalledWith(scales[ARGUMENT_DOMAIN], [10, 20], 2, ARGUMENT_DOMAIN, 'zoom');
  });

  it('should return prev bounds, current bounds is too small', () => {
    const mock = jest.fn(() => [10, 10.1]);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'zoom', 'zoom',
      mock, 2, { argumentStart: 10, argumentEnd: 20 })).toEqual([10, 20]);

    expect(mock).toBeCalledWith(scales[ARGUMENT_DOMAIN], [10, 20], 2, ARGUMENT_DOMAIN, 'zoom');
  });

  it('should return prev bounds, current bounds is out when user scrolling', () => {
    const mock = jest.fn(() => [25, 50]);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'pan', 'pan',
      mock, 2, { argumentStart: 10, argumentEnd: 20 })).toEqual([10, 20]);

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
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'zoom', 'zoom',
    jest.fn(), 32)).toEqual(['cat2', 'cat4']);
  });

  it('should return prev bounds if one categories, zoom', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'zoom', 'zoom',
    jest.fn(), 32, { argumentStart: 'cat2', argumentEnd: 'cat2' })).toEqual(['cat2', 'cat2']);
  });

  it('should return bounds if one categories, unzoom', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'zoom', 'zoom',
    jest.fn(), -32, { argumentStart: 'cat2', argumentEnd: 'cat2' })).toEqual(['cat1', 'cat3']);
  });

  it('should return initial bounds, unzoom', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'zoom', 'zoom',
      jest.fn(), -32)).toEqual(['cat1', 'cat5']);
  });

  it('should return bounds, pan', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'pan', 'pan',
      jest.fn(), 32, { argumentStart: 'cat2', argumentEnd: 'cat4' })).toEqual(['cat1', 'cat3']);
  });

  it('should return prev bounds if bounds is out, pan', () => {
    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'pan', 'pan',
      jest.fn(), 32, { argumentStart: 'cat1', argumentEnd: 'cat2' })).toEqual(['cat1', 'cat2']);

    expect(adjustBounds(ARGUMENT_DOMAIN, scales as any, 'pan', 'pan',
      jest.fn(), -32, { argumentStart: 'cat3', argumentEnd: 'cat5' })).toEqual(['cat3', 'cat5']);
  });

  it('#checkDragToZoom', () => {
    expect(checkDragToZoom(false, 'shift', { shiftKey: true } as any)).toBeFalsy();
    expect(checkDragToZoom(true, 'shift', { shiftKey: true } as any)).toBeTruthy();
    expect(checkDragToZoom(true, 'shift', { shiftKey: false } as any)).toBeFalsy();
    expect(checkDragToZoom(true, 'alt', { altKey: true } as any)).toBeTruthy();
  });
});
