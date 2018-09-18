import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { ViewSwitcher } from './view-switcher';

describe('ViewSwitcher', () => {
  const defaultProps = {
    switcherComponent: () => null,
  };
  const defaultDeps = {
    getter: {
      currentView: 'Week',
      availableViews: ['Week', 'Month'],
    },
    action: {
      setCurrentView: () => {},
    },
    template: {
      toolbarContent: {},
    },
    plugins: ['Toolbar', 'ViewState'],
  };
  it('should render a switcher component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ViewSwitcher
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.switcherComponent).exists())
      .toBeTruthy();
    const switcherProps = tree.find(defaultProps.switcherComponent).props();
    expect(switcherProps.currentView)
      .toEqual(defaultDeps.getter.currentView);
    expect(switcherProps.availableViews)
      .toEqual(defaultDeps.getter.availableViews);
  });
});
