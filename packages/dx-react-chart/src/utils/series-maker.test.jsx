import * as PropTypes from 'prop-types';
import { makeSeries } from './series-maker';

jest.mock('@devexpress/dx-chart-core', () => ({}));

describe('makeSeries', () => {
  it('should set `components` and `propTypes`', () => {
    const components = {
      testComponent1: 'test-1',
      testComponent2: 'test-2',
    };
    const Series = makeSeries('TestSeries', 'test-type', () => null, () => null, components);

    expect(Series.components).toEqual(components);
    // eslint-disable-next-line react/forbid-foreign-prop-types
    expect(Series.propTypes.testComponent1).toEqual(PropTypes.func.isRequired);
    // eslint-disable-next-line react/forbid-foreign-prop-types
    expect(Series.propTypes.testComponent2).toEqual(PropTypes.func.isRequired);
  });
});
