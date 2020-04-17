import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { ControllerComponent } from './controller-component';
import { getReadiness } from '@devexpress/dx-chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  getReadiness: jest.fn().mockReturnValue('ready_test'),
}));

class Tree extends React.PureComponent {
  render() {
    const { defaultDeps, data } = this.props;
    return (
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            data,
          },
        })}
        <ControllerComponent />
      </PluginHost>
    );
  }
}

describe('ControllerComponent', () => {
  const defaultDeps = {
    getter: {
      layouts: 'test-layouts',
      centerDivRef: 'test-centerDivRef',
      axesExist: false,
    },
  };

  it('should provide "readyToRenderSeries" getter and call getReadiness with correct props', () => {
    const tree = mount((
      <Tree defaultDeps={defaultDeps} data={['test']} />
    ));

    expect(getComputedState(tree).readyToRenderSeries)
      .toBe('ready_test');
    expect(getReadiness)
      .toBeCalledTimes(1);
    expect(getReadiness)
      .toBeCalledWith('test-layouts', 'test-centerDivRef', true, false);

    tree.setProps({
      data: [],
    });

    expect(getComputedState(tree).readyToRenderSeries)
      .toBe('ready_test');
    expect(getReadiness)
      .toBeCalledTimes(2);
    expect(getReadiness)
      .toBeCalledWith('test-layouts', 'test-centerDivRef', false, false);

    tree.setProps({
      data: ['test'],
    });

    expect(getComputedState(tree).readyToRenderSeries)
      .toBe('ready_test');
    expect(getReadiness)
      .toBeCalledTimes(3);
    expect(getReadiness)
      .toBeCalledWith('test-layouts', 'test-centerDivRef', true, false);
  });
});
