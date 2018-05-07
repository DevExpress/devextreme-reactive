import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pieAttributes, findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PieSeries } from './pie-series';

const PointComponent = () => null;
// eslint-disable-next-line react/prop-types
const RootComponent = ({ children }) => <div>{children}</div>;

jest.mock('@devexpress/dx-chart-core', () => ({
  pieAttributes: jest.fn(),
  findSeriesByName: jest.fn(),
}));

pieAttributes.mockImplementation(() => ['M11 11', 'M22 22', 'M33 33']);
findSeriesByName.mockImplementation(() => ({
  axisName: 'axisName',
  argumentField: 'arg',
  valueField: 'val',
  stack: 'stack',
}));

describe('Pie series', () => {
  const defaultDeps = {
    getter: {
      layouts: { pane: { width: 200, height: 100 } },
    },
    template: {
      series: {},
    },
  };

  const defaultProps = {
    rootComponent: RootComponent,
    pointComponent: PointComponent,
    name: 'val1',
    styles: 'styles',
  };

  it('should render points', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <PieSeries
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(PointComponent).get(0).props).toEqual({
      d: 'M11 11',
      x: 100,
      y: 50,
      styles: 'styles',
    });
    expect(tree.find(PointComponent).get(1).props).toEqual({
      d: 'M22 22',
      x: 100,
      y: 50,
      styles: 'styles',
    });
    expect(tree.find(PointComponent).get(2).props).toEqual({
      d: 'M33 33',
      x: 100,
      y: 50,
      styles: 'styles',
    });
  });
});
