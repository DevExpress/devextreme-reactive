import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  getValueDomainName, makeScale, scaleBounds,
} from '../../utils/scale';
import {
  checkDragToZoom, offsetCoordinates, getDeltaForTouches, adjustLayout, getViewport,
} from './computeds';
import { scaleQuantize } from 'd3-scale';

jest.mock('../../utils/scale', () => ({
  getValueDomainName: jest.fn(),
  makeScale: jest.fn(),
  scaleBounds: jest.fn(),
}));

jest.mock('d3-scale', () => ({
  scaleQuantize: jest.fn(),
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

  it('#offsetCoordinates', () => {
    expect(offsetCoordinates({ x: 10, y: 15 }, [2, 4])).toEqual({ x: 8, y: 11 });
  });

  it('#getDeltaForTouches', () => {
    expect(getDeltaForTouches([{ pageX: 20, pageY: 120 }, { pageX: 10, pageY: 110 }] as any[]))
    .toBeCloseTo(14.14);
  });

  it('#checkDragToZoom', () => {
    expect(checkDragToZoom('none', { shiftKey: true } as any)).toBeFalsy();
    expect(checkDragToZoom('shift', { shiftKey: true } as any)).toBeTruthy();
    expect(checkDragToZoom('shift', { shiftKey: false } as any)).toBeFalsy();
    expect(checkDragToZoom('alt', { altKey: true } as any)).toBeTruthy();
  });

  it('should return viewport, zoom', () => {
    const mock = jest.fn();
    expect(getViewport(scales as any, ['both', 'both'], 'zoom', null, [2, 3], undefined, mock))
    .toEqual({ viewport: {
      argumentStart: 7, argumentEnd: 28, valueStart: 8, valueEnd: 27, scaleName: undefined,
    } });
    expect(mock).toBeCalled();
  });

  it('should return viewport, unzoom', () => {
    const mock = jest.fn();
    expect(
      getViewport(scales as any, ['both', 'both'], 'zoom', null, [-2, -3], viewport, mock),
    )
    .toEqual({ viewport: {
      argumentStart: 8, argumentEnd: 17, valueStart: 17, valueEnd: 28,
      scaleName: undefined,
    } });
    expect(mock).toBeCalled();
  });

  it('should return viewport, pan in one side', () => {
    const mock = jest.fn();
    expect(
      getViewport(scales as any, ['both', 'both'], 'pan', null, [2, 3], viewport, mock),
    )
    .toEqual({ viewport: {
      argumentStart: 8, argumentEnd: 13, valueStart: 23, valueEnd: 28, scaleName: undefined,
    } });
    expect(mock).toBeCalled();
  });

  it('should return viewport, pan in another side', () => {
    const mock = jest.fn();
    expect(
      getViewport(scales as any, ['both', 'both'], 'pan', null, [-2, -3], viewport, mock),
    )
    .toEqual({ viewport: {
      argumentStart: 12, argumentEnd: 17, valueStart: 17, valueEnd: 22, scaleName: undefined,
    } });
    expect(mock).toBeCalled();
  });

  it('should return null, pan but mode is zoom', () => {
    const mock = jest.fn();
    expect(
      getViewport(scales as any, ['zoom', 'zoom'], 'pan', null, [-2, -3], viewport, mock),
    )
    .toBe(null);
    expect(mock).toHaveBeenCalledTimes(0);
  });

  it('should return null, zoom but mode is none', () => {
    const mock = jest.fn();
    expect(
      getViewport(scales as any, ['none', 'none'], 'pan', null, [-2, -3], viewport, mock),
    )
    .toBe(null);
    expect(mock).toHaveBeenCalledTimes(0);
  });

  it('should return viewport, one of the scale is changed', () => {
    const mock = jest.fn();
    expect(
      getViewport(scales as any, ['both', 'none'], 'pan', null, [-2, -3], viewport, mock),
    )
    .toEqual({ viewport: { argumentStart: 12, argumentEnd: 17, valueStart: 20, valueEnd: 25 } });
    expect(mock).toBeCalled();
  });

  it('should return viewport, scaleName is specify', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 10, argumentEnd: 15,
      valueStart: 20, valueEnd: 25,
      scaleName: 'scaleName',
    };
    const scalesTest = { [ARGUMENT_DOMAIN]: singleScale, scaleName: singleScale };
    expect(
      getViewport(scalesTest as any, ['both', 'none'], 'pan', null, [-2, -3], viewportTest, mock),
    )
    .toEqual({
      viewport: {
        argumentStart: 12, argumentEnd: 17, valueStart: 20, valueEnd: 25, scaleName: 'scaleName',
      },
    });
    expect(mock).toBeCalled();
  });

  it('should return viewport, unzoom, left side is out', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 5, argumentEnd: 15,
      valueStart: 20, valueEnd: 25,
    };
    expect(getViewport(scales as any, ['zoom', 'none'], 'zoom', null, [-2, -3], viewportTest, mock))
    .toEqual({ viewport: {
      argumentStart: 5, argumentEnd: 17, valueStart: 20, valueEnd: 25, scaleName: undefined,
    } });
    expect(mock).toBeCalled();
  });

  it('should return viewport, unzoom, right side is out', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 15, argumentEnd: 30,
      valueStart: 20, valueEnd: 25,
    };
    expect(getViewport(scales as any, ['zoom', 'none'], 'zoom', null, [-2, -3], viewportTest, mock))
    .toEqual({ viewport: {
      argumentStart: 13, argumentEnd: 30, valueStart: 20, valueEnd: 25, scaleName: undefined,
    } });
    expect(mock).toBeCalled();
  });

  it('should return null, zoom, too small viewport', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 10, argumentEnd: 10.1,
      valueStart: 20, valueEnd: 25,
    };
    expect(getViewport(scales as any, ['zoom', 'none'], 'zoom', null, [2, 3], viewportTest, mock))
    .toBe(null);
    expect(mock).toHaveBeenCalledTimes(0);
  });

  it('should return null, unzoom, two of the sides is out', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 5, argumentEnd: 30,
      valueStart: 20, valueEnd: 25,
    };
    expect(getViewport(scales as any, ['zoom', 'none'], 'zoom', null, [-2, -3], viewportTest, mock))
    .toBe(null);
    expect(mock).toHaveBeenCalledTimes(0);
  });

  it('should return viewport, unzoom, two of the sides is out, prev bounds not initial', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 6, argumentEnd: 29,
      valueStart: 20, valueEnd: 25,
    };
    expect(getViewport(scales as any, ['zoom', 'none'], 'zoom', null, [-2, -3], viewportTest, mock))
    .toEqual({ viewport: {
      argumentStart: 5, argumentEnd: 30, valueStart: 20, valueEnd: 25, scaleName: undefined,
    } });
    expect(mock).toBeCalled();
  });

  it('should return null, pan, left side is out', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 5, argumentEnd: 15,
      valueStart: 20, valueEnd: 25,
    };
    expect(getViewport(scales as any, ['pan', 'none'], 'pan', null, [2, 3], viewportTest, mock))
    .toBe(null);
    expect(mock).toHaveBeenCalledTimes(0);
  });

  it('should return null, pan, right side is out', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 15, argumentEnd: 30,
      valueStart: 20, valueEnd: 25,
    };
    expect(getViewport(scales as any, ['pan', 'none'], 'pan', null, [-2, -3], viewportTest, mock))
    .toBe(null);
    expect(mock).toHaveBeenCalledTimes(0);
  });

  it('should return viewport, pan, right side is out, prev bounds not initial', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 15, argumentEnd: 29,
      valueStart: 20, valueEnd: 25,
    };
    expect(getViewport(scales as any, ['zoom', 'none'], 'zoom', null, [-2, -3], viewportTest, mock))
    .toEqual({ viewport: {
      argumentStart: 13, argumentEnd: 30, valueStart: 20, valueEnd: 25, scaleName: undefined,
    } });
    expect(mock).toBeCalled();
  });

  it('should return viewport, zoom by rect', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 10, argumentEnd: 29,
      valueStart: 6, valueEnd: 25,
    };
    const rect = { x: 12, y: 15, width: 5, height: -2 };
    expect(getViewport(scales as any, ['zoom', 'zoom'], 'zoom', rect, [0, 0], viewportTest, mock))
    .toEqual({ viewport: {
      argumentStart: 12, argumentEnd: 17, valueStart: 13, valueEnd: 15, scaleName: undefined,
    } });
    expect(mock).toBeCalled();
  });
});

describe('Zoom and Pan for categories', () => {
  const singleScale = jest.fn(value => value);
  (singleScale as any).domain = jest.fn(() => ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6']);
  (singleScale as any).bandwidth = jest.fn();
  (singleScale as any).range = jest.fn(() => [0, 40]);
  const scales = { [ARGUMENT_DOMAIN]: singleScale, [VALUE_DOMAIN]: singleScale };
  const viewport = {
    argumentStart: 'cat2', argumentEnd: 'cat4', valueStart: 'cat2', valueEnd: 'cat6',
  };

  it('should return viewport, zoom', () => {
    const mock = jest.fn();
    expect(getViewport(scales as any, ['both', 'both'], 'zoom', null, [33, 63], undefined, mock))
    .toEqual({ viewport: {
      argumentStart: 'cat2', argumentEnd: 'cat5', valueStart: 'cat3', valueEnd: 'cat4',
      scaleName: undefined,
    },
    });
    expect(mock).toBeCalled();
  });

  it('should return viewport, pan', () => {
    const mock = jest.fn();
    expect(getViewport(scales as any, ['both', 'both'], 'pan', null, [33, 63], viewport, mock))
    .toEqual({ viewport: {
      argumentStart: 'cat1', argumentEnd: 'cat3', valueStart: 'cat1', valueEnd: 'cat4',
      scaleName: undefined,
    },
    });
    expect(mock).toBeCalled();
  });

  it('should return viewport, zoom, two elements -> one', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 'cat2', argumentEnd: 'cat3', valueStart: 'cat2', valueEnd: 'cat6',
    };
    expect(getViewport(scales as any, ['both', 'none'], 'zoom', null, [33, 63], viewportTest, mock))
    .toEqual({ viewport: {
      argumentStart: 'cat3', argumentEnd: 'cat3', valueStart: 'cat2', valueEnd: 'cat6',
      scaleName: undefined,
    },
    });
    expect(mock).toBeCalled();
  });

  it('should return null, viewport is out', () => {
    const mock = jest.fn();
    const viewportTest = {
      argumentStart: 'cat1', argumentEnd: 'cat6', valueStart: 'cat2', valueEnd: 'cat6',
    };
    expect(
      getViewport(scales as any, ['both', 'none'], 'zoom', null, [-33, -63], viewportTest, mock),
    )
    .toBe(null);
    expect(mock).toHaveBeenCalledTimes(0);
  });

  it('should return viewport, zoom by rect', () => {
    const mockScale = jest.fn(value => value.toString()) as any;
    mockScale.domain = jest.fn().mockReturnValue(mockScale);
    mockScale.range = jest.fn().mockReturnValue(mockScale);
    (scaleQuantize as jest.Mock).mockReturnValue(mockScale);

    const mock = jest.fn();
    const rect = { x: 12, y: 15, width: 5, height: -2 };
    expect(getViewport(scales as any, ['zoom', 'zoom'], 'zoom', rect, [0, 0], viewport, mock))
    .toEqual({
      viewport: {
        argumentStart: '12', argumentEnd: '17', valueStart: '13', valueEnd: '15',
        scaleName: undefined,
      },
    });
    expect(mock).toBeCalled();
  });
});
