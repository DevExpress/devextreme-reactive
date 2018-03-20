import { createScale } from '../../utils/scale';
import { axisCoordinates } from './computeds';

const scale = jest.fn().mockReturnValue(10);

jest.mock('../../utils/scale', () => ({
  createScale: jest.fn(),
}));

describe('getAxisCoordinates', () => {
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
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'horizontal' }, 'top', 100, 50);
      expect(coordinates).toEqual({
        ticks: [{
          xText: 10, yText: 0, text: 1, alignmentBaseline: 'baseline', textAnchor: 'middle', y1: 0, y2: 10, x1: 10, x2: 10,
        }],
      });
    });

    it('should return ticks coordinates with horizontal-bottom position', () => {
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'horizontal' }, 'bottom', 100, 50);
      expect(coordinates).toEqual({
        ticks: [{
          xText: 10, yText: 0, text: 1, alignmentBaseline: 'hanging', textAnchor: 'middle', y1: 0, y2: -10, x1: 10, x2: 10,
        }],
      });
    });

    it('should pass correct domain to scale', () => {
      axisCoordinates({ domain: [0, 10], orientation: 'horizontal' }, 'top', 100, 50);
      expect(scale).toHaveBeenCalledTimes(1);
    });

    it('should return ticks coordinates with vertical-left position', () => {
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'vertical' }, 'left', 100, 50);
      expect(coordinates).toEqual({
        ticks: [{
          text: 1, xText: 0, yText: 10, x1: 0, x2: 10, y1: 10, y2: 10, alignmentBaseline: 'middle', textAnchor: 'end',
        }],
      });
    });

    it('should return ticks coordinates with vertical-right position', () => {
      const coordinates = axisCoordinates({ domain: [0, 10], orientation: 'vertical' }, 'right', 100, 50);
      expect(coordinates).toEqual({
        ticks: [{
          text: 1, xText: 0, yText: 10, x1: 0, x2: -10, y1: 10, y2: 10, alignmentBaseline: 'middle', textAnchor: 'start',
        }],
      });
    });

    it('should pass correct domain to scale', () => {
      axisCoordinates({ domain: [0, 10], orientation: 'vertical' }, 'left', 100, 50);
      expect(scale).toHaveBeenCalledTimes(1);
      expect(scale).toHaveBeenCalledWith(1);
    });
  });

  describe('band', () => {
    beforeEach(() => {
      scale.domain = jest.fn().mockReturnValue(['a']);
    });
    afterEach(() => {
      scale.ticks = null;
    });
    it('should pass correct domain to scale', () => {
      axisCoordinates({ domain: [0, 10], orientation: 'vertical' }, 'left', 100, 50);
      expect(scale).toHaveBeenCalledTimes(1);
      expect(scale).toHaveBeenCalledWith('a');
    });
  });
});
