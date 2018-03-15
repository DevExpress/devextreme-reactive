import { scaleLinear } from 'd3-scale';
import { calculateAxisCoords } from './computeds';

const scale = jest.fn().mockReturnValue(10);
scale.range = jest.fn().mockReturnThis();
scale.domain = jest.fn().mockReturnThis();
scale.ticks = jest.fn().mockReturnValue([1]);

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(),
}));

describe('getAxisCoords', () => {
  beforeAll(() => {
    scaleLinear.mockImplementation(() => scale);
  });
  afterEach(() => {
    scale.mockClear();
    scale.range.mockClear();
    scale.domain.mockClear();
    scale.ticks.mockClear();
  });
  it('should return ticks coords with horizontal-top position', () => {
    const coords = calculateAxisCoords([0, 10], 'horizontal', 'top', 100, 50);
    expect(coords).toEqual({
      ticks: [{
        xText: 10, yText: 0, text: 1, alignmentBaseline: 'baseline', textAnchor: 'middle', y1: 0, y2: 10, x1: 10, x2: 10,
      }],
    });
  });

  it('should return ticks coords with horizontal-bottom position', () => {
    const coords = calculateAxisCoords([0, 10], 'horizontal', 'bottom', 100, 50);
    expect(coords).toEqual({
      ticks: [{
        xText: 10, yText: 0, text: 1, alignmentBaseline: 'hanging', textAnchor: 'middle', y1: 0, y2: -10, x1: 10, x2: 10,
      }],
    });
  });

  it('should pass correct domain to scale', () => {
    calculateAxisCoords([0, 10], 'horizontal', 'top', 100, 50);
    expect(scale).toHaveBeenCalledTimes(1);
    expect(scale.domain).toBeCalledWith([0, 10]);
    expect(scale.range).toBeCalledWith([0, 100]);
  });

  it('should return ticks coords with vertical-left position', () => {
    const coords = calculateAxisCoords([0, 10], 'vertical', 'left', 100, 50);
    expect(coords).toEqual({
      ticks: [{
        text: 1, xText: 0, yText: 10, x1: 0, x2: 10, y1: 10, y2: 10, alignmentBaseline: 'middle', textAnchor: 'end',
      }],
    });
  });

  it('should return ticks coords with vertical-right position', () => {
    const coords = calculateAxisCoords([0, 10], 'vertical', 'right', 100, 50);
    expect(coords).toEqual({
      ticks: [{
        text: 1, xText: 0, yText: 10, x1: 0, x2: -10, y1: 10, y2: 10, alignmentBaseline: 'middle', textAnchor: 'start',
      }],
    });
  });

  it('should pass correct domain to scale', () => {
    calculateAxisCoords([0, 10], 'vertical', 'left', 100, 50);
    expect(scale).toHaveBeenCalledTimes(1);
    expect(scale.domain).toBeCalledWith([0, 10]);
    expect(scale.range).toBeCalledWith([50, 0]);
  });
});
