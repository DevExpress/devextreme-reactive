import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { ViewSwitcherProps } from '../types/view-switcher';

const pluginDependencies = [
  { name: 'Toolbar' },
  { name: 'ViewState' },
];

class ViewSwitcherBase extends React.PureComponent<ViewSwitcherProps> {
  static components: PluginComponents = {
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
              availableViews,
            }, {
              setCurrentViewName,
            }) => (
              <Switcher
                currentView={currentView}
                availableViews={availableViews}
                onChange={setCurrentViewName}
              />
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the Scheduler's view switcher. */
export const ViewSwitcher: React.ComponentType<ViewSwitcherProps> = ViewSwitcherBase;
