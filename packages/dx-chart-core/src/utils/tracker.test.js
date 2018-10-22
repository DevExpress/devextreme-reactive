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
      createHitTester: jest.fn(),
    };
    const hitTest2 = jest.fn();
    const series2 = {
      name: 'Series 2',
      symbolName: 'series-2',
      points: 'coordinates-2',
      createHitTester: jest.fn(),
    };
    const hitTest3 = jest.fn();
    const series3 = {
      name: 'Series 3',
      symbolName: 'series-3',
      points: 'coordinates-3',
      createHitTester: jest.fn(),
    };

    const currentTarget = {
      getBoundingClientRect: () => ({ left: 40, top: 30 }),
    };

    beforeEach(() => {
      series1.createHitTester.mockReturnValue(hitTest1);
      series2.createHitTester.mockReturnValue(hitTest2);
      series3.createHitTester.mockReturnValue(hitTest3);
    });

    afterEach(jest.resetAllMocks);

    it('should create and invoke hit testers', () => {
      const { click } = buildEventHandlers([series1, series2, series3], {}, {
        click: [handler1, handler2], hoverChange: [],
      });

      click({ clientX: 454, clientY: 343, currentTarget });

      expect(series1.createHitTester).toBeCalledWith('coordinates-1');
      expect(series2.createHitTester).toBeCalledWith('coordinates-2');
      expect(series3.createHitTester).toBeCalledWith('coordinates-3');

      expect(hitTest1).toBeCalledWith([294, 203]);
      expect(hitTest2).toBeCalledWith([294, 203]);
      expect(hitTest3).toBeCalledWith([294, 203]);
    });

    it('should create hit testers lazily', () => {
      buildEventHandlers([series1, series2, series3], {}, {
        click: [], hoverChange: [],
      });

      expect(series1.createHitTester).not.toBeCalled();
      expect(series2.createHitTester).not.toBeCalled();
      expect(series3.createHitTester).not.toBeCalled();
    });

    it('should create only click handlers', () => {
      const handlers = buildEventHandlers([series1, series2, series3], {}, {
        click: [1], hoverChange: [],
      });

      expect(handlers).toEqual({
        click: expect.any(Function),
      });
    });

    it('should create only pointer move handlers', () => {
      const handlers = buildEventHandlers([series1, series2, series3], {}, {
        click: [], hoverChange: [1],
      });

      expect(handlers).toEqual({
        pointermove: expect.any(Function),
        pointerleave: expect.any(Function),
      });
    });

    it('should call *click*', () => {
      hitTest1.mockReturnValue({ tag: 'hit1' });
      hitTest2.mockReturnValue({ tag: 'hit2' });
      const { click } = buildEventHandlers([series1, series2, series3], {}, {
        click: [handler1, handler2], hoverChange: [],
      });

      click({ clientX: 352, clientY: 421, currentTarget });

      expect(handler1).toBeCalledWith({
        coords: [192, 281], target: { series: 'Series 2', tag: 'hit2' },
      });
      expect(handler2).toBeCalledWith({
        coords: [192, 281], target: { series: 'Series 2', tag: 'hit2' },
      });
    });

    it('should call *click* if there are no targets', () => {
      const { click } = buildEventHandlers([series1, series2, series3], {}, {
        click: [handler1, handler2], hoverChange: [],
      });

      click({ clientX: 352, clientY: 421, currentTarget });

      expect(handler1).toBeCalledWith({
        coords: [192, 281], target: null,
      });
      expect(handler2).toBeCalledWith({
        coords: [192, 281], target: null,
      });
    });

    it('should call *hoverChange*', () => {
      hitTest1.mockReturnValue({ tag: 'hit1' });
      hitTest2.mockReturnValue({ tag: 'hit2' });
      const { pointermove } = buildEventHandlers([series1, series2, series3], {}, {
        click: [], hoverChange: [handler1, handler2],
      });

      pointermove({ clientX: 352, clientY: 421, currentTarget });

      expect(handler1).toBeCalledWith({
        coords: [192, 281], target: { series: 'Series 2', tag: 'hit2' },
      });
      expect(handler2).toBeCalledWith({
        coords: [192, 281], target: { series: 'Series 2', tag: 'hit2' },
      });
    });

    it('should not call *hoverChange* on the same target', () => {
      hitTest1.mockReturnValue({ tag: 'hit1' });
      hitTest2.mockReturnValue({ tag: 'hit2' });
      const { pointermove } = buildEventHandlers(
        [series1, series2, series3],
        { hoverTarget: { series: 'Series 2' } },
        { click: [], hoverChange: [handler1, handler2] },
      );

      pointermove({ clientX: 362, clientY: 411, currentTarget });

      expect(handler1).not.toBeCalled();
      expect(handler2).not.toBeCalled();
    });

    it('should call *hoverChange* on the other target', () => {
      hitTest1.mockReturnValue({ tag: 'hit1' });
      const { pointermove } = buildEventHandlers(
        [series1, series2, series3],
        { hoverTarget: { series: 'Series 2' } },
        { click: [], hoverChange: [handler1, handler2] },
      );

      pointermove({ clientX: 362, clientY: 411, currentTarget });

      expect(handler1).toBeCalledWith({
        coords: [202, 271], target: { series: 'Series 1', tag: 'hit1' },
      });
      expect(handler2).toBeCalledWith({
        coords: [202, 271], target: { series: 'Series 1', tag: 'hit1' },
      });
    });

    it('should call *hoverChange* on empty target', () => {
      const { pointermove } = buildEventHandlers(
        [series1, series2, series3],
        { hoverTarget: { series: 'Series 2' } },
        { click: [], hoverChange: [handler1, handler2] },
      );

      pointermove({ clientX: 362, clientY: 411, currentTarget });

      expect(handler1).toBeCalledWith({
        coords: [202, 271], target: null,
      });
      expect(handler2).toBeCalledWith({
        coords: [202, 271], target: null,
      });
    });

    it('should call *hoverChange* on leave', () => {
      const { pointerleave } = buildEventHandlers(
        [series1, series2, series3],
        { hoverTarget: { series: 'Series 2' } },
        { click: [], hoverChange: [handler1, handler2] },
      );

      pointerleave({ clientX: 362, clientY: 411, currentTarget });

      expect(handler1).toBeCalledWith({
        coords: [202, 271], target: null,
      });
      expect(handler2).toBeCalledWith({
        coords: [202, 271], target: null,
      });
    });
  });
});
