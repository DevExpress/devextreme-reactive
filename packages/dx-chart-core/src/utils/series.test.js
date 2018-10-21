import { area } from 'd3-shape';
import { dArea, dLine, dSpline } from '../plugins/series/computeds';
import {
  createAreaHitTester, createLineHitTester, createSplineHitTester,
  createBarHitTester, createScatterHitTester, createPieHitTester,
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
// eslint-disable-next-line no-undef
document.createElement = () => ({ getContext });

describe('Series', () => {
  // Mocks are intentionally reset rather then cleared.
  afterEach(jest.resetAllMocks);

  describe('#createAreaHitTester', () => {
    const mockPath = jest.fn();
    mockPath.x = jest.fn();
    mockPath.y0 = jest.fn();
    mockPath.y1 = jest.fn();
    mockPath.context = jest.fn();

    beforeEach(() => {
      dArea.x.mockReturnValue('#x');
      dArea.y0.mockReturnValue('#y0');
      dArea.y1.mockReturnValue('#y1');

      area.mockReturnValue(mockPath);
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

    it('should call context method', () => {
      const isPointInPath = jest.fn();
      isPointInPath.mockReturnValueOnce(false);
      isPointInPath.mockReturnValueOnce(true);
      isPointInPath.mockReturnValueOnce(true);
      isPointInPath.mockReturnValueOnce(false);
      isPointInPath.mockReturnValueOnce(true);
      getContext.mockReturnValue({ isPointInPath });

      const hitTest = createAreaHitTester([
        { x: 115, y: 35, index: 'p1' },
        { x: 175, y: 65, index: 'p2' },
      ]);

      expect(hitTest([100, 20])).toEqual(null);
      expect(hitTest([120, 40])).toEqual({ point: 'p1' });
      expect(hitTest([140, 60])).toEqual({});
      expect(hitTest([160, 30])).toEqual(null);
      expect(hitTest([180, 70])).toEqual({ point: 'p2' });

      expect(isPointInPath.mock.calls).toEqual([
        [100, 20],
        [120, 40],
        [140, 60],
        [160, 30],
        [180, 70],
      ]);
    });
  });

  describe('#createLineHitTester', () => {
    const mockPath = jest.fn();
    mockPath.x = jest.fn();
    mockPath.y0 = jest.fn();
    mockPath.y1 = jest.fn();
    mockPath.context = jest.fn();

    beforeEach(() => {
      dLine.x.mockReturnValue('#x');
      dLine.y.mockReturnValue('#y');

      area.mockReturnValue(mockPath);
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

    it('should call context method', () => {
      const isPointInPath = jest.fn();
      isPointInPath.mockReturnValueOnce(false);
      isPointInPath.mockReturnValueOnce(true);
      isPointInPath.mockReturnValueOnce(true);
      isPointInPath.mockReturnValueOnce(false);
      isPointInPath.mockReturnValueOnce(true);
      getContext.mockReturnValue({ isPointInPath });

      const hitTest = createLineHitTester([
        { x: 115, y: 35, index: 'p1' },
        { x: 175, y: 65, index: 'p2' },
      ]);

      expect(hitTest([100, 20])).toEqual(null);
      expect(hitTest([120, 40])).toEqual({ point: 'p1' });
      expect(hitTest([140, 60])).toEqual({});
      expect(hitTest([160, 30])).toEqual(null);
      expect(hitTest([180, 70])).toEqual({ point: 'p2' });

      expect(isPointInPath.mock.calls).toEqual([
        [100, 20],
        [120, 40],
        [140, 60],
        [160, 30],
        [180, 70],
      ]);
    });
  });

  describe('#createSplineHitTester', () => {
    const mockPath = jest.fn();
    mockPath.x = jest.fn();
    mockPath.y0 = jest.fn();
    mockPath.y1 = jest.fn();
    mockPath.curve = jest.fn();
    mockPath.context = jest.fn();

    beforeEach(() => {
      dSpline.x.mockReturnValue('#x');
      dSpline.y.mockReturnValue('#y');
      dSpline.curve.mockReturnValue('#curve');

      area.mockReturnValue(mockPath);
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

    it('should call context method', () => {
      const isPointInPath = jest.fn();
      isPointInPath.mockReturnValueOnce(false);
      isPointInPath.mockReturnValueOnce(true);
      isPointInPath.mockReturnValueOnce(true);
      isPointInPath.mockReturnValueOnce(false);
      isPointInPath.mockReturnValueOnce(true);
      getContext.mockReturnValue({ isPointInPath });

      const hitTest = createSplineHitTester([
        { x: 115, y: 35, index: 'p1' },
        { x: 175, y: 65, index: 'p2' },
      ]);

      expect(hitTest([100, 20])).toEqual(null);
      expect(hitTest([120, 40])).toEqual({ point: 'p1' });
      expect(hitTest([140, 60])).toEqual({});
      expect(hitTest([160, 30])).toEqual(null);
      expect(hitTest([180, 70])).toEqual({ point: 'p2' });

      expect(isPointInPath.mock.calls).toEqual([
        [100, 20],
        [120, 40],
        [140, 60],
        [160, 30],
        [180, 70],
      ]);
    });
  });

  describe('#createBarHitTester', () => {
    it('should test bars', () => {
      const hitTest = createBarHitTester([
        {
          x: 10, width: 4, y: 2, y1: 4, index: 'p1',
        },
        {
          x: 20, width: 8, y: 3, y1: 5, index: 'p2',
        },
        {
          x: 30, width: 5, y: 1, y1: 5, index: 'p3',
        },
      ]);

      expect(hitTest([15, 1])).toEqual(null);
      expect(hitTest([12, 4])).toEqual({ point: 'p1' });
      expect(hitTest([25, 3])).toEqual({ point: 'p2' });
      expect(hitTest([31, 2])).toEqual({ point: 'p3' });
    });
  });

  describe('#createScatterHitTester', () => {
    it('should test points', () => {
      const hitTest = createScatterHitTester([
        { x: 10, y: 4, index: 'p1' },
        { x: 30, y: 5, index: 'p2' },
        { x: 50, y: 8, index: 'p3' },
      ]);

      expect(hitTest([15, -7])).toEqual(null);
      expect(hitTest([14, 10])).toEqual({ point: 'p1' });
      expect(hitTest([32, 4])).toEqual({ point: 'p2' });
      expect(hitTest([47, 18])).toEqual({ point: 'p3' });
    });
  });

  describe('#createPieHitTester', () => {
    it('should test pies', () => {
      const hitTest = createPieHitTester([
        {
          x: 60, y: 50, innerRadius: 1, outerRadius: 10, startAngle: 0, endAngle: Math.PI / 4, index: 'p1',
        },
        {
          x: 60, y: 50, innerRadius: 1, outerRadius: 10, startAngle: Math.PI / 2, endAngle: Math.PI, index: 'p2',
        },
      ]);

      expect(hitTest([60, 61])).toEqual(null);
      expect(hitTest([64, 45])).toEqual({ point: 'p1' });
      expect(hitTest([68, 52])).toEqual({ point: 'p2' });
    });
  });
});
