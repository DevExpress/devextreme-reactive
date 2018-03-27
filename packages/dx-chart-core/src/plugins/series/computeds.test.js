import { createScale } from '../../utils/scale';
import { getSeriesAttributes } from './computeds';

jest.mock('../../utils/scale', () => ({
  createScale: jest.fn(),
}));

const data = [
  { arg: 1, val1: 3 },
  { arg: 2, val1: 5 },
  { arg: 3, val1: 7 },
  { arg: 4, val1: 10 },
  { arg: 5, val1: 15 },
];
const series = [
  { valueField: 'val2', axisName: 'axisName', argumentField: 'arg' },
  { valueField: 'val3', axisName: 'axisName', argumentField: 'arg' },
  { valueField: 'val1', axisName: 'axisName', argumentField: 'arg' },
];

describe('Series attributes', () => {
  beforeAll(() => {
    createScale.mockImplementation(() => value => value);
  });

  it('should create scales with proper parameters', () => {
    getSeriesAttributes(
      data,
      series,
      'val1',
      { argumentAxisName: 'argumentAxisName', axisName: 'axisName' },
      'argumentAxisName',
      { width: 20, height: 10 },
      'area',
    );

    expect(createScale).toHaveBeenCalledTimes(2);
    expect(createScale.mock.calls[0]).toEqual(['argumentAxisName', 20, 10]);
    expect(createScale.mock.calls[1]).toEqual(['axisName', 20, 10]);
  });

  it('should return d attribute for point', () => {
    expect(getSeriesAttributes(
      data,
      series,
      'val1',
      { argumentAxisName: 'argumentAxisName', axisName: 'axisName' },
      'argumentAxisName',
      { width: 20, height: 10 },
      'area',
    ).dPoint).toBe('M4.1841419359420025,0A4.1841419359420025,4.1841419359420025,0,1,1,-4.1841419359420025,0A4.1841419359420025,4.1841419359420025,0,1,1,4.1841419359420025,0');
  });

  it('should return coordinates for path', () => {
    expect(getSeriesAttributes(
      data,
      series,
      'val1',
      { argumentAxisName: 'argumentAxisName', axisName: 'axisName' },
      'argumentAxisName',
      { width: 20, height: 10 },
      'area',
    ).coordinates).toEqual([
      { x: 1, y: 3 },
      { x: 2, y: 5 },
      { x: 3, y: 7 },
      { x: 4, y: 10 },
      { x: 5, y: 15 },
    ]);
  });

  it('should return d attribute for area', () => {
    expect(getSeriesAttributes(
      data,
      series,
      'val1',
      { argumentAxisName: 'argumentAxisName', axisName: 'axisName' },
      'argumentAxisName',
      { width: 20, height: 10 },
      'area',
    ).d).toBe('M1,3L2,5L3,7L4,10L5,15L5,10L4,10L3,10L2,10L1,10Z');
  });

  it('should return d attribute for line', () => {
    expect(getSeriesAttributes(
      data,
      series,
      'val1',
      { argumentAxisName: 'argumentAxisName', axisName: 'axisName' },
      'argumentAxisName',
      { width: 20, height: 10 },
      'line',
    ).d).toBe('M1,3L2,5L3,7L4,10L5,15');
  });

  it('should return d attribute for spline', () => {
    expect(getSeriesAttributes(
      data,
      series,
      'val1',
      { argumentAxisName: 'argumentAxisName', axisName: 'axisName' },
      'argumentAxisName',
      { width: 20, height: 10 },
      'spline',
    ).d).toBe('M1,3C1,3,1.6666666666666667,4.333333333333333,2,5C2.3333333333333335,5.666666666666667,2.6666666666666665,6.166666666666667,3,7C3.3333333333333335,7.833333333333333,3.6666666666666665,8.666666666666666,4,10C4.333333333333333,11.333333333333334,5,15,5,15');
  });
});
