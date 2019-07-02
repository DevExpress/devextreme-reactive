import { isHorizontal } from '../../utils/scale';
import {
  axisCoordinates, getGridCoordinates, createTickFilter, getRotatedPosition, isValidPosition,
} from './computeds';

jest.mock('../../utils/scale', () => ({
  isHorizontal: jest.fn(),
}));

describe('getRotatedPosition', () => {
  it('should return rotated position', () => {
    expect(getRotatedPosition('left')).toEqual('bottom');
    expect(getRotatedPosition('right')).toEqual('top');
    expect(getRotatedPosition('top')).toEqual('right');
    expect(getRotatedPosition('bottom')).toEqual('left');
  });
});

describe('isValidPosition', () => {
  afterEach(jest.clearAllMocks);

  it('should check horizontal case', () => {
    (isHorizontal as jest.Mock).mockReturnValue(true);
    expect(isValidPosition('left', 'scale-1', false)).toEqual(false);
    expect(isValidPosition('bottom', 'scale-2', true)).toEqual(true);
    expect((isHorizontal as jest.Mock).mock.calls).toEqual([
      ['scale-1', false],
      ['scale-2', true],
    ]);
  });

  it('should check vertical case', () => {
    (isHorizontal as jest.Mock).mockReturnValue(false);
    expect(isValidPosition('right', 'scale-1', false)).toEqual(true);
    expect(isValidPosition('top', 'scale-2', true)).toEqual(false);
    expect((isHorizontal as jest.Mock).mock.calls).toEqual([
      ['scale-1', false],
      ['scale-2', true],
    ]);
  });
});

describe('axisCoordinates', () => {
  const tickSize = 5;
  const indentFromAxis = 10;

  afterEach(jest.clearAllMocks);

  describe('linear', () => {
    const scale: any = jest.fn().mockReturnValue(25);
    scale.ticks = jest.fn().mockReturnValue([1]);
    scale.range = () => [10, 50];

    it('should return ticks Coordinates with horizontal-top position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, scaleName: 'test-name', position: 'top',
        paneSize: [80, 0], rotated: false,
      } as any);
      expect(coordinates).toEqual({
        sides: [1, 0],
        ticks: [{
          key: '0',
          xText: 25,
          yText: -10,
          text: 1,
          dy: '0em',
          textAnchor: 'middle',
          y1: 0, y2: -5, x1: 25, x2: 25,
        }],
      });
      expect(isHorizontal).toBeCalledWith('test-name', false);
      expect(scale.ticks).toBeCalledWith(5);
    });

    it('should return ticks coordinates with horizontal-bottom position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      const coordinates = axisCoordinates({
        scale,  tickSize, indentFromAxis, scaleName: 'test-name', position: 'bottom',
        paneSize: [80, 0], rotated: false,
      } as any);
      expect(coordinates).toEqual({
        sides: [1, 0],
        ticks: [{
          key: '0',
          xText: 25,
          yText: 10,
          text: 1,
          dy: '1em',
          textAnchor: 'middle',
          y1: 0, y2: 5, x1: 25, x2: 25,
        }],
      });
      expect(isHorizontal).toBeCalledWith('test-name', false);
      expect(scale.ticks).toBeCalledWith(5);
    });

    it('should pass correct domain to scale', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      axisCoordinates({
        scale, tickSize, indentFromAxis, scaleName: 'test-name', position: 'top',
        paneSize: [80, 0], rotated: false,
      } as any);
      expect(scale.mock.calls).toEqual([
        [1],
      ]);
      expect(isHorizontal).toBeCalledWith('test-name', false);
    });

    it('should return ticks coordinates with vertical-left position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(false);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, scaleName: 'test-name', position: 'left',
        paneSize: [0, 80], rotated: false,
      } as any);
      expect(coordinates).toEqual({
        sides: [0, 1],
        ticks: [{
          key: '0',
          text: 1,
          xText: -10,
          yText: 25,
          x1: 0, x2: -5, y1: 25, y2: 25,
          dy: '0.3em',
          textAnchor: 'end',
        }],
      });
      expect(isHorizontal).toBeCalledWith('test-name', false);
      expect(scale.ticks).toBeCalledWith(5);
    });

    it('should return ticks coordinates with vertical-right position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(false);
      const coordinates = axisCoordinates({
        tickSize, indentFromAxis,  scale, scaleName: 'test-name', position: 'right',
        paneSize: [0, 80], rotated: false,
      } as any);
      expect(coordinates).toEqual({
        sides: [0, 1],
        ticks: [{
          key: '0',
          text: 1,
          xText: 10,
          yText: 25,
          x1: 0, x2: 5, y1: 25, y2: 25,
          dy: '0.3em',
          textAnchor: 'start',
        }],
      });
      expect(isHorizontal).toBeCalledWith('test-name', false);
      expect(scale.ticks).toBeCalledWith(5);
    });

    it('should generate ticks when pane size is zero', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      axisCoordinates({
        scale, tickSize, indentFromAxis, scaleName: 'test-name', position: 'top',
        paneSize: [0, 0], rotated: false,
      } as any);
      expect(scale.ticks).toBeCalledWith(10);
    });

    it('should format ticks', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      scale.tickFormat = jest.fn(() => tick => `format ${tick}`);
      try {
        const coordinates = axisCoordinates({
          scale, tickSize, indentFromAxis, position: 'top', scaleName: 'test-name',
          paneSize: [], rotated: false,
        } as any);
        expect(coordinates.ticks).toEqual([{
          key: '0',
          xText: 25,
          yText: -10,
          text: 'format 1',
          dy: '0em',
          textAnchor: 'middle',
          y1: 0, y2: -5, x1: 25, x2: 25,
        }]);
        expect(scale.tickFormat).toBeCalledWith(10);
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
          paneSize: [],
          rotated: false,
        });
        expect(coordinates.ticks).toEqual([{
          key: '0',
          xText: 25,
          yText: -10,
          text: 'user format 1',
          dy: '0em',
          textAnchor: 'middle',
          y1: 0, y2: -5, x1: 25, x2: 25,
        }]);
        expect(userFormat).toBeCalledWith(scale, 10);
      } finally {
        delete scale.tickFormat;
      }
    });
  });

  describe('band', () => {
    const scale = jest.fn().mockReturnValue(25) as any;
    scale.domain = jest.fn().mockReturnValue(['a']);
    scale.range = () => [10, 50];

    it('should pass correct domain to scale', () => {
      (isHorizontal as jest.Mock).mockReturnValue(false);
      axisCoordinates({
        scale, tickSize, indentFromAxis, position: 'left', scaleName: 'test-name',
        paneSize: [0, 80], rotated: false,
      } as any);
      expect(scale.mock.calls).toEqual([
        ['a'],
      ]);
    });

    it('should return ticks coordinates with horizontal-bottom position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, position: 'bottom', scaleName: 'test-name',
        paneSize: [80, 0], rotated: false,
      } as any);
      expect(coordinates).toEqual({
        sides: [1, 0],
        ticks: [{
          key: '0',
          xText: 25,
          yText: 10,
          text: 'a',
          dy: '1em',
          textAnchor: 'middle',
          y1: 0, y2: 5, x1: 25, x2: 25,
        }],
      });
    });

    it('should return ticks Coordinates with horizontal-top position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(true);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, position: 'top', scaleName: 'test-name',
        paneSize: [80, 0], rotated: false,
      } as any);
      expect(coordinates).toEqual({
        sides: [1, 0],
        ticks: [{
          key: '0',
          xText: 25,
          yText: -10,
          text: 'a',
          dy: '0em',
          textAnchor: 'middle',
          y1: 0, y2: -5, x1: 25, x2: 25,
        }],
      });
    });

    it('should return ticks coordinates with vertical-left position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(false);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, position: 'left', scaleName: 'test-name',
        paneSize: [0, 80], rotated: false,
      } as any);
      expect(coordinates).toEqual({
        sides: [0, 1],
        ticks: [{
          key: '0',
          text: 'a',
          xText: -10,
          yText: 25,
          x1: 0, x2: -5, y1: 25, y2: 25,
          dy: '0.3em',
          textAnchor: 'end',
        }],
      });
    });

    it('should return ticks coordinates with vertical-right position', () => {
      (isHorizontal as jest.Mock).mockReturnValue(false);
      const coordinates = axisCoordinates({
        scale, tickSize, indentFromAxis, position: 'right', scaleName: 'test-name',
        paneSize: [0, 80], rotated: false,
      } as any);
      expect(coordinates).toEqual({
        sides: [0, 1],
        ticks: [{
          key: '0',
          text: 'a',
          xText: 10,
          yText: 25,
          x1: 0, x2: 5, y1: 25, y2: 25,
          dy: '0.3em',
          textAnchor: 'start',
        }],
      });
    });
  });
});

describe('getGridCoordinates', () => {
  const scale = jest.fn(x => x + 16) as any;
  scale.ticks = jest.fn().mockReturnValue([10, 20, 30, 40]);
  scale.range = () => [10, 50];

  it('should return horizontal coordinates', () => {
    (isHorizontal as jest.Mock).mockReturnValue(true);
    expect(getGridCoordinates({
      scale,
      scaleName: 'test-name',
      paneSize: [80, 0],
      rotated: false,
    })).toEqual([
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
    expect(scale.ticks).toBeCalledWith(5);
  });

  it('should return vertical coordinates', () => {
    (isHorizontal as jest.Mock).mockReturnValue(false);
    expect(getGridCoordinates({
      scale,
      scaleName: 'test-name',
      paneSize: [0, 80],
      rotated: false,
    })).toEqual([
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
    expect(scale.ticks).toBeCalledWith(5);
  });
});

describe('createTickFilter', () => {
  it('should filter horizontal ticks', () => {
    const filter = createTickFilter([10, 0]);
    expect(filter({ x1: -1, y1: 5 } as any)).toEqual(false);
    expect(filter({ x1: 4, y1: 5 } as any)).toEqual(true);
    expect(filter({ x1: 11, y1: 5 } as any)).toEqual(false);
  });

  it('should filter vertical ticks', () => {
    const filter = createTickFilter([0, 10]);
    expect(filter({ x1: 5, y1: -1 } as any)).toEqual(false);
    expect(filter({ x1: 5, y1: 4 } as any)).toEqual(true);
    expect(filter({ x1: 5, y1: 11 } as any)).toEqual(false);
  });
});
