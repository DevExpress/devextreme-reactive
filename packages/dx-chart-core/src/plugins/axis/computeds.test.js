import { getWidth } from '../../utils/scale';
import { axisCoordinates, getGridCoordinates, axesData } from './computeds';

jest.mock('../../utils/scale', () => ({
  getWidth: jest.fn(),
}));

describe('AxisCoordinates', () => {
  const tickSize = 5;
  const indentFromAxis = 10;
  const scale = jest.fn().mockReturnValue(10);

  beforeAll(() => {
    getWidth.mockImplementation(() => 30);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('linear', () => {
    beforeEach(() => {
      scale.ticks = jest.fn().mockReturnValue([1]);
    });

    afterEach(() => {
      delete scale.ticks;
    });

    it('should return ticks Coordinates with horizontal-top position', () => {
      const coordinates = axisCoordinates({
        scale, orientation: 'horizontal', position: 'top', tickSize, indentFromAxis,
      });
      expect(coordinates).toEqual([{
        xText: 25, yText: -10, text: 1, dominantBaseline: 'baseline', textAnchor: 'middle', y1: 0, y2: -5, x1: 25, x2: 25, key: 0,
      }]);
    });

    it('should return ticks coordinates with horizontal-bottom position', () => {
      const coordinates = axisCoordinates({
        scale, orientation: 'horizontal', position: 'bottom', tickSize, indentFromAxis,
      });
      expect(coordinates).toEqual([{
        xText: 25, yText: 10, text: 1, dominantBaseline: 'hanging', textAnchor: 'middle', y1: 0, y2: 5, x1: 25, x2: 25, key: 0,
      }]);
    });

    it('should pass correct domain to scale', () => {
      axisCoordinates({
        scale, orientation: 'horizontal', position: 'top', tickSize,
      });
      expect(scale).toHaveBeenCalledTimes(1);
    });

    it('should return ticks coordinates with vertical-left position', () => {
      const coordinates = axisCoordinates({
        scale, orientation: 'vertical', position: 'left', tickSize, indentFromAxis,
      });
      expect(coordinates).toEqual([{
        text: 1, xText: -10, yText: 25, x1: 0, x2: -5, y1: 25, y2: 25, dominantBaseline: 'middle', textAnchor: 'end', key: 0,
      }]);
    });

    it('should return ticks coordinates with vertical-right position', () => {
      const coordinates = axisCoordinates({
        scale, orientation: 'vertical', position: 'right', tickSize, indentFromAxis,
      });
      expect(coordinates).toEqual([{
        text: 1, xText: 10, yText: 25, x1: 0, x2: 5, y1: 25, y2: 25, dominantBaseline: 'middle', textAnchor: 'start', key: 0,
      }]);
    });

    it('should pass correct domain to scale', () => {
      axisCoordinates({
        scale, orientation: 'vertical', position: 'left', tickSize,
      });
      expect(scale).toHaveBeenCalledTimes(1);
      expect(scale).toHaveBeenCalledWith(1);
    });

    it('should format ticks', () => {
      scale.tickFormat = jest.fn(() => tick => `format ${tick}`);
      const coordinates = axisCoordinates({
        scale, orientation: 'horizontal', position: 'top', tickSize, indentFromAxis,
      });
      expect(coordinates).toEqual([{
        xText: 25, yText: -10, text: 'format 1', dominantBaseline: 'baseline', textAnchor: 'middle', y1: 0, y2: -5, x1: 25, x2: 25, key: 0,
      }]);

      scale.tickFormat = undefined;
    });

    it('should format ticks, user set format', () => {
      scale.tickFormat = jest.fn(() => tick => `format ${tick}`);
      const userFormat = jest.fn(() => tick => `user format ${tick}`);
      const coordinates = axisCoordinates({
        scale, orientation: 'horizontal', tickFormat: userFormat, position: 'top', tickSize, indentFromAxis,
      });
      expect(coordinates).toEqual([{
        xText: 25, yText: -10, text: 'user format 1', dominantBaseline: 'baseline', textAnchor: 'middle', y1: 0, y2: -5, x1: 25, x2: 25, key: 0,
      }]);

      scale.tickFormat = undefined;
    });
  });

  describe('band', () => {
    beforeEach(() => {
      scale.domain = jest.fn().mockReturnValue(['a']);
      getWidth.mockImplementation(() => 30);
    });
    afterEach(() => {
      scale.domain = null;
    });

    it('should pass correct domain to scale', () => {
      axisCoordinates({
        scale, orientation: 'vertical', position: 'left', tickSize,
      });
      expect(scale).toHaveBeenCalledTimes(1);
      expect(scale).toHaveBeenCalledWith('a');
    });

    it('should return ticks coordinates with horizontal-bottom position', () => {
      const coordinates = axisCoordinates({
        scale, orientation: 'horizontal', position: 'bottom', tickSize, indentFromAxis,
      });
      expect(coordinates).toEqual([{
        xText: 25, yText: 10, text: 'a', dominantBaseline: 'hanging', textAnchor: 'middle', y1: 0, y2: 5, x1: 25, x2: 25, key: 0,
      }]);
    });

    it('should return ticks Coordinates with horizontal-top position', () => {
      const coordinates = axisCoordinates({
        scale, orientation: 'horizontal', position: 'top', tickSize, indentFromAxis,
      });
      expect(coordinates).toEqual([{
        xText: 25, yText: -10, text: 'a', dominantBaseline: 'baseline', textAnchor: 'middle', y1: 0, y2: -5, x1: 25, x2: 25, key: 0,
      }]);
    });

    it('should return ticks coordinates with vertical-left position', () => {
      const coordinates = axisCoordinates({
        scale, orientation: 'vertical', position: 'left', tickSize, indentFromAxis,
      });
      expect(coordinates).toEqual([{
        text: 'a', xText: -10, yText: 25, x1: 0, x2: -5, y1: 25, y2: 25, dominantBaseline: 'middle', textAnchor: 'end', key: 0,
      }]);
    });

    it('should return ticks coordinates with vertical-right position', () => {
      const coordinates = axisCoordinates({
        scale, orientation: 'vertical', position: 'right', tickSize, indentFromAxis,
      });
      expect(coordinates).toEqual([{
        text: 'a', xText: 10, yText: 25, x1: 0, x2: 5, y1: 25, y2: 25, dominantBaseline: 'middle', textAnchor: 'start', key: 0,
      }]);
    });
  });
});

describe('getGridCoordinates', () => {
  const scale = jest.fn(x => x + 1);
  scale.ticks = jest.fn().mockReturnValue([10, 20, 30, 40]);
  getWidth.mockReturnValue(30);

  afterEach(jest.clearAllMocks);

  it('should return horizontal coordinates', () => {
    expect(getGridCoordinates({ name: 'argument-domain', scale })).toEqual([
      {
        key: '0', x: 26, y: 0, dx: 0, dy: 1,
      },
      {
        key: '1', x: 36, y: 0, dx: 0, dy: 1,
      },
      {
        key: '2', x: 46, y: 0, dx: 0, dy: 1,
      },
      {
        key: '3', x: 56, y: 0, dx: 0, dy: 1,
      },
    ]);
  });

  it('should return vertical coordinates', () => {
    expect(getGridCoordinates({ name: 'value-domain', scale })).toEqual([
      {
        key: '0', x: 0, y: 26, dx: 1, dy: 0,
      },
      {
        key: '1', x: 0, y: 36, dx: 1, dy: 0,
      },
      {
        key: '2', x: 0, y: 46, dx: 1, dy: 0,
      },
      {
        key: '3', x: 0, y: 56, dx: 1, dy: 0,
      },
    ]);
  });
});

describe('axesData', () => {
  it('should return array with props', () => {
    const axes = axesData([], { first: true });
    expect(axes).toEqual([{ first: true }]);
  });

  it('should push new axis props', () => {
    const axes = axesData([{ first: true }], { second: true });
    expect(axes).toEqual([{ first: true }, { second: true }]);
  });
});
