
import {
  symbol,
  line,
  area,
  symbolCircle,
  arc,
  pie,
} from 'd3-shape';
import { createScale } from '../../utils/scale';
import {
  pieAttributes,
  xyScales,
  pointAttributes,
  coordinates,
  lineAttributes,
  findSeriesByName,
  barPointAttributes,
  seriesData,
  checkZeroStart,
} from './computeds';

jest.mock('../../utils/scale', () => ({
  createScale: jest.fn(),
}));
jest.mock('d3-shape', () => ({
  symbol: jest.fn(),
  line: jest.fn(),
  area: jest.fn(),
  pie: jest.fn(),
  arc: jest.fn(),
}));
const mockSymbol = jest.fn().mockReturnThis();
mockSymbol.size = jest.fn().mockReturnThis();
mockSymbol.type = jest.fn(() => () => 'symbol path');

const mockLine = jest.fn().mockReturnThis();
const mockCurveResult = jest.fn(() => 'spline');
const mockLineResult = jest.fn(() => 'line');
mockLineResult.curve = jest.fn(() => mockCurveResult);
mockLine.x = jest.fn().mockReturnThis();
mockLine.y = jest.fn(() => mockLineResult);

const mockArea = jest.fn().mockReturnThis();
const mockAreaResult = jest.fn().mockReturnValue('area');
mockArea.x = jest.fn().mockReturnThis();
mockArea.y1 = jest.fn().mockReturnThis();
mockArea.y0 = jest.fn(() => mockAreaResult);

const mockPie = {
  value: jest.fn(func => data =>
    data.map(d => ({ startAngle: func(d), endAngle: func(d), value: 'value' }))),
};
const mockArc = jest.fn().mockReturnThis();
mockArc.innerRadius = jest.fn().mockReturnThis();
mockArc.outerRadius = jest.fn().mockReturnThis();
mockArc.startAngle = jest.fn().mockReturnThis();
mockArc.endAngle = jest.fn(() => jest.fn(() => true));

const data = [
  {
    arg: 1, val1: 3, 'val1-Series3-end': 3, 'val1-Series3-start': 2,
  },
  {
    arg: 2, val1: 5, 'val1-Series3-end': 5, 'val1-Series3-start': 4,
  },
  {
    arg: 3, val1: 7, 'val1-Series3-end': 7, 'val1-Series3-start': 6,
  },
  {
    arg: 4, val1: 10, 'val1-Series3-end': 10, 'val1-Series3-start': 9,
  },
  {
    arg: 5, val1: 15, 'val1-Series3-end': 15, 'val1-Series3-start': 14,
  },
];

const computedLine = data.map(item => ({
  id: item.arg, x: item.arg, y: item['val1-Series3-end'], y1: item['val1-Series3-start'], value: item.val1,
}));
const series = [
  {
    valueField: 'val2', axisName: 'axisName', argumentField: 'arg', name: 'Series1',
  },
  {
    valueField: 'val3', axisName: 'axisName', argumentField: 'arg', name: 'Series2',
  },
  {
    valueField: 'val1', axisName: 'axisName', argumentField: 'arg', name: 'Series3', stack: 'stack',
  },
];
const size = 7;
const groupWidth = 0.7;
const barWidth = 0.9;

describe('Scales', () => {
  const getScales = ({
    axisType = 'axisType', stacks = [],
  }) => xyScales(
    { argumentAxisName: { type: axisType, orientation: 'orientation' }, axisName: 'axisName' },
    'argumentAxisName',
    'axisName',
    { width: 20, height: 10 },
    stacks,
    groupWidth,
    barWidth,
  );
  beforeAll(() => {
    const translateValue = value => value;
    translateValue.ticks = () => [1];
    createScale.mockImplementation(() => translateValue);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create scales with proper parameters', () => {
    const { xScale, yScale, x0Scale } = getScales({});

    expect(createScale).toHaveBeenCalledTimes(3);
    expect(createScale.mock.calls[0]).toEqual([{ type: 'axisType', orientation: 'orientation' }, 20, 10, 1 - groupWidth]);
    expect(createScale.mock.calls[1]).toEqual(['axisName', 20, 10]);
    expect(createScale.mock.calls[2]).toEqual([{ domain: [], orientation: 'orientation', type: 'band' }, 20, 20, 1 - barWidth]);
    expect(xScale).toBeTruthy();
    expect(yScale).toBeTruthy();
    expect(x0Scale).toBeTruthy();
  });

  it('should create scales, argument axis is band', () => {
    const translateValue = value => value;
    translateValue.bandwidth = () => 55;
    createScale.mockImplementation(() => translateValue);
    const { xScale, yScale, x0Scale } = getScales({ axisType: 'band', stacks: ['stack1', 'stack2'] });

    expect(createScale).toHaveBeenCalledTimes(3);
    expect(createScale.mock.calls[0]).toEqual([{ type: 'band', orientation: 'orientation' }, 20, 10, 1 - groupWidth]);
    expect(createScale.mock.calls[1]).toEqual(['axisName', 20, 10]);
    expect(createScale.mock.calls[2]).toEqual([{
      domain: ['stack1', 'stack2'],
      orientation: 'orientation',
      type: 'band',
    }, 55, 55, 1 - barWidth]);
    expect(xScale).toBeTruthy();
    expect(yScale).toBeTruthy();
    expect(x0Scale).toBeTruthy();
    createScale.mockImplementation(() => value => value);
  });
});

describe('Series attributes', () => {
  beforeAll(() => {
    createScale.mockImplementation(() => value => value);
    symbol.mockImplementation(() => mockSymbol);
    line.mockImplementation(() => mockLine);
    area.mockImplementation(() => mockArea);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return series by name', () => {
    expect(findSeriesByName('Series2', series)).toEqual(series[1]);
  });

  it('should return d attribute for point and coordinates', () => {
    const { d, x, y } = pointAttributes({ xScale: {} }, size)({ x: 1, y: 2 });
    expect(d).toBe('symbol path');
    expect(mockSymbol.size).toBeCalledWith([49]);
    expect(mockSymbol.type).toBeCalledWith(symbolCircle);
    expect(x).toBe(1);
    expect(y).toBe(2);
  });

  it('should return d attribute for point and coordinates, scale is band', () => {
    const { d, x, y } = pointAttributes(
      { xScale: { bandwidth: jest.fn(() => 20) } },
      size,
    )({ x: 1, y: 2 });
    expect(d).toBe('symbol path');
    expect(mockSymbol.size).toBeCalledWith([49]);
    expect(mockSymbol.type).toBeCalledWith(symbolCircle);
    expect(x).toBe(11);
    expect(y).toBe(2);
  });

  it('should return coordinates for path', () => {
    expect(coordinates(
      data,
      { xScale: createScale(), yScale: createScale() },
      'arg',
      'val1',
      'Series3',
    )).toEqual(computedLine);
  });

  it('should return generator for area', () => {
    const { path } = lineAttributes('area', { xScale: {} });
    expect(path(computedLine)).toBe('area');
    expect(mockArea.x).toBeCalled();
    expect(mockArea.y1).toBeCalled();
    expect(mockArea.y0).toBeCalled();
    expect(mockAreaResult).toBeCalledWith(computedLine);
  });

  it('should return generator for line', () => {
    const { path } = lineAttributes('line', { xScale: {} });
    expect(path(computedLine)).toBe('line');
    expect(mockLine.x).toBeCalled();
    expect(mockLine.y).toBeCalled();
    expect(mockLineResult).toBeCalledWith(computedLine);
  });

  it('should return generator for spline', () => {
    const { path } = lineAttributes('spline', { xScale: {} });
    expect(path(computedLine)).toBe('spline');
    expect(mockLine.x).toBeCalled();
    expect(mockLine.y).toBeCalled();
    expect(mockLineResult.curve).toBeCalled();
    expect(mockCurveResult).toBeCalledWith(computedLine);
  });

  it('should return coordinates for lines', () => {
    const { x, y } = lineAttributes('line', { xScale: {} });
    expect(x).toBe(0);
    expect(y).toBe(0);
  });

  it('should return coordinates for lines, type is band', () => {
    const { x, y } = lineAttributes('line', { xScale: { bandwidth: jest.fn(() => 20) } });
    expect(x).toBe(10);
    expect(y).toBe(0);
  });

  it('should return bar point attributes', () => {
    const scale = jest.fn(() => 3);
    scale.bandwidth = jest.fn(() => 20);
    const barAttr = barPointAttributes({ x0Scale: scale }, undefined, 'stack1')({ x: 1, y: 2, y1: 5 });
    expect(barAttr).toEqual({
      x: 4, y: 2, height: 3, width: 20,
    });
    expect(scale).toBeCalledWith('stack1');
  });

  it('should return bar point attributes, bar is negative', () => {
    const scale = jest.fn(() => 3);
    scale.bandwidth = jest.fn(() => 20);
    const barAttr = barPointAttributes({ x0Scale: scale }, undefined, 'stack1')({ x: 1, y: 5, y1: 2 });
    expect(barAttr).toEqual({
      x: 4, y: 2, height: 3, width: 20,
    });
  });
});

describe('Pie attributes', () => {
  beforeAll(() => {
    pie.mockImplementation(() => mockPie);
    arc.mockImplementation(() => mockArc);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return array of arsc', () => {
    const pieAttr = pieAttributes(
      'val1',
      data,
      20,
      10,
      0.1,
      0.9,
    );
    expect(pieAttr).toHaveLength(data.length);
    pieAttr.forEach((attr) => {
      expect(attr.d).toBeTruthy();
      expect(attr.value).toBe('value');
    });

    data.forEach((d) => {
      expect(mockArc.innerRadius).toHaveBeenCalledWith(0.5);
      expect(mockArc.outerRadius).toHaveBeenCalledWith(4.5);
      expect(mockArc.startAngle).toHaveBeenCalledWith(d.val1);
      expect(mockArc.endAngle).toHaveBeenCalledWith(d.val1);
    });
  });

  it('should return array of arcs, outerRadius is not set', () => {
    pieAttributes(
      'val1',
      data,
      20,
      10,
      0,
    );

    data.forEach((d) => {
      expect(mockArc.innerRadius).toHaveBeenCalledWith(0);
      expect(mockArc.outerRadius).toHaveBeenCalledWith(5);
      expect(mockArc.startAngle).toHaveBeenCalledWith(d.val1);
      expect(mockArc.endAngle).toHaveBeenCalledWith(d.val1);
    });
  });
});

describe('seriesData', () => {
  it('should return array with props', () => {
    const seriesArray = seriesData(undefined, { first: true });
    expect(seriesArray).toEqual([{ first: true }]);
  });

  it('should push new series props', () => {
    const seriesArray = seriesData([{ first: true }], { second: true });
    expect(seriesArray).toEqual([{ first: true }, { second: true }]);
  });
});

describe('checkZeroStart', () => {
  it('should return true for axis with bar', () => {
    const fromZero = checkZeroStart({}, 'axis1', 'bar');
    expect(fromZero).toEqual({ axis1: true });
  });

  it('should return true for axis with area', () => {
    const fromZero = checkZeroStart({}, 'axis1', 'area');
    expect(fromZero).toEqual({ axis1: true });
  });

  it('should return false for axis with another series type', () => {
    const fromZero = checkZeroStart({}, 'axis1', 'line');
    expect(fromZero).toEqual({ axis1: false });
  });
});
