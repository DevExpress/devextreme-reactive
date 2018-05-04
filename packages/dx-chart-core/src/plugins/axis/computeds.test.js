import { createScale } from '../../utils/scale';
import { axisCoordinates } from './computeds';

const scale = jest.fn().mockReturnValue(10);

jest.mock('../../utils/scale', () => ({
  createScale: jest.fn(),
}));

const tickSize = 5;
const indentFromAxis = 10;

describe('AxisCoordinates', () => {
  beforeAll(() => {
    createScale.mockImplementation(() => scale);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('linear', () => {
    beforeEach(() => {
      scale.ticks = jest.fn().mockReturnValue([1]);
    });
    afterEach(() => {
      scale.ticks = null;
    });
    it('should return ticks Coordinates with horizontal-top position', () => {
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'horizontal' }, 'top', 100, 50, tickSize, indentFromAxis);
      expect(coordinates).toEqual({
        ticks: [{
          xText: 10, yText: -15, text: 1, dominantBaseline: 'baseline', textAnchor: 'middle', y1: -5, y2: 0, x1: 10, x2: 10,
        }],
      });
    });

    it('should return ticks coordinates with horizontal-bottom position', () => {
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'horizontal' }, 'bottom', 100, 50, tickSize, indentFromAxis);
      expect(coordinates).toEqual({
        ticks: [{
          xText: 10, yText: 15, text: 1, dominantBaseline: 'hanging', textAnchor: 'middle', y1: 0, y2: 5, x1: 10, x2: 10,
        }],
      });
    });

    it('should pass correct domain to scale', () => {
      axisCoordinates({ domain: [0, 10], orientation: 'horizontal' }, 'top', 100, 50, tickSize);
      expect(scale).toHaveBeenCalledTimes(1);
    });

    it('should return ticks coordinates with vertical-left position', () => {
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'vertical' }, 'left', 100, 50, tickSize, indentFromAxis);
      expect(coordinates).toEqual({
        ticks: [{
          text: 1, xText: -15, yText: 10, x1: -5, x2: 0, y1: 10, y2: 10, dominantBaseline: 'middle', textAnchor: 'end',
        }],
      });
    });

    it('should return ticks coordinates with vertical-right position', () => {
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'vertical' }, 'right', 100, 50, tickSize, indentFromAxis);
      expect(coordinates).toEqual({
        ticks: [{
          text: 1, xText: 15, yText: 10, x1: 0, x2: 5, y1: 10, y2: 10, dominantBaseline: 'middle', textAnchor: 'start',
        }],
      });
    });

    it('should pass correct domain to scale', () => {
      axisCoordinates({ domain: [0, 10], orientation: 'vertical' }, 'left', 100, 50, tickSize);
      expect(scale).toHaveBeenCalledTimes(1);
      expect(scale).toHaveBeenCalledWith(1);
    });
  });

  describe('band', () => {
    beforeEach(() => {
      scale.domain = jest.fn().mockReturnValue(['a']);
      scale.bandwidth = jest.fn().mockReturnValue(30);
    });
    afterEach(() => {
      scale.domain = null;
      scale.bandwidth = null;
    });
    it('should pass correct domain to scale', () => {
      axisCoordinates({ domain: [0, 10], orientation: 'vertical' }, 'left', 100, 50, tickSize);
      expect(scale).toHaveBeenCalledTimes(1);
      expect(scale).toHaveBeenCalledWith('a');
    });

    it('should return ticks coordinates with horizontal-bottom position', () => {
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'horizontal' }, 'bottom', 100, 50, tickSize, indentFromAxis);
      expect(coordinates).toEqual({
        ticks: [{
          xText: 25, yText: 15, text: 'a', dominantBaseline: 'hanging', textAnchor: 'middle', y1: 0, y2: 5, x1: 25, x2: 25,
        }],
      });
    });

    it('should return ticks Coordinates with horizontal-top position', () => {
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'horizontal' }, 'top', 100, 50, tickSize, indentFromAxis);
      expect(coordinates).toEqual({
        ticks: [{
          xText: 25, yText: -15, text: 'a', dominantBaseline: 'baseline', textAnchor: 'middle', y1: -5, y2: 0, x1: 25, x2: 25,
        }],
      });
    });

    it('should return ticks coordinates with vertical-left position', () => {
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'vertical' }, 'left', 100, 50, tickSize, indentFromAxis);
      expect(coordinates).toEqual({
        ticks: [{
          text: 'a', xText: -15, yText: 25, x1: -5, x2: 0, y1: 25, y2: 25, dominantBaseline: 'middle', textAnchor: 'end',
        }],
      });
    });

    it('should return ticks coordinates with vertical-right position', () => {
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'vertical' }, 'right', 100, 50, tickSize, indentFromAxis);
      expect(coordinates).toEqual({
        ticks: [{
          text: 'a', xText: 15, yText: 25, x1: 0, x2: 5, y1: 25, y2: 25, dominantBaseline: 'middle', textAnchor: 'start',
        }],
      });
    });
  });
});
