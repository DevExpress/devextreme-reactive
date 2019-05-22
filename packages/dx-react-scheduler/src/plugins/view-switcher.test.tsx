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
      availableViewNames: ['Week', 'Month'],
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
    expect(switcherProps.currentViewName)
      .toEqual(defaultDeps.getter.currentView.name);
    expect(switcherProps.availableViewNames)
      .toEqual(defaultDeps.getter.availableViewNames);
  });
});
