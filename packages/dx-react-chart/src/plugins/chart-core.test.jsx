import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { ChartCore } from './chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  axisName: jest.fn(() => 'argumentName'),
  prepareData: jest.fn(data => data),
}));

const defaultProps = {
  data: [{ arg: 1, val: 2 }],
};

describe('Chart Core', () => {
  it('should provide options', () => {
    const tree = mount((
      <PluginHost>
        <ChartCore
          {...defaultProps}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));
    expect(getComputedState(tree)).toEqual({
      data: defaultProps.data,
      argumentAxisName: 'argumentName',
    });
  });
});
