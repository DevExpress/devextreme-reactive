import { isHorizontal } from '../../utils/scale';
import { axisCoordinates, getGridCoordinates } from './computeds';

jest.mock('../../utils/scale', () => ({
  isHorizontal: jest.fn(),
  fixOffset: scale => value => scale(value) + 15,
}));

describe('axisCoordinates', () => {
  const tickSize = 5;
  const indentFromAxis = 10;

  afterEach(jest.clearAllMocks);

  describe('linear', () => {
    const scale = jest.fn().mockReturnValue(10) as any;
    scale.ticks = jest.fn().mockReturnValue([1]);

    it('should return ticks Coordinates with horizontal-top position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, scaleName: 'test-name', position: 'top',
      } as any);
      expect(coordinates).toEqual({
        sides: [1, 0],
        ticks: [{
          key: '0',
          xText: 25,
          yText: -10,
          text: 1,
          dominantBaseline: 'baseline',
          textAnchor: 'middle',
          y1: 0, y2: -5, x1: 25, x2: 25,
        }],
      });
      expect(isHorizontal).toBeCalledWith('test-name');
    });

    it('should return ticks coordinates with horizontal-bottom position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      const coordinates = axisCoordinates({
        scale,  tickSize, indentFromAxis, scaleName: 'test-name', position: 'bottom',
      } as any);
      expect(coordinates).toEqual({
        sides: [1, 0],
        ticks: [{
          key: '0',
          xText: 25,
          yText: 10,
          text: 1,
          dominantBaseline: 'hanging',
          textAnchor: 'middle',
          y1: 0, y2: 5, x1: 25, x2: 25,
        }],
      });
      expect(isHorizontal).toBeCalledWith('test-name');
    });

    it('should pass correct domain to scale, horizontal', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      axisCoordinates({
        scale, tickSize, indentFromAxis, scaleName: 'test-name', position: 'top',
      } as any);
      expect(scale.mock.calls).toEqual([
        [1],
      ]);
      expect(isHorizontal).toBeCalledWith('test-name');
    });

    it('should return ticks coordinates with vertical-left position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(false);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, scaleName: 'test-name', position: 'left',
      } as any);
      expect(coordinates).toEqual({
        sides: [0, 1],
        ticks: [{
          key: '0',
          text: 1,
          xText: -10,
          yText: 25,
          x1: 0, x2: -5, y1: 25, y2: 25,
          dominantBaseline: 'middle',
          textAnchor: 'end',
        }],
      });
      expect(isHorizontal).toBeCalledWith('test-name');
    });

    it('should return ticks coordinates with vertical-right position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(false);
      const coordinates = axisCoordinates({
        tickSize, indentFromAxis,  scale, scaleName: 'test-name', position: 'right',
      } as any);
      expect(coordinates).toEqual({
        sides: [0, 1],
        ticks: [{
          key: '0',
          text: 1,
          xText: 10,
          yText: 25,
          x1: 0, x2: 5, y1: 25, y2: 25,
          dominantBaseline: 'middle',
          textAnchor: 'start',
        }],
      });
      expect(isHorizontal).toBeCalledWith('test-name');
    });

    it('should pass correct domain to scale, vertical', () => {
      (isHorizontal as jest.Mock).mockReturnValue(false);
      axisCoordinates({
        scale,  tickSize, indentFromAxis, scaleName: 'test-name', position: 'left',
      } as any);
      expect(scale.mock.calls).toEqual([
        [1],
      ]);
      expect(isHorizontal).toBeCalledWith('test-name');
    });

    it('should format ticks', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      scale.tickFormat = jest.fn(() => tick => `format ${tick}`);
      try {
        const coordinates = axisCoordinates({
          scale, tickSize, indentFromAxis, position: 'top', scaleName: 'test-name',
        } as any);
        expect(coordinates.ticks).toEqual([{
          key: '0',
          xText: 25,
          yText: -10,
          text: 'format 1',
          dominantBaseline: 'baseline',
          textAnchor: 'middle',
          y1: 0, y2: -5, x1: 25, x2: 25,
        }]);
      } finally {
        delete scale.tickFormat;
      }
    });

    it('should format ticks, user set format', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      scale.tickFormat = jest.fn(() => tick => `format ${tick}`);
      const userFormat = jest.fn(() => tick => `user format ${tick}`);
      try {
        const coordinates = axisCoordinates({
          scale,
          tickSize,
          indentFromAxis,
          tickFormat: userFormat,
          position: 'top',
          scaleName: 'test-name',
        });
        expect(coordinates.ticks).toEqual([{
          key: '0',
          xText: 25,
          yText: -10,
          text: 'user format 1',
          dominantBaseline: 'baseline',
          textAnchor: 'middle',
          y1: 0, y2: -5, x1: 25, x2: 25,
        }]);
      } finally {
        delete scale.tickFormat;
      }
    });
  });

  describe('band', () => {
    const scale = jest.fn().mockReturnValue(10) as any;
    scale.domain = jest.fn().mockReturnValue(['a']);

    it('should pass correct domain to scale', () => {
      (isHorizontal as jest.Mock).mockReturnValue(false);
      axisCoordinates({
        scale, tickSize, indentFromAxis, position: 'left', scaleName: 'test-name',
      } as any);
      expect(scale.mock.calls).toEqual([
        ['a'],
      ]);
    });

    it('should return ticks coordinates with horizontal-bottom position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, position: 'bottom', scaleName: 'test-name',
      } as any);
      expect(coordinates).toEqual({
        sides: [1, 0],
        ticks: [{
          key: '0',
          xText: 25,
          yText: 10,
          text: 'a',
          dominantBaseline: 'hanging',
          textAnchor: 'middle',
          y1: 0, y2: 5, x1: 25, x2: 25,
        }],
      });
    });

    it('should return ticks Coordinates with horizontal-top position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, position: 'top', scaleName: 'test-name',
      } as any);
      expect(coordinates).toEqual({
        sides: [1, 0],
        ticks: [{
          key: '0',
          xText: 25,
          yText: -10,
          text: 'a',
          dominantBaseline: 'baseline',
          textAnchor: 'middle',
          y1: 0, y2: -5, x1: 25, x2: 25,
        }],
      });
    });

    it('should return ticks coordinates with vertical-left position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(false);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, position: 'left', scaleName: 'test-name',
      } as any);
      expect(coordinates).toEqual({
        sides: [0, 1],
        ticks: [{
          key: '0',
          text: 'a',
          xText: -10,
          yText: 25,
          x1: 0, x2: -5, y1: 25, y2: 25,
          dominantBaseline: 'middle',
          textAnchor: 'end',
        }],
      });
    });

    it('should return ticks coordinates with vertical-right position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(false);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, position: 'right', scaleName: 'test-name',
      } as any);
      expect(coordinates).toEqual({
        sides: [0, 1],
        ticks: [{
          key: '0',
          text: 'a',
          xText: 10,
          yText: 25,
          x1: 0, x2: 5, y1: 25, y2: 25,
          dominantBaseline: 'middle',
          textAnchor: 'start',
        }],
      });
    });
  });
});

describe('getGridCoordinates', () => {
  const scale = jest.fn(x => x + 1) as any;
  scale.ticks = jest.fn().mockReturnValue([10, 20, 30, 40]);

  it('should return horizontal coordinates', () => {
    (isHorizontal as jest.Mock).mockReturnValue(true);
    expect(getGridCoordinates({ scale, scaleName: 'test-name' })).toEqual([
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
    (isHorizontal as jest.Mock).mockReturnValue(false);
    expect(getGridCoordinates({ scale, scaleName: 'test-name' })).toEqual([
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
