import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, executeComputedAction } from '@devexpress/dx-react-core/test-utils';
import { AppointmentForm } from './appointment-form';

describe('AppointmentForm', () => {
  const defaultProps = {
    popupComponent: () => null,
    containerComponent: () => null,
    editorComponents: () => null,
    buttonComponents: () => null,
    checkboxComponents: () => null,
  };

  it('should render Popup component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.popupComponent).exists())
      .toBeTruthy();
  });

  it('should provide toggleFormVisibility action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(AppointmentForm).instance().state.visible)
      .toEqual(false);
    executeComputedAction(tree, actions => actions.toggleFormVisibility());
    expect(tree.find(AppointmentForm).instance().state.visible)
      .toEqual(true);
  });
});
