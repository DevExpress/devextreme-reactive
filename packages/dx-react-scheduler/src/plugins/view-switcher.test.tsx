import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { ViewSwitcher } from './view-switcher';

describe('ViewSwitcher', () => {
  const defaultProps = {
    switcherComponent: () => null,
  };
  const defaultDeps = {
    getter: {
      currentView: { name: 'Week' },
      availableViews: [
        { name: 'Week', displayName: 'Full week' },
        { name: 'Month', displayName: 'Full month' },
      ],
    },
    action: {
      setCurrentViewName: () => {},
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
    expect(switcherProps.currentView.name)
      .toEqual(defaultDeps.getter.currentView.name);
    expect(switcherProps.availableViews)
      .toEqual(defaultDeps.getter.availableViews);
  });
});
