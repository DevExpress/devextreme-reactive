import { hasWindow } from '@devexpress/dx-core';
import { buildEventHandlers } from './event-tracker';

jest.mock('@devexpress/dx-core', () => ({
  hasWindow: jest.fn(),
}));

describe('EventTracker', () => {
  describe('#buildEventHandlers', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const hitTest1 = jest.fn();
    const series1 = {
      name: 'Series 1',
      index: 0,
      symbolName: 'series-1',
      points: 'coordinates-1',
      rotated: true,
      createHitTester: jest.fn().mockReturnValue(hitTest1),
    };
    const hitTest2 = jest.fn();
    const series2 = {
      name: 'Series 2',
      index: 1,
      symbolName: 'series-2',
      points: 'coordinates-2',
      rotated: false,
      createHitTester: jest.fn().mockReturnValue(hitTest2),
    };
    const hitTest3 = jest.fn();
    const series3 = {
      name: 'Series 3',
      index: 2,
      symbolName: 'series-3',
      points: 'coordinates-3',
      rotated: true,
      createHitTester: jest.fn().mockReturnValue(hitTest3),
    };

    const currentTarget = {
      getBoundingClientRect: () => ({ left: 40, top: 30 }),
      ownerDocument: {
        defaultView: { pageXOffset: 120, pageYOffset: 110 },
      },
    };

    const call = () => buildEventHandlers([series1, series2, series3] as any, {
      clickHandlers: [handler1, handler2], pointerMoveHandlers: [],
    }).click;

    afterEach(() => {
      jest.clearAllMocks();
      hitTest1.mockReset();
      hitTest2.mockReset();
      hitTest3.mockReset();
    });

    (hasWindow as jest.Mock).mockImplementation(() => true);

    it('should create and invoke hit testers', () => {
      const func = call();
      func({
        currentTarget,
        pageX: 454,
        pageY: 343,
      });

      expect(series1.createHitTester).toBeCalledWith('coordinates-1', true);
      expect(series2.createHitTester).toBeCalledWith('coordinates-2', false);
      expect(series3.createHitTester).toBeCalledWith('coordinates-3', true);

      expect(hitTest1).toBeCalledWith([294, 203]);
      expect(hitTest2).toBeCalledWith([294, 203]);
      expect(hitTest3).toBeCalledWith([294, 203]);

      expect(handler1).toBeCalledWith({ location: [294, 203], targets: [] });
      expect(handler2).toBeCalledWith({ location: [294, 203], targets: [] });
    });

    it('should provide targets on successful hit tests', () => {
      hitTest1.mockReturnValue({
        points: [
          { index: 1, distance: 50 },
        ],
      });
      hitTest3.mockReturnValue({
        points: [
          { index: 1, distance: 20 }, { index: 2, distance: 80 }, { index: 3, distance: 10 },
        ],
      });
      const func = call();
      func({
        currentTarget,
        pageX: 352,
        pageY: 421,
        nativeEvent: 'nativeEvent',
      });

      const targets = [
        {
          series: 'Series 3', point: 3, distance: 10, order: 2,
        },
        {
          series: 'Series 3', point: 1, distance: 20, order: 2,
        },
        {
          series: 'Series 1', point: 1, distance: 50, order: 0,
        },
        {
          series: 'Series 3', point: 2, distance: 80, order: 2,
        },
      ];
      expect(handler1).toBeCalledWith({ targets, location: [192, 281], event: 'nativeEvent' });
      expect(handler2).toBeCalledWith({ targets, location: [192, 281], event: 'nativeEvent' });
    });

    it('should take series order into account', () => {
      hitTest1.mockReturnValue({
        points: [
          { index: 2, distance: 30 },
        ],
      });
      hitTest2.mockReturnValue({
        points: [
          { index: 1, distance: 40 }, { index: 3, distance: 60 },
        ],
      });
      hitTest3.mockReturnValue({
        points: [
          { index: 0, distance: 35 },
        ],
      });
      const func = call();
      func({
        currentTarget,
        pageX: 481,
        pageY: 324,
        nativeEvent: 'nativeEvent',
      });

      const targets = [
        {
          series: 'Series 3', point: 0, distance: 35, order: 2,
        },
        {
          series: 'Series 2', point: 1, distance: 40, order: 1,
        },
        {
          series: 'Series 1', point: 2, distance: 30, order: 0,
        },
        {
          series: 'Series 2', point: 3, distance: 60, order: 1,
        },
      ];

      expect(handler1).toBeCalledWith({ targets, location: [321, 184], event: 'nativeEvent' });
      expect(handler2).toBeCalledWith({ targets, location: [321, 184], event: 'nativeEvent' });
    });

    it('should create hit testers lazily', () => {
      call();

      expect(series1.createHitTester).not.toBeCalled();
      expect(series2.createHitTester).not.toBeCalled();
      expect(series3.createHitTester).not.toBeCalled();
    });

    it('should create only click handlers', () => {
      const handlers = buildEventHandlers([series1, series2, series3] as any, {
        clickHandlers: [1] as any, pointerMoveHandlers: [],
      });

      expect(handlers).toEqual({
        click: expect.any(Function),
      });
    });

    it('should create only move handlers', () => {
      const handlers = buildEventHandlers([series1, series2, series3] as any, {
        clickHandlers: [], pointerMoveHandlers: [1] as any,
      });

      expect(handlers).toEqual({
        mousemove: expect.any(Function),
        mouseleave: expect.any(Function),
      });
    });

    it('should invoke handlers on leave event', () => {
      const { mouseleave } = buildEventHandlers([series1, series2, series3] as any, {
        clickHandlers: [], pointerMoveHandlers: [handler1, handler2],
      });
      mouseleave({
        currentTarget,
        pageX: 572,
        pageY: 421,
      });

      expect(handler1).toBeCalledWith({ location: [412, 281], targets: [] });
      expect(handler2).toBeCalledWith({ location: [412, 281], targets: [] });
    });

    it('should use touch events if available', () => {
      // @ts-ignore
      window.ontouchstart = true;
      try {
        const handlers = buildEventHandlers([series1, series2, series3] as any, {
          clickHandlers: [], pointerMoveHandlers: [1] as any,
        });

        expect(handlers).toEqual({
          touchstart: expect.any(Function),
        });
      } finally {
        delete window.ontouchstart;
      }
    });

    it('should work with SSR', () => {
      (hasWindow as jest.Mock).mockImplementation(() => false);
      const handlers = buildEventHandlers([series1, series2, series3] as any, {
        clickHandlers: [1] as any, pointerMoveHandlers: [1] as any,
      });

      expect(handlers).toEqual({});
    });
  });
});
