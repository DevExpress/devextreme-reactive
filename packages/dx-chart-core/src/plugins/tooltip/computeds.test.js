import {
  getParameters,
} from './computeds';

describe('#getParameters', () => {
  const createSeries = name => ({ name, points: [{ value: 10 }, { value: 20 }, { value: 30 }], getTargetElement: jest.fn(() => 'parameters') });
  const series = [createSeries('s1'), createSeries('s2'), createSeries('s3')];
  it('should return text and element', () => {
    expect(getParameters(series, { series: 's2', point: 1 })).toEqual({ element: 'parameters', text: 's2: 20' });
  });

  it('should return empty text and element', () => {
    expect(getParameters(series, null)).toEqual({ element: {}, text: '' });
  });
});
