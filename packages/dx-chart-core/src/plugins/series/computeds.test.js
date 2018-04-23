
import {
  symbol,
  line,
  area,
  symbolCircle,
} from 'd3-shape';
import { createScale } from '../../utils/scale';
import { seriesAttributes } from './computeds';

jest.mock('../../utils/scale', () => ({
  createScale: jest.fn(),
}));
jest.mock('d3-shape', () => ({
  symbol: jest.fn(),
  line: jest.fn(),
  area: jest.fn(),
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

const data = [
  {
    arg: 1, val1: 3, val1Series3end: 3, val1Series3start: 2,
  },
  {
    arg: 2, val1: 5, val1Series3end: 5, val1Series3start: 4,
  },
  {
    arg: 3, val1: 7, val1Series3end: 7, val1Series3start: 6,
  },
  {
    arg: 4, val1: 10, val1Series3end: 10, val1Series3start: 9,
  },
  {
    arg: 5, val1: 15, val1Series3end: 15, val1Series3start: 14,
  },
];

const computedLine = data.map(item => ({
  id: item.arg, x: item.arg, y: item.val1Series3end, y1: item.val1Series3start,
}));
const series = [
  {
    valueField: 'val2', axisName: 'axisName', argumentField: 'arg', name: 'Series1',
  },
  {
    valueField: 'val3', axisName: 'axisName', argumentField: 'arg', point: { size: 10 }, name: 'Series2',
  },
  {
    valueField: 'val1', axisName: 'axisName', argumentField: 'arg', name: 'Series3', stack: 'stack',
  },
];


describe('Series attributes', () => {
  const getAttributes = (type, seriesName, stacks, axisType) => seriesAttributes(
    data,
    series,
    seriesName || 'Series3',
    { argumentAxisName: { type: axisType || 'axisType', orientation: 'orientation' }, axisName: 'axisName' },
    'argumentAxisName',
    { width: 20, height: 10 },
    stacks || [],
    type || 'area',
  );
  beforeAll(() => {
    createScale.mockImplementation(() => value => value);
    symbol.mockImplementation(() => mockSymbol);
    line.mockImplementation(() => mockLine);
    area.mockImplementation(() => mockArea);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create scales with proper parameters', () => {
    getAttributes();

    expect(createScale).toHaveBeenCalledTimes(2);
    expect(createScale.mock.calls[0]).toEqual([{ type: 'axisType', orientation: 'orientation' }, 20, 10, 0.3]);
    expect(createScale.mock.calls[1]).toEqual(['axisName', 20, 10]);
  });

  it('should create scales, argument axis is band', () => {
    const translateValue = value => value;
    translateValue.bandwidth = () => 55;
    createScale.mockImplementation(() => translateValue);
    getAttributes('bar', 'Series3', ['stack1', 'stack2'], 'band');

    expect(createScale).toHaveBeenCalledTimes(3);
    expect(createScale.mock.calls[0]).toEqual([{ type: 'band', orientation: 'orientation' }, 20, 10, 0.3]);
    expect(createScale.mock.calls[1]).toEqual(['axisName', 20, 10]);
    expect(createScale.mock.calls[2]).toEqual([{
      domain: ['stack1', 'stack2'],
      orientation: 'orientation',
      type: 'band',
    }, 55, 55, 0.1]);
    createScale.mockImplementation(() => value => value);
  });

  it('should return d attribute for point', () => {
    const { dPoint } = getAttributes();
    expect(dPoint).toBe('symbol path');
    expect(mockSymbol.size).toBeCalledWith([49]);
    expect(mockSymbol.type).toBeCalledWith(symbolCircle);
  });

  it('should return coordinates for path', () => {
    const { coordinates } = getAttributes();
    expect(coordinates).toEqual(computedLine);
  });

  it('should return d attribute for area', () => {
    const { d } = getAttributes();
    expect(d).toBe('area');
    expect(mockArea.x).toBeCalled();
    expect(mockArea.y1).toBeCalled();
    expect(mockArea.y0).toBeCalled();
    expect(mockAreaResult).toBeCalledWith(computedLine);
  });

  it('should return d attribute for line', () => {
    const { d } = getAttributes('line');
    expect(d).toBe('line');
    expect(mockLine.x).toBeCalled();
    expect(mockLine.y).toBeCalled();
    expect(mockLineResult).toBeCalledWith(computedLine);
  });

  it('should return d attribute for spline', () => {
    const { d } = getAttributes('spline');
    expect(d).toBe('spline');
    expect(mockLine.x).toBeCalled();
    expect(mockLine.y).toBeCalled();
    expect(mockLineResult.curve).toBeCalled();
    expect(mockCurveResult).toBeCalledWith(computedLine);
  });

  it('should apply point size', () => {
    getAttributes('area', 'Series2');
    expect(mockSymbol.size).toBeCalledWith([100]);
  });

  it('should return scales', () => {
    const { scales } = getAttributes();
    expect(scales.xScale).toBeTruthy();
    expect(scales.yScale).toBeTruthy();
  });

  it('should return stack of the series', () => {
    const { stack } = getAttributes();
    expect(stack).toBe('stack');
  });
});
