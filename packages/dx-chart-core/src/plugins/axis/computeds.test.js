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
  it('should return ticks coords', () => {
    const coords = calculateAxisCoords([0, 10], 'horizontal', 100, 50);
    expect(coords).toEqual({
      ticks: [{
        text: 1, x1: 10, x2: 10, xText: 10, y1: 0, y2: 10, yText: 20,
      }],
    });
  });

  it('should pass correct domain to scale', () => {
    calculateAxisCoords([0, 10], 'horizontal', 100, 50);
    expect(scale).toHaveBeenCalledTimes(1);
    expect(scale.domain).toBeCalledWith([0, 10]);
    expect(scale.range).toBeCalledWith([0, 100]);
  });

  it('should return ticks coords', () => {
    const coords = calculateAxisCoords([0, 10], 'vertical', 100, 50);
    expect(coords).toEqual({
      ticks: [{
        text: 1, x1: 30, x2: 40, xText: 15, y1: 10, y2: 10, yText: 10,
      }],
    });
  });

  it('should pass correct domain to scale', () => {
    calculateAxisCoords([0, 10], 'vertical', 100, 50);
    expect(scale).toHaveBeenCalledTimes(1);
    expect(scale.domain).toBeCalledWith([0, 10]);
    expect(scale.range).toBeCalledWith([50, 0]);
  });
});
