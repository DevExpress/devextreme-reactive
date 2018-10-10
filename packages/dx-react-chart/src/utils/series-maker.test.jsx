import { makeSeries } from './series-maker';

jest.mock('@devexpress/dx-chart-core', () => ({}));

describe('makeSeries', () => {
  it('should set *components*', () => {
    const components = {
      testComponent1: 'test-1',
      testComponent2: 'test-2',
    };
    const Series = makeSeries('TestSeries', 'test-type', () => null, () => null, components);

    expect(Series.components).toEqual(components);
  });
});
