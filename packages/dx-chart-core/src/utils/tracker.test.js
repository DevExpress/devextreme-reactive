import { buildEventHandlers } from './tracker';

window.pageXOffset = 120; // eslint-disable-line no-undef
window.pageYOffset = 110; // eslint-disable-line no-undef

describe('Tracker', () => {
  describe('#buildEventHandlers', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const hitTest1 = jest.fn();
    const series1 = {
      name: 'Series 1',
      symbolName: 'series-1',
      points: 'coordinates-1',
      createHitTester: jest.fn().mockReturnValue(hitTest1),
    };
    const hitTest2 = jest.fn();
    const series2 = {
      name: 'Series 2',
      symbolName: 'series-2',
      points: 'coordinates-2',
      createHitTester: jest.fn().mockReturnValue(hitTest2),
    };
    const hitTest3 = jest.fn();
    const series3 = {
      name: 'Series 3',
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

    afterEach(jest.clearAllMocks);

    it('should create and invoke hit testers', () => {
      const func = call();
      func({
        clientX: 454,
        clientY: 343,
        currentTarget,
      });

      expect(series1.createHitTester).toBeCalledWith('coordinates-1');
      expect(series2.createHitTester).toBeCalledWith('coordinates-2');
      expect(series3.createHitTester).toBeCalledWith('coordinates-3');

      expect(hitTest1).toBeCalledWith([294, 203]);
      expect(hitTest2).toBeCalledWith([294, 203]);
      expect(hitTest3).toBeCalledWith([294, 203]);

      expect(handler1).toBeCalledWith({ coords: [294, 203], targets: [] });
      expect(handler2).toBeCalledWith({ coords: [294, 203], targets: [] });
    });

    it('should provide targets on successful hit tests', () => {
      hitTest1.mockReturnValue({ tag: 'hit1' });
      hitTest3.mockReturnValue({ tag: 'hit3' });
      const func = call();
      func({
        clientX: 352,
        clientY: 421,
        currentTarget,
      });

      expect(handler1).toBeCalledWith({
        coords: [192, 281],
        targets: [{ series: 'Series 1', tag: 'hit1' }, { series: 'Series 3', tag: 'hit3' }],
      });
      expect(handler2).toBeCalledWith({
        coords: [192, 281],
        targets: [{ series: 'Series 1', tag: 'hit1' }, { series: 'Series 3', tag: 'hit3' }],
      });
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

    it('should create only pointer move handlers', () => {
      const handlers = buildEventHandlers([series1, series2, series3], {
        clickHandlers: [], pointerMoveHandlers: [1],
      });

      expect(handlers).toEqual({
        pointermove: expect.any(Function),
        pointerleave: expect.any(Function),
      });
    });

    it('should raise event on pointer leave', () => {
      const { pointerleave } = buildEventHandlers([series1, series2, series3], {
        clickHandlers: [], pointerMoveHandlers: [handler1, handler2],
      });
      pointerleave({
        clientX: 572,
        clientY: 421,
        currentTarget,
      });

      expect(handler1).toBeCalledWith({ coords: [412, 281], targets: [] });
      expect(handler2).toBeCalledWith({ coords: [412, 281], targets: [] });
    });
  });
});
