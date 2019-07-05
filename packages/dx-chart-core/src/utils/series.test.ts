import { area } from 'd3-shape';
import {
  createAreaHitTester, createLineHitTester, createSplineHitTester,
  createBarHitTester, createScatterHitTester, createPieHitTester,
  changeSeriesState,
} from './series';

jest.mock('d3-shape', () => ({
  area: jest.fn(),
}));

jest.mock('../plugins/series/computeds', () => ({
  dArea: ({
    x: jest.fn().mockReturnValue('area:#x'),
    y0: jest.fn().mockReturnValue('area:#y0'),
    y1: jest.fn().mockReturnValue('area:#y1'),
  }),
  dRotateArea: ({
    y: jest.fn().mockReturnValue('rotated-area:#y'),
    x0: jest.fn().mockReturnValue('rotated-area:#x0'),
    x1: jest.fn().mockReturnValue('rotated-area:#x1'),
  }),
  dLine: ({
    x: jest.fn().mockReturnValue('line:#x'),
    y: jest.fn().mockReturnValue('line:#y'),
  }),
  dRotateLine: ({
    x: jest.fn().mockReturnValue('rotated-line:#x'),
    y: jest.fn().mockReturnValue('rotated-line:#y'),
  }),
  dSpline: ({
    x: jest.fn().mockReturnValue('spline:#x'),
    y: jest.fn().mockReturnValue('spline:#y'),
    curve: jest.fn().mockReturnValue('spline:#curve'),
  }),
  dRotateSpline: ({
    x: jest.fn().mockReturnValue('rotated-spline:#x'),
    y: jest.fn().mockReturnValue('rotated-spline:#y'),
    curve: jest.fn().mockReturnValue('rotated-spline:#curve'),
  }),
}));

const getContext = jest.fn();
// @ts-ignore
document.createElement = () => ({ getContext });
const matchFloat = expected => ({
  $$typeof: Symbol.for('jest.asymmetricMatcher'),

  asymmetricMatch: actual => Math.abs(actual - expected) < 0.01,

  toAsymmetricMatcher: () => `~${expected}`,
});

describe('Continuous Series', () => {
  let mockPath: any;

  beforeEach(() => {
    mockPath = jest.fn();
    mockPath.x = jest.fn();
    mockPath.y0 = jest.fn();
    mockPath.y1 = jest.fn();
    mockPath.y = jest.fn();
    mockPath.x0 = jest.fn();
    mockPath.x1 = jest.fn();
    mockPath.context = jest.fn();
    mockPath.curve = jest.fn();
    (area as jest.Mock).mockReturnValue(mockPath);
  });

  const checkContinuousHitTester = (createHitTester) => {
    const isPointInPath = jest.fn();
    getContext.mockReturnValue({ isPointInPath });

    const hitTest = createHitTester([
      { arg: 115, val: 35, index: 'p1' },
      { arg: 165, val: 65, index: 'p2' },
      { arg: 195, val: 60, index: 'p3' },
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
    it('should setup context, not rotated', () => {
      getContext.mockReturnValue('test-context');

      createAreaHitTester('test-coordinates' as any, false);

      expect(mockPath.x).toBeCalledWith('area:#x');
      expect(mockPath.y0).toBeCalledWith('area:#y0');
      expect(mockPath.y1).toBeCalledWith('area:#y1');
      expect(mockPath.context).toBeCalledWith('test-context');
      expect(mockPath).toBeCalledWith('test-coordinates');
    });

    it('should setup context, rotated', () => {
      getContext.mockReturnValue('test-context');

      createAreaHitTester('test-coordinates' as any, true);

      expect(mockPath.y).toBeCalledWith('rotated-area:#y');
      expect(mockPath.x0).toBeCalledWith('rotated-area:#x0');
      expect(mockPath.x1).toBeCalledWith('rotated-area:#x1');
      expect(mockPath.context).toBeCalledWith('test-context');
      expect(mockPath).toBeCalledWith('test-coordinates');
    });

    it('should test points', () => checkContinuousHitTester(createAreaHitTester));
  });

  describe('#createLineHitTester', () => {
    it('should setup context, not rotated', () => {
      getContext.mockReturnValue('test-context');

      createLineHitTester('test-coordinates' as any, false);

      expect(mockPath.x).toBeCalledWith('line:#x');
      expect(mockPath.y0).toBeCalledWith(expect.any(Function));
      expect(mockPath.y1).toBeCalledWith(expect.any(Function));
      expect(mockPath.context).toBeCalledWith('test-context');
      expect(mockPath).toBeCalledWith('test-coordinates');
    });

    it('should setup context, rotated', () => {
      getContext.mockReturnValue('test-context');

      createLineHitTester('test-coordinates' as any, true);

      expect(mockPath.y).toBeCalledWith('rotated-line:#y');
      expect(mockPath.x0).toBeCalledWith(expect.any(Function));
      expect(mockPath.x1).toBeCalledWith(expect.any(Function));
      expect(mockPath.context).toBeCalledWith('test-context');
      expect(mockPath).toBeCalledWith('test-coordinates');
    });

    it('should test points', () => checkContinuousHitTester(createLineHitTester));
  });

  describe('#createSplineHitTester', () => {
    it('should setup context, not rotated', () => {
      getContext.mockReturnValue('test-context');

      createSplineHitTester('test-coordinates' as any, false);

      expect(mockPath.x).toBeCalledWith('spline:#x');
      expect(mockPath.y0).toBeCalledWith(expect.any(Function));
      expect(mockPath.y1).toBeCalledWith(expect.any(Function));
      expect(mockPath.curve).toBeCalledWith('spline:#curve');
      expect(mockPath.context).toBeCalledWith('test-context');
      expect(mockPath).toBeCalledWith('test-coordinates');
    });

    it('should setup context, rotated', () => {
      getContext.mockReturnValue('test-context');

      createSplineHitTester('test-coordinates' as any, true);

      expect(mockPath.y).toBeCalledWith('rotated-spline:#y');
      expect(mockPath.x0).toBeCalledWith(expect.any(Function));
      expect(mockPath.x1).toBeCalledWith(expect.any(Function));
      expect(mockPath.curve).toBeCalledWith('rotated-spline:#curve');
      expect(mockPath.context).toBeCalledWith('test-context');
      expect(mockPath).toBeCalledWith('test-coordinates');
    });

    it('should call context method', () => checkContinuousHitTester(createSplineHitTester));
  });
});

describe('Point Series', () => {
  describe('#createBarHitTester', () => {
    it('should test bars', () => {
      const hitTest = createBarHitTester([
        {
          arg: 12, barWidth: 1, maxBarWidth: 4, val: 2, startVal: 4, index: 'p1',
        } as any,
        {
          arg: 24, barWidth: 4, maxBarWidth: 2, val: 3, startVal: 5, index: 'p2',
        },
        {
          arg: 32.5, barWidth: 2.5, maxBarWidth: 2, val: 1, startVal: 5, index: 'p3',
        },
        {
          arg: 33.5, barWidth: 2.5, maxBarWidth: 2, val: 0, startVal: 4, index: 'p4',
        },
      ], false);

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

    it('should test bars, rotated', () => {
      const hitTest = createBarHitTester([
        {
          arg: 12, barWidth: 1, maxBarWidth: 4, val: 3, startVal: 1, index: 'p1',
        } as any,
        {
          arg: 24, barWidth: 4, maxBarWidth: 2, val: 2, startVal: 0, index: 'p2',
        },
        {
          arg: 32.5, barWidth: 2.5, maxBarWidth: 2, val: 4, startVal: 0, index: 'p3',
        },
        {
          arg: 33.5, barWidth: 2.5, maxBarWidth: 2, val: 5, startVal: 1, index: 'p4',
        },
      ], true);

      expect(hitTest([4, 15])).toEqual(null);
      expect(hitTest([1, 12])).toEqual({ points: [{ index: 'p1', distance: matchFloat(1) }] });
      expect(hitTest([2, 25])).toEqual({ points: [{ index: 'p2', distance: matchFloat(1.41) }] });
      expect(hitTest([3, 31])).toEqual({
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
          arg: 10, val: 4, index: 'p1', point: { size: 20 },
        } as any,
        {
          arg: 30, val: 5, index: 'p2', point: { size: 20 },
        },
        {
          arg: 50, val: 8, index: 'p3', point: { size: 20 },
        },
        {
          arg: 55, val: 10, index: 'p4', point: { size: 20 },
        },
      ], false);

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

    it('should test points, rotated', () => {
      const hitTest = createScatterHitTester([
        {
          arg: 10, val: 4, index: 'p1', point: { size: 20 },
        } as any,
        {
          arg: 30, val: 5, index: 'p2', point: { size: 20 },
        },
        {
          arg: 50, val: 8, index: 'p3', point: { size: 20 },
        },
        {
          arg: 55, val: 10, index: 'p4', point: { size: 20 },
        },
      ], true);

      expect(hitTest([-7, 15])).toEqual(null);
      expect(hitTest([10, 14])).toEqual({ points: [{ index: 'p1', distance: matchFloat(7.21) }] });
      expect(hitTest([4, 32])).toEqual({ points: [{ index: 'p2', distance: matchFloat(2.24) }] });
      expect(hitTest([15, 49])).toEqual({
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
          arg: 60, val: 50,
          innerRadius: 0.1,
          outerRadius: 1,
          maxRadius: 10,
          startAngle: 0,
          endAngle: Math.PI / 4,
          index: 'p1',
        } as any,
        {
          arg: 60, val: 50,
          innerRadius: 0.1,
          outerRadius: 1,
          maxRadius: 10,
          startAngle: Math.PI / 2,
          endAngle: Math.PI,
          index: 'p2',
        },
        {
          arg: 60, val: 50,
          innerRadius: 0.1,
          outerRadius: 1,
          maxRadius: 10,
          startAngle: Math.PI,
          endAngle: 3 * Math.PI / 2,
          index: 'p3',
        },
      ], false);

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
      ] = changeSeriesState([series1, series2, series3, series4] as any, [
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
      const list = [series1 as any, series2, series3, series4];
      const result = changeSeriesState(list, [
        { series: 's5' } as any,
        { series: 's6', point: 3 },
        { series: 's0', point: 0 },
      ], 'test-state');

      expect(result).toBe(list);
    });
  });
});
