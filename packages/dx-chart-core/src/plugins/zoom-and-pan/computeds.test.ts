import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  getValueDomainName, makeScale, scaleBounds,
  moveBounds, growBounds, invertBoundsRange,
} from '../../utils/scale';
import {
  adjustLayout, getViewport, getDeltaForTouches, isKeyPressed, getWheelDelta, isMultiTouch,
  attachEvents, detachEvents, getRect, setCursorType,
} from './computeds';
import { ScalesCache, Viewport } from '../../types';

jest.mock('../../utils/scale', () => ({
  ...jest.requireActual('../../utils/scale'),  // for `rangesEqual`
  getValueDomainName: jest.fn(),
  makeScale: jest.fn(),
  scaleBounds: jest.fn(),
  moveBounds: jest.fn(),
  growBounds: jest.fn(),
  invertBoundsRange: jest.fn(),
}));

jest.mock('d3-scale', () => ({
  scaleQuantize: jest.fn(),
}));

describe('ZoomAndPan', () => {
  const matchFloat = expected => ({
    $$typeof: Symbol.for('jest.asymmetricMatcher'),

    asymmetricMatch: actual => Math.abs(actual - expected) < 0.01,

    toAsymmetricMatcher: () => `~${expected}`,
  });

  describe('#adjustLayout', () => {
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

  describe('#getViewport', () => {
    beforeAll(() => {
      (getValueDomainName as jest.Mock).mockReturnValue('domain-1');
    });
    afterAll(() => {
      (getValueDomainName as jest.Mock).mockReset();
    });

    afterEach(() => {
      jest.clearAllMocks();
      (moveBounds as jest.Mock).mockReset();
      (growBounds as jest.Mock).mockReset();
      (invertBoundsRange as jest.Mock).mockReset();
    });

    const argScale = { tag: 'arg-scale' };
    const valScale = { tag: 'val-scale' };
    const scales: ScalesCache = {
      [ARGUMENT_DOMAIN]: argScale,
      'domain-1': valScale,
    } as any;
    const viewport: Viewport = {
      argumentStart: 'A', argumentEnd: 'B',
      valueStart: 100, valueEnd: 200,
    };

    it('should pan bounds', () => {
      const mock = jest.fn();
      (moveBounds as jest.Mock).mockReturnValueOnce(['E', 'F']);
      (moveBounds as jest.Mock).mockReturnValueOnce([3, 5]);

      const ret = getViewport(
        scales, false, ['both', 'both'], 'pan', [10, 5], [40, 30], null, viewport, mock,
      );

      expect(ret).toEqual({
        viewport: {
          argumentStart: 'E', argumentEnd: 'F',
          valueStart: 3, valueEnd: 5,
        },
      });
      expect((moveBounds as jest.Mock).mock.calls).toEqual([
        [argScale, ['A', 'B'], 10],
        [valScale, [100, 200], 5],
      ]);
      expect(mock).toBeCalledWith(ret.viewport);
    });

    it('should pan bounds / rotated', () => {
      const mock = jest.fn();
      (moveBounds as jest.Mock).mockReturnValueOnce(['E', 'F']);
      (moveBounds as jest.Mock).mockReturnValueOnce([3, 5]);

      const ret = getViewport(
        scales, true, ['both', 'both'], 'pan', [10, 5], [40, 30], null, viewport, mock,
      );

      expect(ret).toEqual({
        viewport: {
          argumentStart: 'E', argumentEnd: 'F',
          valueStart: 3, valueEnd: 5,
        },
      });
      expect((moveBounds as jest.Mock).mock.calls).toEqual([
        [argScale, ['A', 'B'], 5],
        [valScale, [100, 200], 10],
      ]);
      expect(mock).toBeCalledWith(ret.viewport);
    });

    it('should zoom bounds', () => {
      const mock = jest.fn();
      (growBounds as jest.Mock).mockReturnValueOnce(['E', 'F']);
      (growBounds as jest.Mock).mockReturnValueOnce([3, 5]);

      const ret = getViewport(
        scales, false, ['both', 'both'], 'zoom', [10, 5], [40, 30], null, viewport, mock,
      );

      expect(ret).toEqual({
        viewport: {
          argumentStart: 'E', argumentEnd: 'F',
          valueStart: 3, valueEnd: 5,
        },
      });
      expect((growBounds as jest.Mock).mock.calls).toEqual([
        [argScale, ['A', 'B'], 10, 40],
        [valScale, [100, 200], 5, 30],
      ]);
      expect(mock).toBeCalledWith(ret.viewport);
    });

    it('should zoom bounds / rotated', () => {
      const mock = jest.fn();
      (growBounds as jest.Mock).mockReturnValueOnce(['E', 'F']);
      (growBounds as jest.Mock).mockReturnValueOnce([3, 5]);

      const ret = getViewport(
        scales, true, ['both', 'both'], 'zoom', [10, 5], [40, 30], null, viewport, mock,
      );

      expect(ret).toEqual({
        viewport: {
          argumentStart: 'E', argumentEnd: 'F',
          valueStart: 3, valueEnd: 5,
        },
      });
      expect((growBounds as jest.Mock).mock.calls).toEqual([
        [argScale, ['A', 'B'], 5, 30],
        [valScale, [100, 200], 10, 40],
      ]);
      expect(mock).toBeCalledWith(ret.viewport);
    });

    it('should apply bounds from range', () => {
      const mock = jest.fn();
      (invertBoundsRange as jest.Mock).mockReturnValueOnce(['E', 'F']);
      (invertBoundsRange as jest.Mock).mockReturnValueOnce([3, 5]);

      const ret = getViewport(
        scales, false, ['both', 'both'], 'zoom', [10, 5], [40, 30],
        [[11, 12], [13, 14]],
        { ...viewport, scaleName: 'test' }, mock,
      );

      expect(ret).toEqual({
        viewport: {
          scaleName: 'test',
          argumentStart: 'E', argumentEnd: 'F',
          valueStart: 3, valueEnd: 5,
        },
      });
      expect((invertBoundsRange as jest.Mock).mock.calls).toEqual([
        [argScale, [11, 12]],
        [valScale, [13, 14]],
      ]);
      expect(mock).toBeCalledWith(ret.viewport);
    });

    it('should change only argument bounds', () => {
      const mock = jest.fn();
      (moveBounds as jest.Mock).mockImplementation((scale, bounds) => {
        if (scale === argScale) {
          return ['E', 'F'];
        }
        if (scale === valScale) {
          return bounds;
        }
      });

      const ret = getViewport(
        scales, false, ['both', 'both'], 'pan', [10, 5], [40, 30], null, viewport, mock,
      );

      expect(ret).toEqual({
        viewport: {
          ...viewport,
          argumentStart: 'E', argumentEnd: 'F',
        },
      });
      expect(mock).toBeCalledWith(ret.viewport);
    });

    it('should change only value bounds', () => {
      const mock = jest.fn();
      (growBounds as jest.Mock).mockImplementation((scale, bounds) => {
        if (scale === argScale) {
          return bounds;
        }
        if (scale === valScale) {
          return [3, 5];
        }
      });

      const ret = getViewport(
        scales, false, ['both', 'both'], 'zoom', [10, 5], [40, 30], null, viewport, mock,
      );

      expect(ret).toEqual({
        viewport: {
          ...viewport,
          valueStart: 3, valueEnd: 5,
        },
      });
      expect(mock).toBeCalledWith(ret.viewport);
    });

    it('should not change viewport if bounds are not changed', () => {
      const mock = jest.fn();
      (moveBounds as jest.Mock).mockImplementation((_, bounds) => bounds);

      const ret = getViewport(
        scales, false, ['both', 'both'], 'pan', [10, 5], [40, 30], null, viewport, mock,
      );

      expect(ret).toEqual(null);
      expect(mock).not.toBeCalled();
      expect(moveBounds).toBeCalledTimes(2);
    });

    it('should not change viewport if interaction is not allowed', () => {
      const mock = jest.fn();

      const ret = getViewport(
        scales, false, ['none', 'zoom'], 'pan', [10, 5], [40, 30], null, viewport, mock,
      );

      expect(ret).toEqual(null);
      expect(mock).not.toBeCalled();
      expect(moveBounds).not.toBeCalled();
    });

    it('should take default bounds if viewport is empty', () => {
      const scales1: ScalesCache = {
        [ARGUMENT_DOMAIN]: { domain: () => ['Q', 'W', 'R', 'T'] },
        'domain-1': { domain: () => [1, 2] },
      } as any;

      getViewport(
        scales1, false, ['both', 'both'], 'zoom', [10, 5], [40, 30], null, {} as any, () => {},
      );

      expect((growBounds as jest.Mock).mock.calls[0][1]).toEqual(['Q', 'T']);
      expect((growBounds as jest.Mock).mock.calls[1][1]).toEqual([1, 2]);
    });
  });

  describe('#getDeltaForTouches', () => {
    it('should return delta and center', () => {
      expect(getDeltaForTouches([{ pageX: 20, pageY: 120 }, { pageX: 10, pageY: 110 }] as any[]))
        .toEqual({ center: [15, 115], delta: matchFloat(14.14) });
    });
  });

  describe('#isKeyPressed', () => {
    it('should return true if key is pressed', () => {
      expect(isKeyPressed({ shiftKey: true } as any, 'none')).toBeFalsy();
      expect(isKeyPressed({ shiftKey: true } as any, 'shift')).toBeTruthy();
      expect(isKeyPressed({ shiftKey: false } as any, 'shift')).toBeFalsy();
      expect(isKeyPressed({ altKey: true } as any, 'alt')).toBeTruthy();
    });
  });

  describe('#getDelta', () => {
    it('should return delta', () => {
      expect(getWheelDelta({ wheelDelta: 2 })).toBe(2);
      expect(getWheelDelta({ wheelDelta: 0 })).toBe(0);
      expect(getWheelDelta({ deltaY: 3 })).toBe(-90);
    });
  });

  describe('#isMultiTouch', () => {
    it('should check multi touch', () => {
      expect(isMultiTouch({ pageX: 3 })).toBeFalsy();
      expect(isMultiTouch({ touches: [{ pageX: 3 }] })).toBeFalsy();
      expect(isMultiTouch({ touches: [{ pageX: 3 }, { pageX: 4 }] })).toBeTruthy();
    });
  });

  describe('attach and detach events', () => {
    const node = { addEventListener: jest.fn(), removeEventListener: jest.fn() };
    const handlers = { handler_1: jest.fn(), handler_2: jest.fn() };
    it('should attach events', () => {
      attachEvents(node, handlers);
      expect(node.addEventListener).toBeCalledTimes(2);
      expect(node.addEventListener.mock.calls[0])
        .toEqual(['handler_1', handlers.handler_1, { passive: false }]);
      expect(node.addEventListener.mock.calls[1])
        .toEqual(['handler_2', handlers.handler_2, { passive: false }]);
    });

    it('should detach events', () => {
      detachEvents(node, handlers);
      expect(node.removeEventListener).toBeCalledTimes(2);
      expect(node.removeEventListener.mock.calls[0])
        .toEqual(['handler_1', handlers.handler_1]);
      expect(node.removeEventListener.mock.calls[1])
        .toEqual(['handler_2', handlers.handler_2]);
    });
  });

  describe('#getRect', () => {
    const pane = { width: 33, height: 44 };

    it('should return rect, interactions are zoom', () => {
      expect(getRect(false, 'zoom', 'zoom', [14, 12], [3, 5], pane))
        .toEqual({ x: 3, y: 5, width: 11, height: 7 });
      expect(getRect(true, 'zoom', 'zoom', [14, 12], [3, 5], pane))
        .toEqual({ x: 3, y: 5, width: 11, height: 7 });
      expect(getRect(false, 'both', 'both', [14, 12], [3, 5], pane))
        .toEqual({ x: 3, y: 5, width: 11, height: 7 });
      expect(getRect(true, 'both', 'both', [14, 12], [3, 5], pane))
        .toEqual({ x: 3, y: 5, width: 11, height: 7 });
    });

    it('should return rect, interaction are not zoom', () => {
      expect(getRect(false, 'pan', 'pan', [14, 12], [3, 5], pane))
        .toEqual({ x: 0, y: 0, width: 33, height: 44 });
      expect(getRect(true, 'pan', 'pan', [14, 12], [3, 5], pane))
        .toEqual({ x: 0, y: 0, width: 33, height: 44 });
      expect(getRect(false, 'zoom', 'none', [14, 12], [3, 5], pane))
        .toEqual({ x: 3, y: 0, width: 11, height: 44 });
      expect(getRect(true, 'zoom', 'none', [14, 12], [3, 5], pane))
        .toEqual({ x: 0, y: 5, width: 33, height: 7 });
    });
  });

  describe('#setCursorType', () => {
    it('should set type of cursor, custom', () => {
      const node = { style: {} } as any;
      setCursorType(node, 'cursor_type');
      expect(node.style.cursor).toBe('cursor_type');
    });

    it('should set type of cursor, default', () => {
      const node = { style: {} } as any;
      setCursorType(node);
      expect(node.style.cursor).toBe('pointer');
    });
  });
});
