import { buildEventHandlers } from './event-tracker';
// @ts-ignore
window.pageXOffset = 120;
// @ts-ignore
window.pageYOffset = 110;

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
      createHitTester: jest.fn().mockReturnValue(hitTest1),
    };
    const hitTest2 = jest.fn();
    const series2 = {
      name: 'Series 2',
      index: 1,
      symbolName: 'series-2',
      points: 'coordinates-2',
      createHitTester: jest.fn().mockReturnValue(hitTest2),
    };
    const hitTest3 = jest.fn();
    const series3 = {
      name: 'Series 3',
      index: 2,
      symbolName: 'series-3',
      points: 'coordinates-3',
      createHitTester: jest.fn().mockReturnValue(hitTest3),
    };

    const currentTarget = {
      getBoundingClientRect: () => ({ left: 40, top: 30 }),
    };

    const call = () => buildEventHandlers([series1, series2, series3], {
      clickHandlers: [handler1, handler2], pointerMoveHandlers: [],
    }).click;

    afterEach(() => {
      jest.clearAllMocks();
      hitTest1.mockReset();
      hitTest2.mockReset();
      hitTest3.mockReset();
    });

    it('should create and invoke hit testers', () => {
      const func = call();
      func({
        currentTarget,
        clientX: 454,
        clientY: 343,
      });

      expect(series1.createHitTester).toBeCalledWith('coordinates-1');
      expect(series2.createHitTester).toBeCalledWith('coordinates-2');
      expect(series3.createHitTester).toBeCalledWith('coordinates-3');

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
        clientX: 352,
        clientY: 421,
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
        clientX: 481,
        clientY: 324,
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
      const handlers = buildEventHandlers([series1, series2, series3], {
        clickHandlers: [1], pointerMoveHandlers: [],
      });

      expect(handlers).toEqual({
        click: expect.any(Function),
      });
    });

    it('should create only move handlers', () => {
      const handlers = buildEventHandlers([series1, series2, series3], {
        clickHandlers: [], pointerMoveHandlers: [1],
      });

      expect(handlers).toEqual({
        mousemove: expect.any(Function),
        mouseleave: expect.any(Function),
      });
    });

    it('should invoke handlers on leave event', () => {
      const { mouseleave } = buildEventHandlers([series1, series2, series3], {
        clickHandlers: [], pointerMoveHandlers: [handler1, handler2],
      });
      mouseleave({
        clientX: 572,
        clientY: 421,
      });

      expect(handler1).toBeCalledWith({ location: [412, 281], targets: [] });
      expect(handler2).toBeCalledWith({ location: [412, 281], targets: [] });
    });

    it('should use touch events if available', () => {
      // @ts-ignore
      window.ontouchmove = true;
      try {
        const handlers = buildEventHandlers([series1, series2, series3], {
          clickHandlers: [], pointerMoveHandlers: [1],
        });

        expect(handlers).toEqual({
          touchmove: expect.any(Function),
          touchleave: expect.any(Function),
        });
      } finally {
        delete window.ontouchmove;
      }
    });

    it('should use pointer events if available', () => {
      // @ts-ignore
      window.onpointermove = true;
      try {
        const handlers = buildEventHandlers([series1, series2, series3], {
          clickHandlers: [], pointerMoveHandlers: [1],
        });

        expect(handlers).toEqual({
          pointermove: expect.any(Function),
          pointerleave: expect.any(Function),
        });
      } finally {
        delete window.onpointermove;
      }
    });
  });
});
