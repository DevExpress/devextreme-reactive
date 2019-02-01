import { area } from 'd3-shape';
import { dArea, dLine, dSpline } from '../plugins/series/computeds';
import {
  createAreaHitTester, createLineHitTester, createSplineHitTester,
  createBarHitTester, createScatterHitTester, createPieHitTester,
  changeSeriesState,
} from './series';

jest.mock('d3-shape', () => ({
  area: jest.fn(),
}));

jest.mock('../plugins/series/computeds', () => ({
  dArea: { x: jest.fn(), y0: jest.fn(), y1: jest.fn() },
  dLine: { x: jest.fn(), y: jest.fn() },
  dSpline: { x: jest.fn(), y: jest.fn(), curve: jest.fn() },
}));

const getContext = jest.fn();
// @ts-ignore
document.createElement = () => ({ getContext });

describe('Series', () => {
  const matchFloat = expected => ({
    $$typeof: Symbol.for('jest.asymmetricMatcher'),

    asymmetricMatch: actual => Math.abs(actual - expected) < 0.01,

    toAsymmetricMatcher: () => `~${expected}`,
  });

  // Mocks are intentionally reset rather then cleared.
  afterEach(jest.resetAllMocks);

  const checkContinuousHitTester = (createHitTester) => {
    const isPointInPath = jest.fn();
    getContext.mockReturnValue({ isPointInPath });

    const hitTest = createHitTester([
      { x: 115, y: 35, index: 'p1' },
      { x: 165, y: 65, index: 'p2' },
      { x: 195, y: 60, index: 'p3' },
    ]);

    isPointInPath.mockReturnValueOnce(false);
    expect(hitTest([90, 30])).toEqual(null);

    expect(hitTest([110, 40])).toEqual({
      points: [{ index: 'p1', distance: matchFloat(7.07) }],
    });
    expect(hitTest([115, 35])).toEqual({
      points: [{ index: 'p1', distance: matchFloat(0) }],
    });

    expect(hitTest([185, 65])).toEqual({
      points: [
        { index: 'p2', distance: matchFloat(20) },
        { index: 'p3', distance: matchFloat(11.18) },
      ],
    });
    expect(hitTest([190, 60])).toEqual({
      points: [{ index: 'p3', distance: matchFloat(5) }],
    });

    isPointInPath.mockReturnValueOnce(true);
    expect(hitTest([140, 40])).toEqual({
      points: [{ index: 'p1', distance: matchFloat(25.5) }],
    });
    isPointInPath.mockReturnValueOnce(true);
    expect(hitTest([140, 60])).toEqual({
      points: [{ index: 'p2', distance: matchFloat(25.5) }],
    });

    expect(isPointInPath.mock.calls).toEqual([
      [90, 30],
      [140, 40],
      [140, 60],
    ]);
  };

  describe('#createAreaHitTester', () => {
    const mockPath = jest.fn() as any;
    mockPath.x = jest.fn();
    mockPath.y0 = jest.fn();
    mockPath.y1 = jest.fn();
    mockPath.context = jest.fn();

    beforeEach(() => {
      (dArea.x as jest.Mock).mockReturnValue('#x');
      (dArea.y0 as jest.Mock).mockReturnValue('#y0');
      (dArea.y1 as jest.Mock).mockReturnValue('#y1');

      (area as jest.Mock).mockReturnValue(mockPath);
    });

    it('should setup context', () => {
      getContext.mockReturnValue('test-context');

      createAreaHitTester('test-coordinates');

      expect(mockPath.x).toBeCalledWith('#x');
      expect(mockPath.y0).toBeCalledWith('#y0');
      expect(mockPath.y1).toBeCalledWith('#y1');
      expect(mockPath.context).toBeCalledWith('test-context');
      expect(mockPath).toBeCalledWith('test-coordinates');
    });

    it('should test points', () => checkContinuousHitTester(createAreaHitTester));
  });

  describe('#createLineHitTester', () => {
    const mockPath = jest.fn() as any;
    mockPath.x = jest.fn();
    mockPath.y0 = jest.fn();
    mockPath.y1 = jest.fn();
    mockPath.context = jest.fn();

    beforeEach(() => {
      (dLine.x as jest.Mock).mockReturnValue('#x');
      (dLine.y as jest.Mock).mockReturnValue('#y');

      (area as jest.Mock).mockReturnValue(mockPath);
    });

    it('should setup context', () => {
      getContext.mockReturnValue('test-context');

      createLineHitTester('test-coordinates');

      expect(mockPath.x).toBeCalledWith('#x');
      expect(mockPath.y0).toBeCalledWith(expect.any(Function));
      expect(mockPath.y1).toBeCalledWith(expect.any(Function));
      expect(mockPath.context).toBeCalledWith('test-context');
      expect(mockPath).toBeCalledWith('test-coordinates');
    });

    it('should test points', () => checkContinuousHitTester(createLineHitTester));
  });

  describe('#createSplineHitTester', () => {
    const mockPath = jest.fn() as any;
    mockPath.x = jest.fn();
    mockPath.y0 = jest.fn();
    mockPath.y1 = jest.fn();
    mockPath.curve = jest.fn();
    mockPath.context = jest.fn();

    beforeEach(() => {
      (dSpline.x as jest.Mock).mockReturnValue('#x');
      (dSpline.y as jest.Mock).mockReturnValue('#y');
      (dSpline.curve as jest.Mock).mockReturnValue('#curve');

      (area as jest.Mock).mockReturnValue(mockPath);
    });

    it('should setup context', () => {
      getContext.mockReturnValue('test-context');

      createSplineHitTester('test-coordinates');

      expect(mockPath.x).toBeCalledWith('#x');
      expect(mockPath.y0).toBeCalledWith(expect.any(Function));
      expect(mockPath.y1).toBeCalledWith(expect.any(Function));
      expect(mockPath.curve).toBeCalledWith('#curve');
      expect(mockPath.context).toBeCalledWith('test-context');
      expect(mockPath).toBeCalledWith('test-coordinates');
    });

    it('should call context method', () => checkContinuousHitTester(createSplineHitTester));
  });

  describe('#createBarHitTester', () => {
    it('should test bars', () => {
      const hitTest = createBarHitTester([
        {
          x: 12, barWidth: 1, maxBarWidth: 4, y: 2, y1: 4, index: 'p1',
        },
        {
          x: 24, barWidth: 4, maxBarWidth: 2, y: 3, y1: 5, index: 'p2',
        },
        {
          x: 32.5, barWidth: 2.5, maxBarWidth: 2, y: 1, y1: 5, index: 'p3',
        },
        {
          x: 33.5, barWidth: 2.5, maxBarWidth: 2, y: 0, y1: 4, index: 'p4',
        },
      ]);

      expect(hitTest([15, 1])).toEqual(null);
      expect(hitTest([12, 4])).toEqual({ points: [{ index: 'p1', distance: matchFloat(1) }] });
      expect(hitTest([25, 3])).toEqual({ points: [{ index: 'p2', distance: matchFloat(1.41) }] });
      expect(hitTest([31, 2])).toEqual({
        points: [
          { index: 'p3', distance: matchFloat(1.8) },
          { index: 'p4', distance: matchFloat(2.5) },
        ],
      });
    });
  });

  describe('#createScatterHitTester', () => {
    it('should test points', () => {
      const hitTest = createScatterHitTester([
        {
          x: 10, y: 4, index: 'p1', point: { size: 20 },
        },
        {
          x: 30, y: 5, index: 'p2', point: { size: 20 },
        },
        {
          x: 50, y: 8, index: 'p3', point: { size: 20 },
        },
        {
          x: 55, y: 10, index: 'p4', point: { size: 20 },
        },
      ]);

      expect(hitTest([15, -7])).toEqual(null);
      expect(hitTest([14, 10])).toEqual({ points: [{ index: 'p1', distance: matchFloat(7.21) }] });
      expect(hitTest([32, 4])).toEqual({ points: [{ index: 'p2', distance: matchFloat(2.24) }] });
      expect(hitTest([49, 15])).toEqual({
        points: [
          { index: 'p3', distance: matchFloat(7.07) },
          { index: 'p4', distance: matchFloat(7.81) },
        ],
      });
    });
  });

  describe('#createPieHitTester', () => {
    it('should test pies', () => {
      const hitTest = createPieHitTester([
        {
          x: 60, y: 50,
          innerRadius: 0.1,
          outerRadius: 1,
          maxRadius: 10,
          startAngle: 0,
          endAngle: Math.PI / 4,
          index: 'p1',
        },
        {
          x: 60, y: 50,
          innerRadius: 0.1,
          outerRadius: 1,
          maxRadius: 10,
          startAngle: Math.PI / 2,
          endAngle: Math.PI,
          index: 'p2',
        },
        {
          x: 60, y: 50,
          innerRadius: 0.1,
          outerRadius: 1,
          maxRadius: 10,
          startAngle: Math.PI,
          endAngle: 3 * Math.PI / 2,
          index: 'p3',
        },
      ]);

      expect(hitTest([60, 61])).toEqual(null);
      expect(hitTest([64, 45])).toEqual({ points: [{ index: 'p1', distance: matchFloat(0.95) }] });
      expect(hitTest([68, 52])).toEqual({ points: [{ index: 'p2', distance: matchFloat(2.8) }] });
      expect(hitTest([60, 55])).toEqual({
        points: [
          { index: 'p2', distance: matchFloat(0.93) },
          { index: 'p3', distance: matchFloat(0.93) },
        ],
      });
    });
  });

  describe('#changeSeriesState', () => {
    const series1 = { name: 's1', points: [] };
    const series2 = { name: 's2', points: [] };
    const series3 = { name: 's3', points: [{ index: 1 }, { index: 3 }] };
    const series4 = { name: 's4', points: [{ index: 2 }, { index: 5 }, { index: 6 }] };

    it('should change series and points', () => {
      const [
        newSeries1, newSeries2, newSeries3, newSeries4,
      ] = changeSeriesState([series1, series2, series3, series4], [
        { series: 's3', point: 3 },
        { series: 's4', point: 5 },
        { series: 's4', point: 2 },
      ], 'test-state');

      expect(newSeries1).toBe(series1);

      expect(newSeries2).toBe(series2);

      expect(newSeries3).toEqual({
        ...series3,
        state: 'test-state',
        points: [
          series3.points[0],
          { ...series3.points[1], state: 'test-state' },
        ],
      });
      expect(newSeries3.points[0]).toBe(series3.points[0]);

      expect(newSeries4).toEqual({
        ...series4,
        state: 'test-state',
        points: [
          { ...series4.points[0], state: 'test-state' },
          { ...series4.points[1], state: 'test-state' },
          series4.points[2],
        ],
      });
      expect(newSeries4.points[2]).toBe(series4.points[2]);
    });

    it('should return original list when there are no matches', () => {
      const list = [series1, series2, series3, series4];
      const result = changeSeriesState(list, [
        { series: 's5' },
        { series: 's6', point: 3 },
        { series: 's0', point: 0 },
      ], 'test-state');

      expect(result).toBe(list);
    });
  });
});
