import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { ViewSwitcherProps } from '../types/view-switcher';

const pluginDependencies = [
  { name: 'Toolbar' },
  { name: 'ViewState' },
];

class ViewSwitcherBase extends React.PureComponent<ViewSwitcherProps> {
  static components = {
    switcherComponent: 'Switcher',
  };
  render() {
    const { switcherComponent: Switcher } = this.props;

    return (
      <Plugin
        name="ViewSwitcher"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              currentView,
              availableViewNames,
            }, {
              setCurrentViewName,
            }) => (
              <Switcher
                currentViewName={currentView.name}
                availableViewNames={availableViewNames}
                onChange={setCurrentViewName}
              />
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

export const ViewSwitcher: React.ComponentType<ViewSwitcherProps> = ViewSwitcherBase;
