import {
  getParameters,
} from './computeds';

describe('#getParameters', () => {
  const createSeries = name => ({
    name,
    points: [{ index: 0, value: 10 }, { index: 1, value: 20 }, { index: 2, value: 30 }],
    getTargetElement: jest.fn(() => 'parameters'),
  });
  const series = [createSeries('s1'), createSeries('s2'), createSeries('s3')];
  it('should return text and element', () => {
    expect(getParameters(series, { series: 's2', point: 1 })).toEqual({ element: 'parameters', text: '20' });
  });
});
